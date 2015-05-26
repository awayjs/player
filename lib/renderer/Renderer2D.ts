import Camera = require("awayjs-display/lib/entities/Camera");
import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DefaultMaterialManager = require("awayjs-display/lib/managers/DefaultMaterialManager");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import RenderableNullSort = require("awayjs-display/lib/sort/RenderableNullSort");
import Stage = require("awayjs-stagegl/lib/base/Stage");
import DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
import RenderableBase = require("awayjs-renderergl/lib/renderables/RenderableBase");
import RenderBase    = require("awayjs-renderergl/lib/render/RenderBase");
import IPass = require("awayjs-renderergl/lib/render/passes/IPass");

import Mask = require("awayjs-player/lib/renderer/Mask");
import RenderableSort2D = require("awayjs-player/lib/renderer/RenderableSort2D");

class Renderer2D extends DefaultRenderer
{
    private _mask : Mask;

    constructor(stage:Stage = null)
    {
        super(stage);
        this.renderableSorter = new RenderableSort2D();
        this._mask = new Mask(this._pStage, this);
    }

    public drawRenderables(renderable:RenderableBase, entityCollector:CollectorBase)
    {
        var i:number;
        var len:number;
        var renderable2:RenderableBase;
        var render:RenderBase;
        var passes:Array<IPass>;
        var pass:IPass;
        var camera:Camera = entityCollector.camera;
        var maskConfigID:number = 0;

        /*// TypeScript does not allow calling super.setters -_-
        //this._mask.width = this._pRttBufferManager.textureWidth;
        //this._mask.height = this._pRttBufferManager.textureHeight;*/
        this._mask.reset();
        this._pContext.setStencilActions("frontAndBack", "always", "keep", "keep", "keep");
        console.log("------");
        var gl = this._pContext["_gl"];
        gl.disable(gl.STENCIL_TEST);

        while (renderable) {
            render = renderable.render;
            passes = render.passes;

            if (renderable.sourceEntity["hierarchicalMaskID"] !== -1) {
                renderable2 = renderable.next;
                console.log("Registering mask: " + renderable.sourceEntity["hierarchicalMaskID"], renderable.sourceEntity.name);
                this._mask.registerMask(renderable);
            }
            // otherwise this would result in depth rendered anyway because fragment shader kil is ignored
            else if (this._disableColor && render._renderOwner.alphaThreshold != 0) {
                renderable2 = renderable;
                // fast forward
                do {
                    renderable2 = renderable2.next;
                } while (renderable2 && renderable2.render == render);
            }
            else {
                var newMaskConfigID = renderable.sourceEntity["maskConfigID"];

                if (maskConfigID !== newMaskConfigID) {
                    if (newMaskConfigID === 0) {
                        // disable stencil
                        //this._pContext.setStencilActions("frontAndBack", "always", "keep", "keep", "keep");
                        gl.disable(gl.STENCIL_TEST);
                        gl.stencilFunc(gl.ALWAYS, 0, 0xff);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                        console.log("Let's not use stencil!");
                    }
                    else {
                        console.log("Rendering masks with configID " + newMaskConfigID);
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
                        console.log("Rendering normal DO " + renderable2);
                        renderable2._iRender(pass, camera, this._pRttViewProjectionMatrix);
                        renderable2 = renderable2.next;
                    } while (renderable2 && renderable2.render == render && renderable2.sourceEntity["maskConfigID"] === maskConfigID && renderable2.sourceEntity["hierarchicalMaskID"] === -1);

                    this.deactivatePass(renderable, pass);
                }
            }

            renderable = renderable2;
        }
    }

    public applyRenderable(renderable:RenderableBase)
    {
        //set local vars for faster referencing
        var render:RenderBase = this._pRenderablePool.getRenderPool(renderable.renderableOwner).getItem(renderable.renderOwner || DefaultMaterialManager.getDefaultMaterial(renderable.renderableOwner));

        renderable.render = render;
        renderable.renderId = render.renderId;
        renderable.renderOrderId = render.renderOrderId;

        renderable.cascaded = false;

        var entity:IEntity = renderable.sourceEntity;
        renderable.zIndex = entity["hierarchicalMaskID"] === -1? entity.zOffset : -entity.zOffset;

        //store reference to scene transform
        renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);

        if (render.requiresBlending) {
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