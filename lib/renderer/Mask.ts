import Image2D = require("awayjs-core/lib/data/Image2D");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import RenderableBase = require("awayjs-renderergl/lib/renderables/RenderableBase");
import RenderBase	= require("awayjs-renderergl/lib/render/RenderBase");
import Stage = require("awayjs-stagegl/lib/base/Stage");
import ContextGLClearMask = require("awayjs-stagegl/lib/base/ContextGLClearMask");

import Renderer2D = require("awayjs-player/lib/renderer/Renderer2D");

class Mask
{
    //private _texture : Image2D;
    private _stage : Stage;
    private _renderer : Renderer2D;
    private _registeredMasks : RenderableBase[];

    constructor(stage:Stage, renderer:Renderer2D)
    {
        this._stage = stage;
        this._renderer = renderer;
        //this._texture = new Image2D(renderer.width, renderer.height);
    }

    //public get texture()
    //{
        //return this._texture;
    //}

    //public dispose()
    //{
    //    this._texture.dispose();
    //}

    public registerMask(obj:RenderableBase) : void
    {
        //console.log("registerMask");
        this._registeredMasks.push(obj);
    }

    public renderMasks(masks:DisplayObject[])
    {
        //var oldRenderTarget = this._stage.renderTarget;

        //this._stage.setRenderTarget(this._image);
        //this._stage.clear();
        var context = this._stage.context;
        context.setColorMask(false, false, false, false);
        // TODO: Could we create masks within masks by providing a previous configID, and supply "clear/keep" on stencil fail
        //context.setStencilActions("frontAndBack", "always", "set", "set", "set");

        if (masks) {
            var numMasks = masks.length;
            var numRenderables = this._registeredMasks.length;

            for (var i = 0; i < numMasks; ++i) {
                var mask = masks[i];
                for (var j = 0; j < numRenderables; ++j) {
                    var obj = this._registeredMasks[j];
                    //console.log("testing for " + mask["hierarchicalMaskID"] + ", " + mask.name);
                    if (obj.sourceEntity["hierarchicalMaskID"] === mask["hierarchicalMaskID"]) {
                        console.log("Rendering hierarchicalMaskID " + mask["hierarchicalMaskID"]);
                        this._draw(obj);
                    }
                }
            }
        }

        context.setColorMask(true, true, true, true);
        //this._stage.setRenderTarget(oldRenderTarget);
    }

    public reset()
    {
        this._registeredMasks = [];
    }

/*    public get width() : number
    {
        return this._image.width;
    }

    public set width(value:number)
    {
        this._image.width = value;
    }

    public get height() : number
    {
        return this._image.height;
    }

    public set height(value:number)
    {
        this._image.height = value;
    }*/

    private _draw(renderable:RenderableBase)
    {
        var render = renderable.render;
        var passes = render.passes;
        var len = passes.length;
        var pass = passes[len-1];
        var camera = this._renderer._pCamera;

        this._renderer.activatePass(renderable, pass, camera);
        // only render last pass for now
        renderable._iRender(pass, camera, this._renderer._pRttViewProjectionMatrix);
        this._renderer.deactivatePass(renderable, pass);
    }
}
export = Mask;
