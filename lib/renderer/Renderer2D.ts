import Camera = require("awayjs-display/lib/entities/Camera");
import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import RenderableNullSort = require("awayjs-display/lib/sort/RenderableNullSort");
import Stage = require("awayjs-stagegl/lib/base/Stage");
import DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
import IRendererPoolClass = require("awayjs-renderergl/lib/pool/IRendererPoolClass");
import RenderableBase = require("awayjs-renderergl/lib/pool/RenderableBase");
import RenderObjectBase    = require("awayjs-renderergl/lib/compilation/RenderObjectBase");
import RenderPassBase = require("awayjs-renderergl/lib/passes/RenderPassBase");

import Mask = require("awayjs-player/lib/renderer/Mask");

class Renderer2D extends DefaultRenderer
{
    private _mask : Mask;

    constructor(rendererPoolClass:IRendererPoolClass = null, stage:Stage = null)
    {
        super(rendererPoolClass, stage);
        this.renderableSorter = new RenderableNullSort();
        this._mask = new Mask(this._pStage, this);
    }

    public drawRenderables(renderable:RenderableBase, entityCollector:CollectorBase)
    {
        var i:number;
        var len:number;
        var renderable2:RenderableBase;
        var renderObject:RenderObjectBase;
        var passes:Array<RenderPassBase>;
        var pass:RenderPassBase;
        var camera:Camera = entityCollector.camera;
        var maskConfigID:number = undefined;

        /*// TypeScript does not allow calling super.setters -_-
        // TODO: There's no reason to stick to POT-textures, but AwayJS complains if we don't
        //this._mask.width = this._pRttBufferManager.textureWidth;
        //this._mask.height = this._pRttBufferManager.textureHeight;*/
        this._mask.reset();

        while (renderable) {
            renderObject = renderable.renderObject;
            passes = renderObject.passes;
            
            if (renderable.sourceEntity._iMaskID) {
                renderable2 = renderable.next;
                this._mask.registerMask(renderable);
            }
            // otherwise this would result in depth rendered anyway because fragment shader kil is ignored
            else if (this._disableColor && renderObject._renderObjectOwner.alphaThreshold != 0) {
                renderable2 = renderable;
                // fast forward
                do {
                    renderable2 = renderable2.next;
                } while (renderable2 && renderable2.renderObject == renderObject);
            }
            else {
                //iterate through each shader object
                len = passes.length;
                for (i = 0; i < len; i++) {
                    renderable2 = renderable;
                    var newMaskConfigID = renderable2.sourceEntity["maskConfigID"];

                    if (maskConfigID !== newMaskConfigID) {
                        if (newMaskConfigID == -1) {
                            // disable stencil
                            this._pContext.setStencilActions();
                            console.log("Let's not use stencil!");
                        }
                        else {
                            console.log("Rendering masks with configID " + newMaskConfigID);
                            this._pContext.setStencilReferenceValue(newMaskConfigID);
                            this._mask.renderMasks(renderable2.sourceEntity["hierarchicalMasks"], newMaskConfigID);
                            this._pContext.setStencilActions("frontAndBack", "equal", "keep", "keep", "keep");
                        }
                        maskConfigID = newMaskConfigID;
                    }

                    pass = passes[i];

                    this.activatePass(renderable, pass, camera);

                    do {
                        renderable2._iRender(pass, camera, this._pRttViewProjectionMatrix);
                        renderable2 = renderable2.next;

                    } while (renderable2 && renderable2.renderObject == renderObject && renderable2.sourceEntity["maskConfigID"] == maskConfigID);

                    this.deactivatePass(renderable, pass);
                }
            }

            renderable = renderable2;
        }
    }


    /*public dispose()
    {
        super.dispose();
        this._mask.dispose();
    }*/
}
export = Renderer2D;