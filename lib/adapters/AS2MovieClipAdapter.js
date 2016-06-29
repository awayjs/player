"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var Point_1 = require("@awayjs/core/lib/geom/Point");
var AssetLibrary_1 = require("@awayjs/core/lib/library/AssetLibrary");
var MovieClip_1 = require("@awayjs/display/lib/display/MovieClip");
var MouseEvent_1 = require("@awayjs/display/lib/events/MouseEvent");
var AS2SymbolAdapter_1 = require("../adapters/AS2SymbolAdapter");
var AS2MCSoundProps_1 = require("../adapters/AS2MCSoundProps");
var AS2ColorAdapter_1 = require("../adapters/AS2ColorAdapter");
var AS2SystemAdapter_1 = require("../adapters/AS2SystemAdapter");
var AS2SoundAdapter_1 = require("../adapters/AS2SoundAdapter");
var AS2KeyAdapter_1 = require("../adapters/AS2KeyAdapter");
var AS2MouseAdapter_1 = require("../adapters/AS2MouseAdapter");
var AS2StageAdapter_1 = require("../adapters/AS2StageAdapter");
var AS2SharedObjectAdapter_1 = require("../adapters/AS2SharedObjectAdapter");
var includeString = 'var Color			= this._includes.Color;\n' +
    'var System				= this._includes.System;\n' +
    'var Sound				= this._includes.Sound;\n' +
    'var Key				= this._includes.Key;\n' +
    'var Mouse				= this._includes.Mouse;\n' +
    'var Stage				= this._includes.Stage;\n' +
    'var SharedObject		= this._includes.SharedObject;\n' +
    'var int = function(value) {return Math.floor(value) | 0;}\n' +
    'var string = function(value) {return value.toString();}\n' +
    'var getURL = function(value) {return value;}\n\n';
var AS2MovieClipAdapter = (function (_super) {
    __extends(AS2MovieClipAdapter, _super);
    function AS2MovieClipAdapter(adaptee, view) {
        // create an empty MovieClip if none is passed
        _super.call(this, adaptee || new MovieClip_1.MovieClip(), view);
        this._includes = {
            Color: AS2ColorAdapter_1.AS2ColorAdapter,
            System: AS2SystemAdapter_1.AS2SystemAdapter,
            Sound: AS2SoundAdapter_1.AS2SoundAdapter,
            Key: AS2KeyAdapter_1.AS2KeyAdapter,
            Mouse: AS2MouseAdapter_1.AS2MouseAdapter,
            Stage: AS2StageAdapter_1.AS2StageAdapter,
            SharedObject: AS2SharedObjectAdapter_1.AS2SharedObjectAdapter
        };
        this.__pSoundProps = new AS2MCSoundProps_1.AS2MCSoundProps();
    }
    AS2MovieClipAdapter.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.__pSoundProps.dispose();
        this.__pSoundProps = null;
    };
    Object.defineProperty(AS2MovieClipAdapter.prototype, "_framesloaded", {
        get: function () {
            // not loading frame by frame?
            return this.adaptee.numFrames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "_currentframe", {
        get: function () {
            return this.adaptee.currentFrameIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "_totalframes", {
        get: function () {
            return this.adaptee.numFrames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "enabled", {
        get: function () {
            return this.adaptee.mouseEnabled;
        },
        enumerable: true,
        configurable: true
    });
    AS2MovieClipAdapter.prototype.evalScript = function (str) {
        var tag = document.createElement('script');
        tag.text = 'var __framescript__ = function() {\n' + includeString + str + '\n}';
        //add and remove script tag to dom to trigger compilation
        var sibling = document.scripts[0];
        sibling.parentNode.insertBefore(tag, sibling).parentNode.removeChild(tag);
        var script = __framescript__;
        window['__framescript__'] = null;
        return script;
    };
    //attachAudio(id: AS2SoundAdapter):void {	}
    //attachBitmap(bmp: BitmapImage2D, depth: Number, pixelSnapping: String = null, smoothing: boolean = false):void { }
    AS2MovieClipAdapter.prototype.attachMovie = function (id, name, depth, initObject) {
        if (initObject === void 0) { initObject = null; }
        var attached_mc = AssetLibrary_1.AssetLibrary.getAsset(id);
        var cloned_mc = attached_mc.clone();
        var adapter = new AS2MovieClipAdapter(cloned_mc, this._view);
        this.adaptee.addChildAtDepth(adapter.adaptee, depth);
        adapter.adaptee.name = name;
        this.registerScriptObject(adapter.adaptee);
        return attached_mc;
        // todo: apply object from initObject to attached_mc
    };
    //beginBitmapFill(bmp: BitmapImage2D, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false):void {}
    //beginFill(rgb: Number, alpha: number = 1.0):void {}
    //beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null):void {}
    //clear():void {}
    AS2MovieClipAdapter.prototype.createEmptyMovieClip = function (name, depth) {
        var mc = new MovieClip_1.MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc, this._view);
        mc.name = name;
        this.adaptee.addChildAtDepth(mc, depth);
        this.registerScriptObject(mc);
        return mc.adapter;
    };
    //createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number):TextField {}
    //curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number):void {}
    AS2MovieClipAdapter.prototype.duplicateMovieClip = function (name, depth, initObject) {
        var duplicate = this.adaptee.clone().adapter;
        duplicate.adaptee.name = name;
        if (initObject)
            for (var key in initObject)
                if (duplicate.hasOwnProperty(key))
                    duplicate[key] = initObject[key];
        this.adaptee.parent.addChildAtDepth(duplicate.adaptee, depth);
        return duplicate;
    };
    //endFill():void {}
    //getBounds(bounds: Object):Object { return null; }
    // not applicable?
    AS2MovieClipAdapter.prototype.getBytesLoaded = function () { return 1; };
    // not applicable?
    AS2MovieClipAdapter.prototype.getBytesTotal = function () { return 1; };
    AS2MovieClipAdapter.prototype.getInstanceAtDepth = function (depth) {
        return this.adaptee.getChildAtDepth(depth);
    };
    AS2MovieClipAdapter.prototype.getNextHighestDepth = function () {
        return this.adaptee.getNextHighestDepth();
    };
    //getRect(bounds: Object):Object { return null; }
    //getSWFVersion():number { return 0; }
    //getTextSnapshot():TextSnapshot {}
    //getURL(url: string, window: string, method: string):void {}
    AS2MovieClipAdapter.prototype.globalToLocal = function (pt) {
        var newPoint = this.adaptee.globalToLocal(new Point_1.Point(pt.x, pt.y));
        pt.x = newPoint.x;
        pt.y = newPoint.y;
    };
    AS2MovieClipAdapter.prototype.gotoAndPlay = function (frame) {
        if (frame == null)
            return;
        this.play();
        this._gotoFrame(frame);
    };
    AS2MovieClipAdapter.prototype.gotoAndStop = function (frame) {
        if (frame == null)
            return;
        this.stop();
        this._gotoFrame(frame);
    };
    AS2MovieClipAdapter.prototype.play = function () {
        this.adaptee.play();
    };
    AS2MovieClipAdapter.prototype.stop = function () {
        this.adaptee.stop();
    };
    AS2MovieClipAdapter.prototype.hitTest = function (x, y, shapeFlag) {
        if (shapeFlag === void 0) { shapeFlag = false; }
        return this.adaptee.hitTestPoint(x, y, shapeFlag);
    };
    //lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number):void {}
    //lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number):void {}
    //lineTo(x: number, y: number):void {}
    //loadMovie(url: string, method: string = null):void {}
    //loadVariables(url: string, method: string = null):void {}
    AS2MovieClipAdapter.prototype.localToGlobal = function (pt) {
        var newPoint = this.adaptee.localToGlobal(new Point_1.Point(pt.x, pt.y));
        pt.x = newPoint.x;
        pt.y = newPoint.y;
    };
    //moveTo(x: number, y: number):void {}
    AS2MovieClipAdapter.prototype.nextFrame = function () {
        ++this.adaptee.currentFrameIndex;
    };
    AS2MovieClipAdapter.prototype.prevFrame = function () {
        --this.adaptee.currentFrameIndex;
    };
    //removeMovieClip():void {}
    AS2MovieClipAdapter.prototype.setMask = function (mc) {
        this.adaptee.masks = [mc];
    };
    //startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0):void {}
    //stopDrag():void {}
    AS2MovieClipAdapter.prototype.swapDepths = function (target) {
        var parent = this.adaptee.parent;
        if (parent != null && target.parent == parent)
            parent.swapChildren(this.adaptee, target);
    };
    //unloadMovie():void {}
    AS2MovieClipAdapter.prototype.clone = function (newAdaptee) {
        return new AS2MovieClipAdapter(newAdaptee, this._view);
    };
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onEnterFrame", {
        /**
         *
         */
        get: function () {
            return this._onEnterFrame;
        },
        set: function (value) {
            this._onEnterFrame = this._replaceEventListener(AssetEvent_1.AssetEvent.ENTER_FRAME, this._onEnterFrame, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onRollOut", {
        /**
         *
         */
        get: function () {
            return this._onRollOut;
        },
        set: function (value) {
            this._onRollOut = this._replaceEventListener(MouseEvent_1.MouseEvent.MOUSE_OUT, this._onRollOut, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onRollOver", {
        /**
         *
         */
        get: function () {
            return this._onRollOver;
        },
        set: function (value) {
            this._onRollOver = this._replaceEventListener(MouseEvent_1.MouseEvent.MOUSE_OVER, this._onRollOver, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onRelease", {
        /**
         *
         */
        get: function () {
            return this._onRelease;
        },
        set: function (value) {
            this._onRelease = this._replaceEventListener(MouseEvent_1.MouseEvent.MOUSE_UP, this._onRelease, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onPress", {
        /**
         *
         */
        get: function () {
            return this._onPress;
        },
        set: function (value) {
            this._onPress = this._replaceEventListener(MouseEvent_1.MouseEvent.MOUSE_DOWN, this._onPress, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onMouseDown", {
        /**
         *
         */
        get: function () {
            return this._onMouseDown;
        },
        set: function (value) {
            this._onMouseDown = this._replaceEventListener(MouseEvent_1.MouseEvent.MOUSE_DOWN, this._onMouseDown, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onMouseUp", {
        /**
         *
         */
        get: function () {
            return this._onMouseUp;
        },
        set: function (value) {
            this._onMouseUp = this._replaceEventListener(MouseEvent_1.MouseEvent.MOUSE_UP, this._onMouseUp, value);
        },
        enumerable: true,
        configurable: true
    });
    AS2MovieClipAdapter.prototype.registerScriptObject = function (child) {
        if (child.name)
            this[child.name] = child.adapter ? child.adapter : child;
    };
    AS2MovieClipAdapter.prototype.unregisterScriptObject = function (child) {
        delete this[child.name];
        if (child.isAsset(MovieClip_1.MovieClip))
            child.removeButtonListeners();
    };
    AS2MovieClipAdapter.prototype._gotoFrame = function (frame) {
        var mc = this.adaptee;
        if (typeof frame === "string")
            mc.jumpToLabel(frame);
        else
            mc.currentFrameIndex = frame - 1;
    };
    AS2MovieClipAdapter.prototype._replaceEventListener = function (eventType, currentListener, newListener) {
        var mc = this.adaptee;
        if (currentListener)
            mc.removeEventListener(eventType, currentListener);
        if (newListener) {
            var self = this;
            var delegate = function () { return newListener.call(self); };
            mc.addEventListener(eventType, delegate);
        }
        return delegate;
    };
    return AS2MovieClipAdapter;
}(AS2SymbolAdapter_1.AS2SymbolAdapter));
exports.AS2MovieClipAdapter = AS2MovieClipAdapter;
