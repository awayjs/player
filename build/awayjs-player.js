require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"awayjs-player/lib/adapters/AS2MovieClipAdapter":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
var AS2MovieClipAdapter = (function (_super) {
    __extends(AS2MovieClipAdapter, _super);
    // translate to scripts:
    /*public onData: Function;
    public onEnterFrame: Function;
    public onLoad: Function;
    public onMouseDown: Function;
    public onMouseMove: Function;
    public onMouseUp: Function;
    public onUnload: Function;*/
    function AS2MovieClipAdapter(adaptee) {
        _super.call(this, adaptee);
        this.currentFrameIndex = -1;
    }
    //get _totalFrames() : number
    //{
    //}
    //attachAudio(id: Object) : void {	}
    //attachBitmap(bmp: BitmapData, depth: Number, pixelSnapping: String = null, smoothing: boolean = false) : void { }
    //attachMovie(id: string, name: string, depth: number, initObject: Object = null) : MovieClip { return null; }
    //beginBitmapFill(bmp: BitmapData, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false) : void {}
    //beginFill(rgb: Number, alpha: number = 1.0) : void {}
    //beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null) : void {}
    //clear() : void {}
    //createEmptyMovieClip(name: string, depth: number) : MovieClip { return null; }
    //createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}
    //curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}
    //duplicateMovieClip(name: string, depth: number, initObject: Object) : MovieClip { return null; }
    //endFill() : void {}
    //getBounds(bounds: Object) : Object { return null; }
    //getBytesLoaded() : number { return 0; }
    //getBytesTotal() : number { return 0; }
    //getInstanceAtDepth(depth: Number) : MovieClip { return null; }
    //getNextHighestDepth() : number { return 0; }
    //getRect(bounds: Object) : Object { return null; }
    //getSWFVersion() : number { return 0; }
    //getTextSnapshot() : TextSnapshot {}
    //getURL(url: string, window: string, method: string) : void {}
    //globalToLocal(pt: Object) : void {}
    //gotoAndPlay(frame: Object) : void {}
    //gotoAndStop(frame: Object) : void {}
    //hitTest() : boolean { return false; }
    //lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number) : void {}
    //lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number) : void {}
    //lineTo(x: number, y: number) : void {}
    //loadMovie(url: string, method: string = null) : void {}
    //loadVariables(url: string, method: string = null) : void {}
    //localToGlobal(pt: Object) : void {}
    //moveTo(x: number, y: number) : void {}
    //nextFrame() : void {}
    //play() : void {}
    //prevFrame() : void {}
    //removeMovieClip() : void {}
    //setMask(mc: Object) : void {}
    //startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) : void {}
    //stop() : void {}
    //stopDrag() : void {}
    //swapDepths(target: Object) : void {}
    //unloadMovie() : void {}
    AS2MovieClipAdapter.prototype.clone = function (newAdaptee) {
        return new AS2MovieClipAdapter(newAdaptee);
    };
    return AS2MovieClipAdapter;
})(AS2SymbolAdapter);
module.exports = AS2MovieClipAdapter;


},{"awayjs-player/lib/adapters/AS2SymbolAdapter":"awayjs-player/lib/adapters/AS2SymbolAdapter"}],"awayjs-player/lib/adapters/AS2SymbolAdapter":[function(require,module,exports){
var AS2SymbolAdapter = (function () {
    function AS2SymbolAdapter(adaptee) {
        this._adaptee = adaptee;
    }
    Object.defineProperty(AS2SymbolAdapter.prototype, "adaptee", {
        get: function () {
            return this._adaptee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_rotation", {
        get: function () {
            return this._adaptee.rotationZ;
        },
        set: function (value) {
            this._adaptee.rotationZ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_x", {
        get: function () {
            return this._adaptee.x;
        },
        set: function (value) {
            this._adaptee.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_y", {
        get: function () {
            return this._adaptee.y;
        },
        set: function (value) {
            this._adaptee.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_xscale", {
        get: function () {
            return this._adaptee.scaleX;
        },
        set: function (value) {
            this._adaptee.scaleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_yscale", {
        get: function () {
            return this._adaptee.scaleY;
        },
        set: function (value) {
            this._adaptee.scaleY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_parent", {
        get: function () {
            var parentMC = this._adaptee.parent;
            return parentMC.adapter;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.getDepth = function () {
        return this._adaptee.z;
    };
    return AS2SymbolAdapter;
})();
module.exports = AS2SymbolAdapter;


},{}],"awayjs-player/lib/adapters/MovieClipAdapter":[function(require,module,exports){



},{}],"awayjs-player/lib/adapters/SymbolAdapter":[function(require,module,exports){
var SymbolAdapter = (function () {
    function SymbolAdapter(adaptee) {
        this.adaptee = adaptee;
    }
    Object.defineProperty(SymbolAdapter.prototype, "_rotation", {
        get: function () {
            return this.adaptee.rotationZ;
        },
        set: function (value) {
            this.adaptee.rotationZ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_x", {
        get: function () {
            return this.adaptee.x;
        },
        set: function (value) {
            this.adaptee.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_y", {
        get: function () {
            return this.adaptee.y;
        },
        set: function (value) {
            this.adaptee.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_xscale", {
        get: function () {
            return this.adaptee.scaleX;
        },
        set: function (value) {
            this.adaptee.scaleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_yscale", {
        get: function () {
            return this.adaptee.scaleY;
        },
        set: function (value) {
            this.adaptee.scaleY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_parent", {
        get: function () {
            var parentMC = this.adaptee.parent;
            return parentMC.adapter;
        },
        enumerable: true,
        configurable: true
    });
    SymbolAdapter.prototype.getDepth = function () {
        return this.adaptee.z;
    };
    return SymbolAdapter;
})();
module.exports = SymbolAdapter;


},{}],"awayjs-player/lib/display/MovieClip":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        _super.call(this);
        this._loop = true;
        this._prototype = this;
        this._keyFrames = new Array();
        this._potentialChildren = new Array();
        this._currentFrameIndex = -1;
        this._isPlaying = true; // auto-play
        this._fps = 25;
        this._time = 0;
        this._totalFrames = 0;
    }
    Object.defineProperty(MovieClip.prototype, "adapter", {
        // adapter is used to provide MovieClip to scripts taken from different platforms
        // TODO: Perhaps adapters should be created dynamically whenever needed, rather than storing them
        get: function () {
            return this._adapter;
        },
        // setter typically managed by factor
        set: function (value) {
            this._adapter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        set: function (newFps) {
            this._fps = newFps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "assetType", {
        get: function () {
            return MovieClip.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Starts playback of animation from current position
     */
    MovieClip.prototype.play = function () {
        this._isPlaying = true;
    };
    /**
     * should be called right before the call to away3d-render.
     */
    MovieClip.prototype.update = function (timeDelta) {
        //this.logHierarchy();
        // TODO: Implement proper elastic racetrack logic
        var frameMarker = 1000 / this._fps;
        // right now, just advance frame once time marker has been reached
        this._time += timeDelta;
        if (this._time > frameMarker) {
            this._time = 0;
            this.advanceFrame();
        }
    };
    /**
     * Add a new TimelineFrame.
     */
    MovieClip.prototype.addFrame = function (newFrame) {
        var endFrame = Math.ceil((newFrame.startTime + newFrame.duration) / 1000 * this._fps);
        if (this._totalFrames < endFrame)
            this._totalFrames = endFrame;
        this._keyFrames.push(newFrame);
    };
    /**
     * Returns the child ID for this MovieClip
     */
    MovieClip.prototype.getPotentialChild = function (id) {
        return this._potentialChildren[id];
    };
    /**
     * Returns the child ID for this MovieClip
     */
    MovieClip.prototype.registerPotentialChild = function (prototype) {
        var id = this._potentialChildren.length;
        this._potentialChildren[id] = prototype.clone();
        return id;
    };
    MovieClip.prototype.activateChild = function (id) {
        this.addChild(this._potentialChildren[id]);
    };
    MovieClip.prototype.deactivateChild = function (id) {
        this.removeChild(this._potentialChildren[id]);
    };
    /**
     * This is called inside the TimelineFrame.execute() function.
     */
    MovieClip.prototype.executeFrameScript = function (frameScript) {
    };
    /**
     * Stop playback of animation and hold current position
     */
    MovieClip.prototype.stop = function () {
        this._isPlaying = false; // no need to call any other stuff
    };
    MovieClip.prototype.clone = function () {
        var clone = new MovieClip();
        if (this._adapter)
            clone.adapter = this._adapter.clone(clone);
        clone._prototype = this._prototype;
        clone._keyFrames = this._keyFrames;
        for (var i = 0; i < this._potentialChildren.length; ++i) {
            clone._potentialChildren[i] = this._potentialChildren[i].clone();
        }
        clone._fps = this._fps;
        clone._loop = this._loop;
        clone._totalFrames = this._totalFrames;
        clone.name = this.name;
        if (this.transform.matrix)
            clone.transform.matrix = this.transform.matrix.clone();
        clone.transform.matrix3D = this.transform.matrix3D;
        var ct = this.transform.colorTransform;
        if (ct)
            clone.transform.colorTransform = new ColorTransform(ct.redMultiplier, ct.greenMultiplier, ct.blueMultiplier, ct.alphaMultiplier, ct.redOffset, ct.greenOffset, ct.blueOffset, ct.alphaOffset);
        return clone;
    };
    MovieClip.prototype.resetPlayHead = function () {
        this._time = 0;
        this._currentFrameIndex = 0;
        for (var i = this.numChildren - 1; i >= 0; --i)
            this.removeChildAt(i);
        for (var i = 0; i < this._keyFrames.length; ++i) {
            var keyFrame = this._keyFrames[i];
            // deactivate any currently active keyframes first
            if (keyFrame.isActive)
                keyFrame.deactivate(this);
        }
    };
    MovieClip.prototype.advanceFrame = function (skipFrames) {
        if (skipFrames === void 0) { skipFrames = false; }
        var i;
        var advance = this._isPlaying;
        if (advance && this._currentFrameIndex == this._totalFrames - 1 && !this._loop) {
            advance = false;
        }
        if (advance && this._currentFrameIndex <= 0 && this._totalFrames == 1) {
            this._currentFrameIndex = 0;
            advance = false;
        }
        if (advance) {
            if (++this._currentFrameIndex == this._totalFrames)
                this.resetPlayHead();
        }
        this.updateKeyFrames(skipFrames);
        // advance children
        if (!skipFrames) {
            var len = this.numChildren;
            for (i = 0; i < len; i++) {
                var child = this.getChildAt(i);
                if (child instanceof MovieClip)
                    child.advanceFrame(skipFrames);
            }
        }
    };
    MovieClip.prototype.updateKeyFrames = function (skipFrames) {
        // TODO: Switch to frames over time (so we can check with ==, instead of > and active)
        var time = this._currentFrameIndex / this._fps * 1000;
        for (var i = 0; i < this._keyFrames.length; ++i) {
            var keyFrame = this._keyFrames[i];
            if (time >= keyFrame.startTime && time <= keyFrame.endTime && !keyFrame.isActive)
                keyFrame.activate(this);
            if (time >= keyFrame.endTime && keyFrame.isActive)
                keyFrame.deactivate(this);
            if (!skipFrames && keyFrame.isActive)
                keyFrame.update(this, this._time);
        }
    };
    // DEBUG CODE:
    MovieClip.prototype.logHierarchy = function (depth) {
        if (depth === void 0) { depth = 0; }
        this.printHierarchyName(depth, this);
        var len = this.numChildren;
        for (var i = 0; i < len; i++) {
            var child = this.getChildAt(i);
            if (child instanceof MovieClip)
                child.logHierarchy(depth + 1);
            else
                this.printHierarchyName(depth + 1, child);
        }
    };
    MovieClip.prototype.printHierarchyName = function (depth, target) {
        var str = "";
        for (var i = 0; i < depth; ++i)
            str += "--";
        str += " " + target.name;
        console.log(str);
    };
    MovieClip.assetType = "[asset MovieClip]";
    return MovieClip;
})(DisplayObjectContainer);
module.exports = MovieClip;


},{"awayjs-core/lib/geom/ColorTransform":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":undefined}],"awayjs-player/lib/factories/AS2SceneGraphFactory":[function(require,module,exports){
var AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
var MovieClip = require("awayjs-player/lib/display/MovieClip");
var AS2SceneGraphFactory = (function () {
    function AS2SceneGraphFactory() {
    }
    AS2SceneGraphFactory.prototype.createMovieClip = function () {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc);
        return mc;
    };
    return AS2SceneGraphFactory;
})();
module.exports = AS2SceneGraphFactory;


},{"awayjs-player/lib/adapters/AS2MovieClipAdapter":"awayjs-player/lib/adapters/AS2MovieClipAdapter","awayjs-player/lib/display/MovieClip":"awayjs-player/lib/display/MovieClip"}],"awayjs-player/lib/factories/TimelineSceneGraphFactory":[function(require,module,exports){



},{}],"awayjs-player/lib/partition/Partition2DNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var NodeBase = require("awayjs-display/lib/partition/NodeBase");
// Warning: contains horrible hacks
var Partition2DNode = (function (_super) {
    __extends(Partition2DNode, _super);
    function Partition2DNode(root) {
        _super.call(this);
        this._root = root;
    }
    Partition2DNode.prototype.acceptTraverser = function (traverser) {
        this._maskConfigID = 0;
        if (traverser.enterNode(this)) {
            this.traverseSceneGraph(this._root, traverser);
        }
    };
    // pass any so we can convert to IEntity. Sigh, TypeScript.
    Partition2DNode.prototype.traverseSceneGraph = function (displayObject, traverser, maskID, appliedMasks) {
        if (maskID === void 0) { maskID = -1; }
        if (appliedMasks === void 0) { appliedMasks = null; }
        if (displayObject._iMaskID != -1) {
            if (maskID != -1)
                throw "masks within masker currently not supported";
            maskID = displayObject._iMaskID;
            // TODO: this could be implemented similar to implicit mouse enabled, partition, and other parent-child-propagated properties
            // just not sure if we want to keep it like this
            console.log(maskID);
        }
        else {
            console.log(displayObject._iMasks);
            if (displayObject._iMasks) {
                appliedMasks = appliedMasks ? appliedMasks.concat(displayObject._iMasks) : displayObject._iMasks.concat();
                // signify that applied masks have changed
                ++this._maskConfigID;
            }
        }
        displayObject["hierarchicalMaskID"] = maskID;
        displayObject["hierarchicalMasks"] = appliedMasks;
        displayObject["maskConfigID"] = this._maskConfigID;
        // moving back up the tree, mask will change again
        if (displayObject._iMasks)
            ++this._maskConfigID;
        // typechecking is nasty, but we have little choice:
        if (displayObject instanceof DisplayObjectContainer)
            this.traverseChildren(displayObject, traverser, maskID, appliedMasks);
        if (displayObject.isEntity) {
            var entity = displayObject;
            entity["node2D"].acceptTraverser(traverser);
        }
    };
    Partition2DNode.prototype.traverseChildren = function (container, traverser, maskID, appliedMasks) {
        var len = container.numChildren;
        for (var i = 0; i < len; ++i)
            this.traverseSceneGraph(container.getChildAt(i), traverser, maskID, appliedMasks);
    };
    Partition2DNode.prototype.iAddNode = function (node) {
        _super.prototype.iAddNode.call(this, node);
        var entityNode = (node);
        entityNode.entity["node2D"] = node;
    };
    return Partition2DNode;
})(NodeBase);
module.exports = Partition2DNode;


},{"awayjs-display/lib/containers/DisplayObjectContainer":undefined,"awayjs-display/lib/partition/NodeBase":undefined}],"awayjs-player/lib/partition/Partition2D":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Partition = require("awayjs-display/lib/partition/Partition");
var Partition2DNode = require("awayjs-player/lib/partition/Partition2DNode");
var Partition2D = (function (_super) {
    __extends(Partition2D, _super);
    function Partition2D(root) {
        _super.call(this, new Partition2DNode(root));
    }
    return Partition2D;
})(Partition);
module.exports = Partition2D;


},{"awayjs-display/lib/partition/Partition":undefined,"awayjs-player/lib/partition/Partition2DNode":"awayjs-player/lib/partition/Partition2DNode"}],"awayjs-player/lib/renderer/Mask":[function(require,module,exports){
var Mask = (function () {
    function Mask(stage, renderer) {
        this._stage = stage;
        this._renderer = renderer;
        //this._texture = new RenderTexture(renderer.width, renderer.height);
    }
    //public get texture()
    //{
    //return this._texture;
    //}
    //public dispose()
    //{
    //    this._texture.dispose();
    //}
    Mask.prototype.registerMask = function (obj) {
        this._registeredMasks.push(obj);
    };
    Mask.prototype.renderMasks = function (masks, configID) {
        //var oldRenderTarget = this._stage.renderTarget;
        //this._stage.setRenderTarget(this._texture);
        //this._stage.clear();
        var context = this._stage.context;
        context.setColorMask(false, false, false, false);
        // TODO: Could we create masks within masks by providing a previous configID, and supply "clear/keep" on stencil fail
        context.setStencilActions("frontAndBack", "always", "set", "set", "set");
        if (masks) {
            var numMasks = masks.length;
            var numRenderables = this._registeredMasks.length;
            for (var i = 0; i < numMasks; ++i) {
                var mask = masks[i];
                for (var j = 0; j < numRenderables; ++j) {
                    var obj = this._registeredMasks[j];
                    if (obj.sourceEntity["hierarchicalMaskID"] === mask["hierarchicalMaskID"]) {
                        console.log("Rendering hierarchicalMaskID " + mask["hierarchicalMaskID"]);
                        this._draw(obj);
                    }
                }
            }
        }
        context.setColorMask(true, true, true, true);
        //this._stage.setRenderTarget(oldRenderTarget);
    };
    Mask.prototype.reset = function () {
        this._registeredMasks = [];
    };
    /*    public get width() : number
        {
            return this._texture.width;
        }
    
        public set width(value:number)
        {
            this._texture.width = value;
        }
    
        public get height() : number
        {
            return this._texture.height;
        }
    
        public set height(value:number)
        {
            this._texture.height = value;
        }*/
    Mask.prototype._draw = function (renderable) {
        var renderObject = renderable.renderObject;
        var passes = renderObject.passes;
        var len = passes.length;
        var pass = passes[len - 1];
        var camera = this._renderer._pCamera;
        this._renderer.activatePass(renderable, pass, camera);
        // only render last pass for now
        renderable._iRender(pass, camera, this._renderer._pRttViewProjectionMatrix);
        this._renderer.deactivatePass(renderable, pass);
    };
    return Mask;
})();
module.exports = Mask;


},{}],"awayjs-player/lib/renderer/Renderer2D":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RenderableNullSort = require("awayjs-display/lib/sort/RenderableNullSort");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var Mask = require("awayjs-player/lib/renderer/Mask");
var Renderer2D = (function (_super) {
    __extends(Renderer2D, _super);
    function Renderer2D(rendererPoolClass, stage) {
        if (rendererPoolClass === void 0) { rendererPoolClass = null; }
        if (stage === void 0) { stage = null; }
        _super.call(this, rendererPoolClass, stage);
        this.renderableSorter = new RenderableNullSort();
        this._mask = new Mask(this._pStage, this);
    }
    Renderer2D.prototype.drawRenderables = function (renderable, entityCollector) {
        var i;
        var len;
        var renderable2;
        var renderObject;
        var passes;
        var pass;
        var camera = entityCollector.camera;
        var maskConfigID = undefined;
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
            else if (this._disableColor && renderObject._renderObjectOwner.alphaThreshold != 0) {
                renderable2 = renderable;
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
    };
    return Renderer2D;
})(DefaultRenderer);
module.exports = Renderer2D;


},{"awayjs-display/lib/sort/RenderableNullSort":undefined,"awayjs-player/lib/renderer/Mask":"awayjs-player/lib/renderer/Mask","awayjs-renderergl/lib/DefaultRenderer":undefined}],"awayjs-player/lib/timeline/InterpolationObject":[function(require,module,exports){
/**
 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
 *  A TimeLineObject basically consists of an objID, and an IAsset.
 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets

 */
var InterpolationObject = (function () {
    function InterpolationObject(type, startValue, endValue, startTime, endTime) {
        this._type = type;
        this._startValue = startValue;
        this._startTime = startTime;
        this._endValue = endValue;
        this._duration = endTime - startTime;
    }
    InterpolationObject.prototype.getState = function (time, speed) {
        // todo: handle reverse playback
        if (time < this._startTime * speed) {
            return;
        }
        if (time > this._endTime * speed) {
            return;
        }
        if (this._type == 0) {
            //interpolate number
            return (this._startValue + (((time - this._startTime) * (this._duration * speed)) * (this._endValue - this._startValue)));
        }
        if (this._type == 1) {
        }
        if (this._type == 2) {
        }
        if (this._type == 3) {
        }
        return;
    };
    return InterpolationObject;
})();
module.exports = InterpolationObject;


},{}],"awayjs-player/lib/timeline/TimelineKeyFrame":[function(require,module,exports){
/**
 * TimelineFrame holds 3 list of FrameCommands
 *  - list1 _frameCommands should be  executed when playing the timeline (previous Frame was played)
 *  - list2 _frameCommandsReverse should be executed when playing the timeline reversed (previous Frame was played)
 *  - list3 _frameCommandsInit should be executed when jumping to a frame, so we need to fully init the frame
 *
 *  Addionial TimelineFrame properties are:
 *  - script - can be executed, after the frameCommands have been executed
 *  - list of FrameLabels, and list of corresponding labelTypes
 *  - duration-value (1 frame is not necessary 1 frame long)
 *  - startTime and endTime are needed internally when deciding what frame to display
 */
var TimelineKeyFrame = (function () {
    function TimelineKeyFrame() {
        this._duration = 1; //use millisecs for duration ? or frames ?
        this._frameCommands = new Array();
        this._frameConstructCommands = new Array();
        this._frameDestructCommands = new Array();
        this._isActive = false;
    }
    TimelineKeyFrame.prototype.addCommand = function (command) {
        // make the timeline available for the commands
        this._frameCommands.push(command);
    };
    TimelineKeyFrame.prototype.addConstructCommand = function (command) {
        // make the timeline available for the commands
        this._frameConstructCommands.push(command);
    };
    TimelineKeyFrame.prototype.addDestructCommand = function (command) {
        // make the timeline available for the commands
        this._frameDestructCommands.push(command);
    };
    Object.defineProperty(TimelineKeyFrame.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineKeyFrame.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineKeyFrame.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineKeyFrame.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        enumerable: true,
        configurable: true
    });
    TimelineKeyFrame.prototype.setFrameTime = function (startTime, duration) {
        this._startTime = startTime;
        this._duration = duration;
        this._endTime = startTime + duration;
    };
    TimelineKeyFrame.prototype.activate = function (sourceMovieClip) {
        this._isActive = true;
        var len = this._frameConstructCommands.length;
        for (var i = 0; i < len; i++)
            this._frameConstructCommands[i].execute(sourceMovieClip, this._startTime);
    };
    TimelineKeyFrame.prototype.deactivate = function (sourceMovieClip) {
        this._isActive = false;
        var len = this._frameDestructCommands.length;
        var endTime = this._duration + this._startTime;
        for (var i = 0; i < len; i++)
            this._frameDestructCommands[i].execute(sourceMovieClip, endTime);
    };
    TimelineKeyFrame.prototype.update = function (sourceMovieClip, time) {
        var len = this._frameCommands.length;
        for (var i = 0; i < len; i++)
            this._frameCommands[i].execute(sourceMovieClip, time);
    };
    return TimelineKeyFrame;
})();
module.exports = TimelineKeyFrame;


},{}],"awayjs-player/lib/timeline/commands/AddChildCommand":[function(require,module,exports){
var AddChildCommand = (function () {
    function AddChildCommand(childID) {
        this._childID = childID;
    }
    AddChildCommand.prototype.execute = function (sourceMovieClip, time) {
        sourceMovieClip.activateChild(this._childID);
    };
    return AddChildCommand;
})();
module.exports = AddChildCommand;


},{}],"awayjs-player/lib/timeline/commands/ApplyAS2DepthsCommand":[function(require,module,exports){
// We're using a specific command so we don't need to manage an AS2-like "depth" property, which has no meaning in Away3D's display hierarchy
// This implementation itself is a hack, tho, but it works.
var ApplyAS2DepthsCommand = (function () {
    function ApplyAS2DepthsCommand() {
    }
    ApplyAS2DepthsCommand.prototype.execute = function (sourceMovieClip, time) {
        var childrenArray = sourceMovieClip["_children"];
        childrenArray.sort(this.sortChildrenByDepth);
    };
    ApplyAS2DepthsCommand.prototype.sortChildrenByDepth = function (a, b) {
        var da = (a["__AS2Depth"]);
        var db = (b["__AS2Depth"]);
        if (da === undefined)
            da = 0;
        if (db === undefined)
            db = 0;
        return db - da;
    };
    return ApplyAS2DepthsCommand;
})();
module.exports = ApplyAS2DepthsCommand;


},{}],"awayjs-player/lib/timeline/commands/FrameCommand":[function(require,module,exports){



},{}],"awayjs-player/lib/timeline/commands/RemoveChildCommand":[function(require,module,exports){
var RemoveChildCommand = (function () {
    function RemoveChildCommand(childID) {
        this._childID = childID;
    }
    RemoveChildCommand.prototype.execute = function (sourceMovieClip, time) {
        sourceMovieClip.deactivateChild(this._childID);
    };
    return RemoveChildCommand;
})();
module.exports = RemoveChildCommand;


},{}],"awayjs-player/lib/timeline/commands/UpdatePropertyCommand":[function(require,module,exports){
var UpdatePropertyCommand = (function () {
    // target can be MovieClip, its ColorTransform, and so on
    function UpdatePropertyCommand(targetID, propertyName, value) {
        this._targetID = targetID;
        this._propertyName = propertyName;
        this._value = value;
    }
    UpdatePropertyCommand.prototype.execute = function (sourceMovieClip, time) {
        var target = sourceMovieClip.getPotentialChild(this._targetID);
        target[this._propertyName] = this._value;
    };
    return UpdatePropertyCommand;
})();
module.exports = UpdatePropertyCommand;


},{}]},{},[])


//# sourceMappingURL=awayjs-player.js.map