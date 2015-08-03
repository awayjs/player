require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"awayjs-player/lib/adapters/AS2ColorAdapter":[function(require,module,exports){
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
// also contains global AS2 functions
var AS2ColorAdapter = (function () {
    function AS2ColorAdapter(target) {
        this._rgb = 0xffffff;
        this._target = target.adaptee.transform.colorTransform || (target.adaptee.transform.colorTransform = new ColorTransform());
        this._transform = { ra: 100, rb: 0, ga: 100, gb: 0, ba: 100, bb: 0, aa: 100, ab: 0 };
    }
    AS2ColorAdapter.prototype.getRGB = function () {
        return this._rgb;
    };
    AS2ColorAdapter.prototype.setRGB = function (value) {
        this._rgb = value;
        var r = (value >> 16) & 0xff;
        var g = (value >> 8) & 0xff;
        var b = value & 0xff;
        this.setTransform({ ra: r / 0xff * 100, ga: g / 0xff * 100, ba: b / 0xff * 100, aa: 100, rb: 0, gb: 0, bb: 0, ab: 0 });
    };
    AS2ColorAdapter.prototype.getTransform = function () {
        return this._transform;
    };
    AS2ColorAdapter.prototype.setTransform = function (value) {
        this._transform = value;
        var ct = this._target;
        ct.redMultiplier = value.ra === undefined ? 1 : value.ra / 100;
        ct.greenMultiplier = value.ga === undefined ? 1 : value.ga / 100;
        ct.blueMultiplier = value.ba === undefined ? 1 : value.ba / 100;
        ct.alphaMultiplier = value.aa === undefined ? 1 : value.aa / 100;
        ct.redOffset = value.rb || 0;
        ct.greenOffset = value.gb || 0;
        ct.blueOffset = value.bb || 0;
        ct.alphaOffset = value.ab || 0;
    };
    return AS2ColorAdapter;
})();
module.exports = AS2ColorAdapter;

},{"awayjs-core/lib/geom/ColorTransform":undefined}],"awayjs-player/lib/adapters/AS2KeyAdapter":[function(require,module,exports){
var AS2KeyAdapter = (function () {
    function AS2KeyAdapter() {
    }
    AS2KeyAdapter.addListener = function (listener) {
        AS2KeyAdapter._listeners.push(listener);
    };
    AS2KeyAdapter.removeListener = function (listener) {
        var listeners = AS2KeyAdapter._listeners;
        var index = listeners.indexOf(listener);
        if (index != -1)
            listeners.splice(index, 1);
    };
    AS2KeyAdapter.isDown = function (code) {
        return AS2KeyAdapter._keys[code];
    };
    AS2KeyAdapter.getCode = function () {
        return AS2KeyAdapter._key;
    };
    AS2KeyAdapter.getAscii = function () {
        return AS2KeyAdapter._char;
    };
    AS2KeyAdapter._onKeyDown = function (event) {
        AS2KeyAdapter._key = event.keyCode;
        AS2KeyAdapter._char = event.charCode;
        AS2KeyAdapter._keys[event.keyCode] = true;
        var len = AS2KeyAdapter._listeners.length;
        for (var i = 0; i < len; i++)
            if (AS2KeyAdapter._listeners[i].onKeyDown)
                AS2KeyAdapter._listeners[i].onKeyDown();
    };
    AS2KeyAdapter._onKeyUp = function (event) {
        AS2KeyAdapter._keys[event.keyCode] = false;
        var len = AS2KeyAdapter._listeners.length;
        for (var i = 0; i < len; i++)
            if (AS2KeyAdapter._listeners[i].onKeyUp)
                AS2KeyAdapter._listeners[i].onKeyUp();
    };
    AS2KeyAdapter._keys = new Array();
    AS2KeyAdapter._listeners = new Array();
    AS2KeyAdapter._addListeners = (function () {
        document.onkeydown = function (event) { return AS2KeyAdapter._onKeyDown(event); };
        document.onkeyup = function (event) { return AS2KeyAdapter._onKeyUp(event); };
    })();
    /**
     * Constant associated with the key code value for the Backspace key (8).
     */
    AS2KeyAdapter.BACKSPACE = 8;
    /**
     * Constant associated with the key code value for the Caps Lock key (20).
     */
    AS2KeyAdapter.CAPSLOCK = 20;
    /**
     * Constant associated with the key code value for the Control key (17).
     */
    AS2KeyAdapter.CONTROL = 17;
    /**
     * Constant associated with the key code value for the Delete key (46).
     */
    AS2KeyAdapter.DELETEKEY = 46;
    /**
     * Constant associated with the key code value for the Down Arrow key (40).
     */
    AS2KeyAdapter.DOWN = 40;
    /**
     * Constant associated with the key code value for the End key (35).
     */
    AS2KeyAdapter.END = 35;
    /**
     * Constant associated with the key code value for the Enter key (13).
     */
    AS2KeyAdapter.ENTER = 13;
    /**
     * Constant associated with the key code value for the Escape key (27).
     */
    AS2KeyAdapter.ESCAPE = 27;
    /**
     * Constant associated with the key code value for the Home key (36).
     */
    AS2KeyAdapter.HOME = 36;
    /**
     * Constant associated with the key code value for the Insert key (45).
     */
    AS2KeyAdapter.INSERT = 45;
    /**
     * Constant associated with the key code value for the Left Arrow key (37).
     */
    AS2KeyAdapter.LEFT = 37;
    /**
     * Constant associated with the key code value for the Page Down key (34).
     */
    AS2KeyAdapter.PGDN = 34;
    /**
     * Constant associated with the key code value for the Page Up key (33).
     */
    AS2KeyAdapter.PGUP = 33;
    /**
     * Constant associated with the key code value for the Right Arrow key (39).
     */
    AS2KeyAdapter.RIGHT = 39;
    /**
     * Constant associated with the key code value for the Shift key (16).
     */
    AS2KeyAdapter.SHIFT = 16;
    /**
     * Constant associated with the key code value for the Spacebar (32).
     */
    AS2KeyAdapter.SPACE = 32;
    /**
     * Constant associated with the key code value for the Tab key (9).
     */
    AS2KeyAdapter.TAB = 9;
    /**
     * Constant associated with the key code value for the Up Arrow key (38).
     */
    AS2KeyAdapter.UP = 38;
    return AS2KeyAdapter;
})();
module.exports = AS2KeyAdapter;

},{}],"awayjs-player/lib/adapters/AS2MCSoundProps":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var AS2MCSoundProps = (function (_super) {
    __extends(AS2MCSoundProps, _super);
    function AS2MCSoundProps() {
        var _this = this;
        _super.call(this);
        this._volume = 1;
        this._pan = 1;
        this._changeEvent = new Event(Event.CHANGE);
        this._loops = 0;
        this._onEndedDelegate = function (event) { return _this.onEnded(event); };
    }
    Object.defineProperty(AS2MCSoundProps.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            if (this._volume != value) {
                this._volume = value;
                this.dispatchEvent(this._changeEvent);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MCSoundProps.prototype, "pan", {
        get: function () {
            return this._pan;
        },
        set: function (value) {
            if (this._pan != value) {
                this._pan = value;
                this.dispatchEvent(this._changeEvent);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MCSoundProps.prototype, "loops", {
        get: function () {
            return this._loops;
        },
        set: function (value) {
            this._loops = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MCSoundProps.prototype, "audio", {
        get: function () {
            return this._audio;
        },
        set: function (value) {
            if (this._audio) {
                this._audio.removeEventListener('ended', this._onEndedDelegate);
                this._audio.stop();
            }
            this._audio = value;
            this._loops = 0;
            if (value)
                value.loop = false;
            this._audio.addEventListener('ended', this._onEndedDelegate);
        },
        enumerable: true,
        configurable: true
    });
    AS2MCSoundProps.prototype.onEnded = function (event) {
        if (--this._loops > 0) {
            this._audio.currentTime = 0;
            this._audio.play();
        }
        else {
            this._loops = 0;
        }
    };
    return AS2MCSoundProps;
})(EventDispatcher);
module.exports = AS2MCSoundProps;

},{"awayjs-core/lib/events/Event":undefined,"awayjs-core/lib/events/EventDispatcher":undefined}],"awayjs-player/lib/adapters/AS2MouseAdapter":[function(require,module,exports){
var AS2MouseAdapter = (function () {
    function AS2MouseAdapter() {
    }
    // this does nothing really, just to catch usage in scripts
    AS2MouseAdapter.addListener = function (listener) {
        AS2MouseAdapter._globalListeners.push(listener);
        // TODO: Init actual mouse events here, relative to root MovieClip (I suppose?)
    };
    AS2MouseAdapter._globalListeners = [];
    return AS2MouseAdapter;
})();
module.exports = AS2MouseAdapter;

},{}],"awayjs-player/lib/adapters/AS2MovieClipAdapter":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
var AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
var MovieClip = require("awayjs-display/lib/entities/MovieClip");
var MouseEvent = require("awayjs-display/lib/events/MouseEvent");
var Event = require("awayjs-core/lib/events/Event");
var Point = require("awayjs-core/lib/geom/Point");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var Color = require("awayjs-player/lib/adapters/AS2ColorAdapter");
var System = require("awayjs-player/lib/adapters/AS2SystemAdapter");
var Sound = require("awayjs-player/lib/adapters/AS2SoundAdapter");
var Key = require("awayjs-player/lib/adapters/AS2KeyAdapter");
var Mouse = require("awayjs-player/lib/adapters/AS2MouseAdapter");
var Stage = require("awayjs-player/lib/adapters/AS2StageAdapter");
var SharedObject = require("awayjs-player/lib/adapters/AS2SharedObjectAdapter");
var int = function (value) { return Math.floor(value) | 0; };
var String = function (value) { return value.toString(); };
var string = function (value) { return value.toString(); };
var getURL = function (value) { return value; };
var AS2MovieClipAdapter = (function (_super) {
    __extends(AS2MovieClipAdapter, _super);
    function AS2MovieClipAdapter(adaptee, view) {
        // create an empty MovieClip if none is passed
        _super.call(this, adaptee || new MovieClip(), view);
        this._framescript_vars = [Color, System, Sound, Key, Mouse, Stage, SharedObject];
        this.__pSoundProps = new AS2MCSoundProps();
    }
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
        try {
            var script = (function () {
                eval(str);
            });
        }
        catch (err) {
            console.log("Syntax error in script:\n", str);
            console.log(err.message);
            throw err;
        }
        return script;
    };
    //attachAudio(id: AS2SoundAdapter) : void {	}
    //attachBitmap(bmp: BitmapImage2D, depth: Number, pixelSnapping: String = null, smoothing: boolean = false) : void { }
    AS2MovieClipAdapter.prototype.attachMovie = function (id, name, depth, initObject) {
        if (initObject === void 0) { initObject = null; }
        var attached_mc = AssetLibrary.getAsset(id);
        var cloned_mc = attached_mc.clone();
        var adapter = new AS2MovieClipAdapter(cloned_mc, this._view);
        adapter.adaptee.name = name;
        this.adaptee.addChildAtDepth(adapter.adaptee, depth);
        this.registerScriptObject(adapter.adaptee);
        return attached_mc;
        // todo: apply object from initObject to attached_mc
    };
    //beginBitmapFill(bmp: BitmapImage2D, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false) : void {}
    //beginFill(rgb: Number, alpha: number = 1.0) : void {}
    //beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null) : void {}
    //clear() : void {}
    AS2MovieClipAdapter.prototype.createEmptyMovieClip = function (name, depth) {
        var adapter = new AS2MovieClipAdapter(null, this._view);
        adapter.adaptee.name = name;
        this.adaptee.addChildAtDepth(adapter.adaptee, depth);
        this.registerScriptObject(adapter.adaptee);
        return adapter;
    };
    //createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}
    //curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}
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
    //endFill() : void {}
    //getBounds(bounds: Object) : Object { return null; }
    // not applicable?
    AS2MovieClipAdapter.prototype.getBytesLoaded = function () {
        return 1;
    };
    // not applicable?
    AS2MovieClipAdapter.prototype.getBytesTotal = function () {
        return 1;
    };
    AS2MovieClipAdapter.prototype.getInstanceAtDepth = function (depth) {
        return this.adaptee.getChildAtDepth(depth);
    };
    AS2MovieClipAdapter.prototype.getNextHighestDepth = function () {
        return this.adaptee.getNextHighestDepth();
    };
    //getRect(bounds: Object) : Object { return null; }
    //getSWFVersion() : number { return 0; }
    //getTextSnapshot() : TextSnapshot {}
    //getURL(url: string, window: string, method: string) : void {}
    AS2MovieClipAdapter.prototype.globalToLocal = function (pt) {
        var newPoint = this.adaptee.globalToLocal(new Point(pt.x, pt.y));
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
    //lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number) : void {}
    //lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number) : void {}
    //lineTo(x: number, y: number) : void {}
    //loadMovie(url: string, method: string = null) : void {}
    //loadVariables(url: string, method: string = null) : void {}
    AS2MovieClipAdapter.prototype.localToGlobal = function (pt) {
        var newPoint = this.adaptee.localToGlobal(new Point(pt.x, pt.y));
        pt.x = newPoint.x;
        pt.y = newPoint.y;
    };
    //moveTo(x: number, y: number) : void {}
    AS2MovieClipAdapter.prototype.nextFrame = function () {
        ++this.adaptee.currentFrameIndex;
    };
    AS2MovieClipAdapter.prototype.prevFrame = function () {
        --this.adaptee.currentFrameIndex;
    };
    //removeMovieClip() : void {}
    AS2MovieClipAdapter.prototype.setMask = function (mc) {
        this.adaptee._iMasks = [mc];
    };
    //startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) : void {}
    //stopDrag() : void {}
    AS2MovieClipAdapter.prototype.swapDepths = function (target) {
        var parent = this.adaptee.parent;
        if (parent != null && target.parent == parent)
            parent.swapChildren(this.adaptee, target);
    };
    //unloadMovie() : void {}
    AS2MovieClipAdapter.prototype.clone = function (newAdaptee) {
        return new AS2MovieClipAdapter(newAdaptee, this._view);
    };
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onEnterFrame", {
        get: function () {
            return this._onEnterFrame;
        },
        set: function (value) {
            this._onEnterFrame = this._replaceEventListener(Event.ENTER_FRAME, this._onEnterFrame, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onRelease", {
        get: function () {
            return this._onRelease;
        },
        set: function (value) {
            this._onRelease = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onRelease, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onMouseDown", {
        get: function () {
            return this._onMouseDown;
        },
        set: function (value) {
            this._onMouseDown = this._replaceEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2MovieClipAdapter.prototype, "onMouseUp", {
        get: function () {
            return this._onMouseUp;
        },
        set: function (value) {
            this._onMouseUp = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onMouseUp, value);
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
        if (child.isAsset(MovieClip)) {
            child.removeButtonListeners();
        }
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
            var delegate = function () {
                newListener.call(self);
            };
            mc.addEventListener(eventType, delegate);
        }
        return delegate;
    };
    return AS2MovieClipAdapter;
})(AS2SymbolAdapter);
module.exports = AS2MovieClipAdapter;

},{"awayjs-core/lib/events/Event":undefined,"awayjs-core/lib/geom/Point":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-display/lib/entities/MovieClip":undefined,"awayjs-display/lib/events/MouseEvent":undefined,"awayjs-player/lib/adapters/AS2ColorAdapter":"awayjs-player/lib/adapters/AS2ColorAdapter","awayjs-player/lib/adapters/AS2KeyAdapter":"awayjs-player/lib/adapters/AS2KeyAdapter","awayjs-player/lib/adapters/AS2MCSoundProps":"awayjs-player/lib/adapters/AS2MCSoundProps","awayjs-player/lib/adapters/AS2MouseAdapter":"awayjs-player/lib/adapters/AS2MouseAdapter","awayjs-player/lib/adapters/AS2SharedObjectAdapter":"awayjs-player/lib/adapters/AS2SharedObjectAdapter","awayjs-player/lib/adapters/AS2SoundAdapter":"awayjs-player/lib/adapters/AS2SoundAdapter","awayjs-player/lib/adapters/AS2StageAdapter":"awayjs-player/lib/adapters/AS2StageAdapter","awayjs-player/lib/adapters/AS2SymbolAdapter":"awayjs-player/lib/adapters/AS2SymbolAdapter","awayjs-player/lib/adapters/AS2SystemAdapter":"awayjs-player/lib/adapters/AS2SystemAdapter"}],"awayjs-player/lib/adapters/AS2SharedObjectAdapter":[function(require,module,exports){
var AS2SharedObjectAdapter = (function () {
    function AS2SharedObjectAdapter(name) {
        this._object_name = name;
        if (typeof (Storage) !== "undefined") {
            this.data = JSON.parse(localStorage.getItem(name));
        }
        if (this.data == null) {
            console.log("no shared object found");
            this.data = {};
        }
    }
    // should become a static
    AS2SharedObjectAdapter.getLocal = function (name, localPath, secure) {
        return new AS2SharedObjectAdapter(name);
    };
    // needs to stay as it is
    AS2SharedObjectAdapter.prototype.flush = function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(this._object_name, JSON.stringify(this.data));
        }
        else {
            console.log("no local storage available");
        }
        // save all local data to wherever it needs to go
    };
    return AS2SharedObjectAdapter;
})();
module.exports = AS2SharedObjectAdapter;

},{}],"awayjs-player/lib/adapters/AS2SoundAdapter":[function(require,module,exports){
var Event = require("awayjs-core/lib/events/Event");
var AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
// also contains global AS2 functions
var AS2SoundAdapter = (function () {
    // TODO: Any real Sound stuff should be externalized for AwayJS use. For now use internally since it's only 2D.
    function AS2SoundAdapter(target) {
        var _this = this;
        // not sure how to handle target yet
        this._target = target;
        this._soundProps = (target != null && target.__pSoundProps) ? this._target.__pSoundProps : AS2SoundAdapter._globalSoundProps;
        this._onGlobalChangeDelegate = function (event) { return _this.onGlobalChange(event); };
        AS2SoundAdapter._globalSoundProps.addEventListener(Event.CHANGE, this._onGlobalChangeDelegate);
    }
    Object.defineProperty(AS2SoundAdapter.prototype, "looping", {
        get: function () {
            return this._soundProps.loops;
        },
        set: function (value) {
            this._soundProps.loops = value;
        },
        enumerable: true,
        configurable: true
    });
    AS2SoundAdapter.prototype.attachSound = function (id) {
        // TODO: This will be AudioAsset or something
        var asset = AssetLibrary.getAsset(id);
        if (asset)
            this._soundProps.audio = asset.clone();
        this.updateVolume();
    };
    /*getBytesLoaded() : number
    {
        return 1;
    }

    getBytesTotal() : number
    {
        return 1;
    }*/
    AS2SoundAdapter.prototype.getPan = function () {
        return this._soundProps.pan;
    };
    AS2SoundAdapter.prototype.setPan = function (value) {
        this._soundProps.pan = value;
        // panning not supported at this point
    };
    /*getTransform() : Object
    {
        return this._transform;
    }

    setTransform(value:Object)
    {
        this._transform = value;
    }*/
    AS2SoundAdapter.prototype.getVolume = function () {
        return this._soundProps.volume * 100;
    };
    AS2SoundAdapter.prototype.setVolume = function (value) {
        this._soundProps.volume = value / 100;
        this.updateVolume();
    };
    /*loadSound(url:string, isStreaming:boolean)
    {
        this.disposeAudio();
        // how to handle isStreaming == false? Manually?
        this._soundProps.audio = new Audio();
        this._soundProps.audio.src = url;
        this.initAudio();
    }*/
    AS2SoundAdapter.prototype.start = function (offsetInSeconds, loops) {
        if (offsetInSeconds === void 0) { offsetInSeconds = 0; }
        if (loops === void 0) { loops = 0; }
        if (this._soundProps.audio) {
            this._soundProps.audio.currentTime = offsetInSeconds;
            this._soundProps.loops = loops;
            this._soundProps.audio.play();
        }
    };
    AS2SoundAdapter.prototype.stop = function (linkageID) {
        if (linkageID === void 0) { linkageID = null; }
        if (this._soundProps.audio)
            this._soundProps.audio.stop();
    };
    Object.defineProperty(AS2SoundAdapter.prototype, "position", {
        get: function () {
            if (this._soundProps.audio)
                return this._soundProps.audio.currentTime;
            return 0;
        },
        set: function (value) {
            if (this._soundProps.audio)
                this._soundProps.audio.currentTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SoundAdapter.prototype, "duration", {
        get: function () {
            if (this._soundProps.audio)
                return this._soundProps.audio.duration;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SoundAdapter.prototype, "id3", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    AS2SoundAdapter.prototype.onGlobalChange = function (event) {
        this.updateVolume();
    };
    AS2SoundAdapter.prototype.updateVolume = function () {
        if (this._soundProps.audio) {
            var vol = this._soundProps.volume * AS2SoundAdapter._globalSoundProps.volume;
            if (vol > 1)
                vol = 1;
            if (vol < 0)
                vol = 0;
            this._soundProps.audio.volume = vol;
        }
    };
    AS2SoundAdapter._globalSoundProps = new AS2MCSoundProps();
    return AS2SoundAdapter;
})();
module.exports = AS2SoundAdapter;

},{"awayjs-core/lib/events/Event":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-player/lib/adapters/AS2MCSoundProps":"awayjs-player/lib/adapters/AS2MCSoundProps"}],"awayjs-player/lib/adapters/AS2StageAdapter":[function(require,module,exports){
var AS2StageAdapter = (function () {
    function AS2StageAdapter() {
    }
    // this does nothing really, just to catch usage in scripts
    AS2StageAdapter.showMenu = true;
    return AS2StageAdapter;
})();
module.exports = AS2StageAdapter;

},{}],"awayjs-player/lib/adapters/AS2SymbolAdapter":[function(require,module,exports){
var AS2SharedObjectAdapter = require("awayjs-player/lib/adapters/AS2SharedObjectAdapter");
var AS2KeyAdapter = require("awayjs-player/lib/adapters/AS2KeyAdapter");
var AS2MouseAdapter = require("awayjs-player/lib/adapters/AS2MouseAdapter");
var AS2StageAdapter = require("awayjs-player/lib/adapters/AS2StageAdapter");
// also contains global AS2 gunctions
var AS2SymbolAdapter = (function () {
    function AS2SymbolAdapter(adaptee, view) {
        this.__quality = "high";
        this._adaptee = adaptee;
        this._view = view;
        this._blockedByScript = false;
        if (AS2SymbolAdapter.REFERENCE_TIME === -1)
            AS2SymbolAdapter.REFERENCE_TIME = new Date().getTime();
    }
    Object.defineProperty(AS2SymbolAdapter.prototype, "Key", {
        // TODO: REMOVE AND PROVIDE AS CLASS (See System) ONCE TRANSLATOR IS FIXED
        // And then change properties to statics
        get: function () {
            return AS2KeyAdapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "Mouse", {
        get: function () {
            return AS2MouseAdapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "Stage", {
        get: function () {
            return AS2StageAdapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "SharedObject", {
        get: function () {
            return AS2SharedObjectAdapter;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.String = function (value) {
        return value.toString();
    };
    AS2SymbolAdapter.prototype.string = function (value) {
        return value.toString();
    };
    AS2SymbolAdapter.prototype.getURL = function (value) {
        return value;
    };
    AS2SymbolAdapter.prototype.isBlockedByScript = function () {
        return this._blockedByScript;
    };
    AS2SymbolAdapter.prototype.isVisibilityByScript = function () {
        return this._visibilityByScript;
    };
    AS2SymbolAdapter.prototype.freeFromScript = function () {
        this._blockedByScript = false;
        this._visibilityByScript = false;
    };
    AS2SymbolAdapter.prototype.getVersion = function () {
        return 0;
    };
    Object.defineProperty(AS2SymbolAdapter.prototype, "adaptee", {
        get: function () {
            return this._adaptee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_height", {
        get: function () {
            return this._adaptee.height;
        },
        set: function (value) {
            this._adaptee.height = value;
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_name", {
        get: function () {
            return this._adaptee.name;
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
            this._blockedByScript = true;
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
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_xmouse", {
        get: function () {
            return this._view.getLocalMouseX(this._adaptee);
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
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_ymouse", {
        get: function () {
            return this._view.getLocalMouseY(this._adaptee);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_xscale", {
        get: function () {
            return this._adaptee.scaleX * 100;
        },
        set: function (value) {
            this._adaptee.scaleX = value / 100;
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_yscale", {
        get: function () {
            return this._adaptee.scaleY * 100;
        },
        set: function (value) {
            this._adaptee.scaleY = value / 100;
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_visible", {
        get: function () {
            return this._adaptee.visible;
        },
        set: function (value) {
            this._adaptee.visible = value;
            this._visibilityByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_width", {
        get: function () {
            return this._adaptee.width;
        },
        set: function (value) {
            this._adaptee.width = value;
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.getDepth = function () {
        return this._adaptee.z;
    };
    Object.defineProperty(AS2SymbolAdapter.prototype, "_quality", {
        // just assure consistency for scripts, doesn't actually effect rendering.
        get: function () {
            return this.__quality;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "quality", {
        set: function (value) {
            this.__quality = value;
            // this._blockedByScript=true;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.trace = function (message) {
        console.log(message);
    };
    // may need proper high-def timer mechanism
    AS2SymbolAdapter.prototype.getTimer = function () {
        return new Date().getTime() - AS2SymbolAdapter.REFERENCE_TIME;
    };
    AS2SymbolAdapter.prototype.int = function (value) {
        return value | 0;
    };
    Object.defineProperty(AS2SymbolAdapter.prototype, "_alpha", {
        get: function () {
            return this.adaptee.transform.colorTransform ? this.adaptee.transform.colorTransform.alphaMultiplier : 1;
        },
        set: function (value) {
            this.adaptee.colorTransform.alphaMultiplier = value;
            this._blockedByScript = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_url", {
        get: function () {
            return document.URL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_global", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_level0", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.clearInterval = function (handle) {
        return window.clearInterval(handle);
    };
    AS2SymbolAdapter.prototype.setInterval = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var scope;
        var func;
        if (typeof (args[0]) == "function") {
            scope = this;
            func = args[0];
        }
        else {
            //remove scope variable from args
            scope = args.shift();
            //reformat function string to actual function variable in the scope
            func = scope[args[0]];
        }
        //wrap function to maintain scope
        args[0] = function () { return func.apply(scope, arguments); };
        return window.setInterval.apply(window, args);
    };
    Object.defineProperty(AS2SymbolAdapter.prototype, "_level10301", {
        // temporary:
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_root", {
        get: function () {
            if (!this.__root) {
                var p = this._parent;
                // parents are always MovieClips
                this.__root = p ? p._root : this;
            }
            return this.__root;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.random = function (range) {
        return Math.random() * range;
    };
    Object.defineProperty(AS2SymbolAdapter.prototype, "_parent", {
        get: function () {
            var parent = this.adaptee.parent;
            return parent ? parent.adapter : null;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.REFERENCE_TIME = -1;
    return AS2SymbolAdapter;
})();
module.exports = AS2SymbolAdapter;

},{"awayjs-player/lib/adapters/AS2KeyAdapter":"awayjs-player/lib/adapters/AS2KeyAdapter","awayjs-player/lib/adapters/AS2MouseAdapter":"awayjs-player/lib/adapters/AS2MouseAdapter","awayjs-player/lib/adapters/AS2SharedObjectAdapter":"awayjs-player/lib/adapters/AS2SharedObjectAdapter","awayjs-player/lib/adapters/AS2StageAdapter":"awayjs-player/lib/adapters/AS2StageAdapter"}],"awayjs-player/lib/adapters/AS2SystemAdapter":[function(require,module,exports){
// also contains global AS2 functions
var AS2SystemAdapter = (function () {
    function AS2SystemAdapter() {
    }
    AS2SystemAdapter.security = null;
    AS2SystemAdapter.capabilities = { version: 6 };
    return AS2SystemAdapter;
})();
module.exports = AS2SystemAdapter;

},{}],"awayjs-player/lib/adapters/AS2TextFieldAdapter":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
var TextField = require("awayjs-display/lib/entities/TextField");
var AS2TextFieldAdapter = (function (_super) {
    __extends(AS2TextFieldAdapter, _super);
    function AS2TextFieldAdapter(adaptee, view) {
        // create an empty text field if none is passed
        _super.call(this, adaptee || new TextField(), view);
    }
    AS2TextFieldAdapter.prototype.clone = function (newAdaptee) {
        return new AS2TextFieldAdapter(newAdaptee, this._view);
    };
    Object.defineProperty(AS2TextFieldAdapter.prototype, "embedFonts", {
        get: function () {
            return this._embedFonts;
        },
        set: function (value) {
            this._embedFonts = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2TextFieldAdapter.prototype, "text", {
        get: function () {
            return this.adaptee.text;
        },
        set: function (value) {
            this.adaptee.text = value;
        },
        enumerable: true,
        configurable: true
    });
    return AS2TextFieldAdapter;
})(AS2SymbolAdapter);
module.exports = AS2TextFieldAdapter;

},{"awayjs-display/lib/entities/TextField":undefined,"awayjs-player/lib/adapters/AS2SymbolAdapter":"awayjs-player/lib/adapters/AS2SymbolAdapter"}],"awayjs-player/lib/bounds/AxisAlignedBoundingBox2D":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AxisAlignedBoundingBox = require("awayjs-display/lib/bounds/AxisAlignedBoundingBox");
/**
 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
 * This is useful for most meshes.
 */
var AxisAlignedBoundingBox2D = (function (_super) {
    __extends(AxisAlignedBoundingBox2D, _super);
    /**
     * Creates a new <code>AxisAlignedBoundingBox</code> object.
     */
    function AxisAlignedBoundingBox2D(entity) {
        _super.call(this, entity);
    }
    AxisAlignedBoundingBox2D.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this._pInvalidated)
            this._pUpdate();
        var halfExtentsX = this._box.width / 2;
        var halfExtentsY = this._box.height / 2;
        var centerX = this._box.x + halfExtentsX;
        var centerY = this._box.y + halfExtentsY;
        var px = position.x - centerX;
        var py = position.y - centerY;
        var pz = position.z;
        var vx = direction.x;
        var vy = direction.y;
        var vz = direction.z;
        var ix;
        var iy;
        var intersects;
        var rayEntryDistance;
        if (!intersects && vz < 0) {
            rayEntryDistance = -pz / vz;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iy = py + rayEntryDistance * vy;
                if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
                    targetNormal.x = 0;
                    targetNormal.y = 0;
                    targetNormal.z = 1;
                    intersects = true;
                }
            }
        }
        if (!intersects && vz > 0) {
            rayEntryDistance = -pz / vz;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iy = py + rayEntryDistance * vy;
                if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
                    targetNormal.x = 0;
                    targetNormal.y = 0;
                    targetNormal.z = -1;
                    intersects = true;
                }
            }
        }
        return intersects ? rayEntryDistance : -1;
    };
    return AxisAlignedBoundingBox2D;
})(AxisAlignedBoundingBox);
module.exports = AxisAlignedBoundingBox;

},{"awayjs-display/lib/bounds/AxisAlignedBoundingBox":undefined}],"awayjs-player/lib/factories/AS2SceneGraphFactory":[function(require,module,exports){
var AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
var AS2TextFieldAdapter = require("awayjs-player/lib/adapters/AS2TextFieldAdapter");
var TextField = require("awayjs-display/lib/entities/TextField");
var MovieClip = require("awayjs-display/lib/entities/MovieClip");
var AS2SceneGraphFactory = (function () {
    function AS2SceneGraphFactory(view) {
        this._view = view;
    }
    AS2SceneGraphFactory.prototype.createMovieClip = function (timeline) {
        var mc = new MovieClip(timeline);
        mc.adapter = new AS2MovieClipAdapter(mc, this._view);
        return mc;
    };
    AS2SceneGraphFactory.prototype.createTextField = function () {
        var tf = new TextField();
        tf.adapter = new AS2TextFieldAdapter(tf, this._view);
        return tf;
    };
    return AS2SceneGraphFactory;
})();
module.exports = AS2SceneGraphFactory;

},{"awayjs-display/lib/entities/MovieClip":undefined,"awayjs-display/lib/entities/TextField":undefined,"awayjs-player/lib/adapters/AS2MovieClipAdapter":"awayjs-player/lib/adapters/AS2MovieClipAdapter","awayjs-player/lib/adapters/AS2TextFieldAdapter":"awayjs-player/lib/adapters/AS2TextFieldAdapter"}],"awayjs-player/lib/partition/Entity2DNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
var AxisAlignedBoundingBox2D = require("awayjs-player/lib/bounds/AxisAlignedBoundingBox2D");
/**
 * @class away.partition.EntityNode
 */
var Entity2DNode = (function (_super) {
    __extends(Entity2DNode, _super);
    function Entity2DNode() {
        _super.apply(this, arguments);
    }
    /**
     * @inheritDoc
     */
    Entity2DNode.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        if (!this._entity._iIsVisible())
            return false;
        var pickingCollisionVO = this._entity._iPickingCollisionVO;
        pickingCollisionVO.localRayPosition = this._entity.inverseSceneTransform.transformVector(rayPosition);
        pickingCollisionVO.localRayDirection = this._entity.inverseSceneTransform.deltaTransformVector(rayDirection);
        if (!pickingCollisionVO.localNormal)
            pickingCollisionVO.localNormal = new Vector3D();
        var rayEntryDistance = this._bounds.rayIntersection(pickingCollisionVO.localRayPosition, pickingCollisionVO.localRayDirection, pickingCollisionVO.localNormal);
        if (rayEntryDistance < 0)
            return false;
        pickingCollisionVO.rayEntryDistance = rayEntryDistance - this._entity.zOffset;
        pickingCollisionVO.rayPosition = rayPosition;
        pickingCollisionVO.rayDirection = rayDirection;
        pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;
        return true;
    };
    Entity2DNode.prototype.updateBounds = function () {
        //hardcode to AxisAlignedBoundingBox2D for the intersection
        this._bounds = new AxisAlignedBoundingBox2D(this._entity);
        this.updateDebugEntity();
    };
    Entity2DNode.id = "entity2DNode";
    return Entity2DNode;
})(EntityNode);
module.exports = Entity2DNode;

},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/partition/EntityNode":undefined,"awayjs-player/lib/bounds/AxisAlignedBoundingBox2D":"awayjs-player/lib/bounds/AxisAlignedBoundingBox2D"}],"awayjs-player/lib/partition/Partition2DNode":[function(require,module,exports){
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
        this._index = 0;
        if (traverser.enterNode(this)) {
            this.traverseSceneGraph(this._root, traverser);
        }
    };
    // pass any so we can convert to IEntity. Sigh, TypeScript.
    Partition2DNode.prototype.traverseSceneGraph = function (displayObject, traverser, maskID, appliedMasks) {
        if (maskID === void 0) { maskID = -1; }
        if (appliedMasks === void 0) { appliedMasks = null; }
        //console.log(displayObject.name);
        if (displayObject._iMaskID !== -1) {
            if (maskID !== -1)
                throw "masks within masker currently not supported";
            maskID = displayObject._iMaskID;
        }
        else {
            //console.log(displayObject._iMasks);
            if (displayObject._iMasks) {
                appliedMasks = appliedMasks ? appliedMasks.concat(displayObject._iMasks) : displayObject._iMasks;
                // signify that applied masks have changed
                ++this._maskConfigID;
            }
        }
        displayObject["hierarchicalMaskID"] = maskID;
        displayObject["hierarchicalMasks"] = appliedMasks;
        displayObject["maskConfigID"] = appliedMasks ? this._maskConfigID : 0;
        // moving back up the tree, mask will change again
        if (displayObject._iMasks)
            ++this._maskConfigID;
        // typechecking is nasty, but we have little choice:
        if (displayObject instanceof DisplayObjectContainer)
            this.traverseChildren(displayObject, traverser, maskID, appliedMasks);
        if (displayObject.isEntity) {
            var entity = displayObject;
            entity.zOffset = ++this._index;
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
var Entity2DNode = require("awayjs-player/lib/partition/Entity2DNode");
var SceneGraphNode = require("awayjs-display/lib/partition/SceneGraphNode");
var Partition2DNode = require("awayjs-player/lib/partition/Partition2DNode");
var EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
var SceneGraphNodePool = require("awayjs-display/lib/pool/SceneGraphNodePool");
var Partition2D = (function (_super) {
    __extends(Partition2D, _super);
    function Partition2D(root) {
        _super.call(this, new Partition2DNode(root));
        this._entity2DNodePool = new EntityNodePool(Entity2DNode, this);
        this._sceneGraphNodePool = new SceneGraphNodePool(SceneGraphNode, this);
    }
    /**
     * @internal
     */
    Partition2D.prototype._iRegisterEntity = function (entity) {
        this.iMarkForUpdate(this._entity2DNodePool.getItem(entity));
    };
    /**
     * @internal
     */
    Partition2D.prototype._iUnregisterEntity = function (entity) {
        this.iRemoveEntity(this._entity2DNodePool.disposeItem(entity));
    };
    return Partition2D;
})(Partition);
module.exports = Partition2D;

},{"awayjs-display/lib/partition/Partition":undefined,"awayjs-display/lib/partition/SceneGraphNode":undefined,"awayjs-display/lib/pool/EntityNodePool":undefined,"awayjs-display/lib/pool/SceneGraphNodePool":undefined,"awayjs-player/lib/partition/Entity2DNode":"awayjs-player/lib/partition/Entity2DNode","awayjs-player/lib/partition/Partition2DNode":"awayjs-player/lib/partition/Partition2DNode"}],"awayjs-player/lib/renderer/Mask":[function(require,module,exports){
var Mask = (function () {
    function Mask(stage, renderer) {
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
    Mask.prototype.registerMask = function (obj) {
        //console.log("registerMask");
        this._registeredMasks.push(obj);
    };
    Mask.prototype.renderMasks = function (masks) {
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
                        //console.log("Rendering hierarchicalMaskID " + mask["hierarchicalMaskID"]);
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
    Mask.prototype._draw = function (renderable) {
        var render = renderable.render;
        var passes = render.passes;
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

},{}],"awayjs-player/lib/renderer/RenderableSort2D":[function(require,module,exports){
/**
 * @class away.sort.RenderableMergeSort
 */
var RenderableMergeSort = (function () {
    function RenderableMergeSort() {
    }
    RenderableMergeSort.prototype.sortBlendedRenderables = function (head) {
        var headB;
        var fast;
        var slow;
        if (!head || !head.next) {
            return head;
        }
        // split in two sublists
        slow = head;
        fast = head.next;
        while (fast) {
            fast = fast.next;
            if (fast) {
                slow = slow.next;
                fast = fast.next;
            }
        }
        headB = slow.next;
        slow.next = null;
        // recurse
        head = this.sortBlendedRenderables(head);
        headB = this.sortBlendedRenderables(headB);
        // merge sublists while respecting order
        var result;
        var curr;
        var l;
        if (!head)
            return headB;
        if (!headB)
            return head;
        while (head && headB) {
            if (head.zIndex < headB.zIndex) {
                l = head;
                head = head.next;
            }
            else {
                l = headB;
                headB = headB.next;
            }
            if (!result)
                result = l;
            else
                curr.next = l;
            curr = l;
        }
        if (head)
            curr.next = head;
        else if (headB)
            curr.next = headB;
        return result;
    };
    RenderableMergeSort.prototype.sortOpaqueRenderables = function (head) {
        return this.sortBlendedRenderables(head);
    };
    return RenderableMergeSort;
})();
module.exports = RenderableMergeSort;

},{}],"awayjs-player/lib/renderer/Renderer2D":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DefaultMaterialManager = require("awayjs-display/lib/managers/DefaultMaterialManager");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var Mask = require("awayjs-player/lib/renderer/Mask");
var RenderableSort2D = require("awayjs-player/lib/renderer/RenderableSort2D");
var Renderer2D = (function (_super) {
    __extends(Renderer2D, _super);
    function Renderer2D(stage) {
        if (stage === void 0) { stage = null; }
        _super.call(this, stage);
        this.renderableSorter = new RenderableSort2D();
        this._mask = new Mask(this._pStage, this);
    }
    Renderer2D.prototype.drawRenderables = function (renderable, entityCollector) {
        var i;
        var len;
        var renderable2;
        var render;
        var passes;
        var pass;
        var camera = entityCollector.camera;
        var maskConfigID = 0;
        /*// TypeScript does not allow calling super.setters -_-
        //this._mask.width = this._pRttBufferManager.textureWidth;
        //this._mask.height = this._pRttBufferManager.textureHeight;*/
        this._mask.reset();
        this._pContext.setStencilActions("frontAndBack", "always", "keep", "keep", "keep");
        //console.log("------");
        var gl = this._pContext["_gl"];
        gl.disable(gl.STENCIL_TEST);
        while (renderable) {
            render = renderable.render;
            passes = render.passes;
            if (renderable.sourceEntity["hierarchicalMaskID"] !== -1) {
                renderable2 = renderable.next;
                //console.log("Registering mask: " + renderable.sourceEntity["hierarchicalMaskID"], renderable.sourceEntity.name);
                this._mask.registerMask(renderable);
            }
            else if (this._disableColor && render._renderOwner.alphaThreshold != 0) {
                renderable2 = renderable;
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
                    } while (renderable2 && renderable2.render == render && renderable2.sourceEntity["maskConfigID"] === maskConfigID && renderable2.sourceEntity["hierarchicalMaskID"] === -1);
                    this.deactivatePass(renderable, pass);
                }
            }
            renderable = renderable2;
        }
    };
    Renderer2D.prototype._iApplyRenderableOwner = function (renderableOwner) {
        var renderable = this._pRenderablePool.getItem(renderableOwner);
        //set local vars for faster referencing
        var render = this._pRenderablePool.getRenderPool(renderableOwner).getItem(renderable.renderOwner || DefaultMaterialManager.getDefaultMaterial(renderableOwner));
        renderable.render = render;
        renderable.renderId = render.renderId;
        renderable.renderOrderId = render.renderOrderId;
        renderable.cascaded = false;
        var entity = renderable.sourceEntity;
        renderable.zIndex = entity["hierarchicalMaskID"] === -1 ? entity.zOffset : -entity.zOffset;
        //store reference to scene transform
        renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);
        if (render.requiresBlending) {
            renderable.next = this._pBlendedRenderableHead;
            this._pBlendedRenderableHead = renderable;
        }
        else {
            renderable.next = this._pOpaqueRenderableHead;
            this._pOpaqueRenderableHead = renderable;
        }
        this._pNumElements += renderable.subGeometryVO.subGeometry.numElements;
    };
    return Renderer2D;
})(DefaultRenderer);
module.exports = Renderer2D;

},{"awayjs-display/lib/managers/DefaultMaterialManager":undefined,"awayjs-player/lib/renderer/Mask":"awayjs-player/lib/renderer/Mask","awayjs-player/lib/renderer/RenderableSort2D":"awayjs-player/lib/renderer/RenderableSort2D","awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},[])


//# sourceMappingURL=awayjs-player.js.map