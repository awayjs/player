import Camera = require("awayjs-display/lib/entities/Camera");
import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DefaultMaterialManager = require("awayjs-display/lib/managers/DefaultMaterialManager");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import RenderableNullSort = require("awayjs-display/lib/sort/RenderableNullSort");
import Stage = require("awayjs-stagegl/lib/base/Stage");
import DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
import IRendererPoolClass = require("awayjs-renderergl/lib/pool/IRendererPoolClass");
import RenderableBase = require("awayjs-renderergl/lib/pool/RenderableBase");
import RenderObjectBase    = require("awayjs-renderergl/lib/compilation/RenderObjectBase");
import RenderPassBase = require("awayjs-renderergl/lib/passes/RenderPassBase");

import Mask = require("awayjs-player/lib/renderer/Mask");
import RenderableSort2D = require("awayjs-player/lib/renderer/RenderableSort2D");

class Renderer2D extends DefaultRenderer
{
    private _mask : Mask;

    constructor(rendererPoolClass:IRendererPoolClass = null, stage:Stage = null)
    {
        super(rendererPoolClass, stage);
        this.renderableSorter = new RenderableSort2D();
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
        var maskConfigID:number = -1;

        /*// TypeScript does not allow calling super.setters -_-
        //this._mask.width = this._pRttBufferManager.textureWidth;
        //this._mask.height = this._pRttBufferManager.textureHeight;*/
        this._mask.reset();
        this._pContext.setStencilActions("frontAndBack", "always", "keep", "keep", "keep");
        //console.log("------");
        var gl = this._pContext["_gl"];
        var gl = this._pContext["_gl"];
        gl.disable(gl.STENCIL_TEST);

        while (renderable) {
            renderObject = renderable.renderObject;
            passes = renderObject.passes;

            if (renderable.sourceEntity["hierarchicalMaskID"] !== -1) {
                renderable2 = renderable.next;
                //console.log("Registering mask: " + renderable.sourceEntity["hierarchicalMaskID"]);
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
                var newMaskConfigID = renderable.sourceEntity["maskConfigID"];

                if (maskConfigID !== newMaskConfigID) {
                    if (newMaskConfigID === -1) {
                        // disable stencil
                        //this._pContext.setStencilActions("frontAndBack", "always", "keep", "keep", "keep");
                        gl.disable(gl.STENCIL_TEST);
                        gl.stencilFunc(gl.ALWAYS, 0, 0xff);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                        //console.log("Let's not use stencil!");
                    }
                    else {
                        //console.log("Rendering masks with configID " + newMaskConfigID);
                        //this._pContext.setStencilReferenceValue(newMaskConfigID);
                        gl.enable(gl.STENCIL_TEST);
                        gl.stencilFunc(gl.ALWAYS, newMaskConfigID, 0xff);
                        gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
                        this._mask.renderMasks(renderable.sourceEntity["hierarchicalMasks"]);
                        gl.stencilFunc(gl.EQUAL, newMaskConfigID, 0xff);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                        //this._pContext.setStencilActions("frontAndBack", "equal", "keep", "keep", "keep");
                    }
                    maskConfigID = newMaskConfigID;
                }

                //iterate through each shader object
                len = passes.length;
                for (i = 0; i < len; i++) {
                    renderable2 = renderable;

                    pass = passes[i];

                    this.activatePass(renderable, pass, camera);

                    do {
                        //console.log("Rendering normal DO " + renderable2);
                        renderable2._iRender(pass, camera, this._pRttViewProjectionMatrix);
                        renderable2 = renderable2.next;
                    } while (renderable2 && renderable2.renderObject == renderObject && renderable2.sourceEntity["maskConfigID"] === maskConfigID && renderable2.sourceEntity["hierarchicalMaskID"] === -1);

                    this.deactivatePass(renderable, pass);
                }
            }

            renderable = renderable2;
        }
    }

    public applyRenderable(renderable:RenderableBase)
    {
        //set local vars for faster referencing
        var renderObject:RenderObjectBase = this._pGetRenderObject(renderable, renderable.renderObjectOwner || DefaultMaterialManager.getDefaultMaterial(renderable.renderableOwner));

        renderable.renderObject = renderObject;
        renderable.renderObjectId = renderObject.renderObjectId;
        renderable.renderOrderId = renderObject.renderOrderId;

        renderable.cascaded = false;

        var entity:IEntity = renderable.sourceEntity;
        renderable.zIndex = entity["hierarchicalMaskID"] === -1? entity.zOffset : -entity.zOffset;

        //store reference to scene transform
        renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);

        if (renderObject.requiresBlending) {
            renderable.next = this._pBlendedRenderableHead;
            this._pBlendedRenderableHead = renderable;
        } else {
            renderable.next = this._pOpaqueRenderableHead;
            this._pOpaqueRenderableHead = renderable;
        }

        this._pNumTriangles += renderable.numTriangles;

        //handle any overflow for renderables with data that exceeds GPU limitations
        if (renderable.overflow)
            this.applyRenderable(renderable.overflow);
    }

    /*public dispose()
    {
        super.dispose();
        this._mask.dispose();
    }*/
}
export = Renderer2D;