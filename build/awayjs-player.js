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
var MovieClip = require("awayjs-player/lib/display/MovieClip");
var MouseEvent = require("awayjs-display/lib/events/MouseEvent");
var MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
var Point = require("awayjs-core/lib/geom/Point");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var AS2MovieClipAdapter = (function (_super) {
    __extends(AS2MovieClipAdapter, _super);
    function AS2MovieClipAdapter(adaptee, view) {
        adaptee = adaptee || new MovieClip();
        // create an empty MovieClip if none is passed
        _super.call(this, adaptee, view);
        this.__pSoundProps = new AS2MCSoundProps();
        var self = this;
        adaptee.addEventListener(MovieClipEvent.CHILD_ADDED, function (event) {
            self._pOnChildAdded.call(self, event);
        });
        adaptee.addEventListener(MovieClipEvent.CHILD_REMOVED, function (event) {
            self._pOnChildRemoved.call(self, event);
        });
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
        var duplicate = (this.adaptee.clone());
        duplicate.name = name;
        if (initObject) {
            for (var key in initObject) {
                if (duplicate.adapter.hasOwnProperty(key))
                    duplicate.adapter[key] = initObject[key];
            }
        }
        this.adaptee.parent.addChildAtDepth(duplicate, depth);
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
            this._onEnterFrame = this._replaceEventListener(MovieClipEvent.ENTER_FRAME, this._onEnterFrame, value);
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
            this[child.name] = child["adapter"] ? child["adapter"] : child;
    };
    AS2MovieClipAdapter.prototype.unregisterScriptObject = function (child) {
        delete this[child.name];
        if (child.isAsset(MovieClip)) {
            child.removeButtonListener();
        }
    };
    AS2MovieClipAdapter.prototype._pOnChildAdded = function (event) {
        //var child = event.displayObject;
        //var self = this;
        // scope is broken, so fix it
        //this._nameChangeCallback = function(event:MovieClipEvent) { self._pOnChildNameChanged.call(self, event); }
        //child.addEventListener(MovieClipEvent.NAME_CHANGED, this._nameChangeCallback );
    };
    AS2MovieClipAdapter.prototype._pOnChildRemoved = function (event) {
        //var child = event.displayObject;
        //child.removeEventListener(MovieClipEvent.NAME_CHANGED, this._nameChangeCallback);
        //if (child.name) this._pUnregisterChild(child);
    };
    AS2MovieClipAdapter.prototype._pOnChildNameChanged = function (event) {
        var child = event.displayObject;
        this.registerScriptObject(child);
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

},{"awayjs-core/lib/geom/Point":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-display/lib/events/MouseEvent":undefined,"awayjs-player/lib/adapters/AS2MCSoundProps":"awayjs-player/lib/adapters/AS2MCSoundProps","awayjs-player/lib/adapters/AS2SymbolAdapter":"awayjs-player/lib/adapters/AS2SymbolAdapter","awayjs-player/lib/display/MovieClip":"awayjs-player/lib/display/MovieClip","awayjs-player/lib/events/MovieClipEvent":"awayjs-player/lib/events/MovieClipEvent"}],"awayjs-player/lib/adapters/AS2SharedObjectAdapter":[function(require,module,exports){
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
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
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
        if (!AS2SymbolAdapter.CLASS_REPLACEMENTS) {
            AS2SymbolAdapter.CLASS_REPLACEMENTS = {};
            AS2SymbolAdapter.CLASS_REPLACEMENTS["Color"] = "awayjs-player/lib/adapters/AS2ColorAdapter";
            AS2SymbolAdapter.CLASS_REPLACEMENTS["System"] = "awayjs-player/lib/adapters/AS2SystemAdapter";
            AS2SymbolAdapter.CLASS_REPLACEMENTS["Sound"] = "awayjs-player/lib/adapters/AS2SoundAdapter";
        }
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
    AS2SymbolAdapter.prototype.freeFromScript = function () {
        this._blockedByScript = false;
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
            //this._blockedByScript=true;
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
            if (!this.adaptee.transform.colorTransform)
                this.adaptee.transform.colorTransform = new ColorTransform();
            this.adaptee.transform.colorTransform.alphaMultiplier = value;
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
        clearInterval(handle);
    };
    AS2SymbolAdapter.prototype.setInterval = function (handler, timeout) {
        setInterval(handler, timeout);
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
    Object.defineProperty(AS2SymbolAdapter.prototype, "classReplacements", {
        get: function () {
            return AS2SymbolAdapter.CLASS_REPLACEMENTS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_parent", {
        get: function () {
            var parent = this.adaptee.parent;
            return parent ? (parent.adapter) : null;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.REFERENCE_TIME = -1;
    return AS2SymbolAdapter;
})();
module.exports = AS2SymbolAdapter;

},{"awayjs-core/lib/geom/ColorTransform":undefined,"awayjs-player/lib/adapters/AS2KeyAdapter":"awayjs-player/lib/adapters/AS2KeyAdapter","awayjs-player/lib/adapters/AS2MouseAdapter":"awayjs-player/lib/adapters/AS2MouseAdapter","awayjs-player/lib/adapters/AS2SharedObjectAdapter":"awayjs-player/lib/adapters/AS2SharedObjectAdapter","awayjs-player/lib/adapters/AS2StageAdapter":"awayjs-player/lib/adapters/AS2StageAdapter"}],"awayjs-player/lib/adapters/AS2SystemAdapter":[function(require,module,exports){
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
var AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
var AS2TextFieldAdapter = (function (_super) {
    __extends(AS2TextFieldAdapter, _super);
    function AS2TextFieldAdapter(adaptee, view) {
        // create an empty text field if none is passed
        _super.call(this, adaptee || new AdaptedTextField(), view);
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

},{"awayjs-player/lib/adapters/AS2SymbolAdapter":"awayjs-player/lib/adapters/AS2SymbolAdapter","awayjs-player/lib/display/AdaptedTextField":"awayjs-player/lib/display/AdaptedTextField"}],"awayjs-player/lib/adapters/MovieClipAdapter":[function(require,module,exports){

},{}],"awayjs-player/lib/adapters/TextFieldAdapter":[function(require,module,exports){

},{}],"awayjs-player/lib/bounds/AxisAlignedBoundingBox2D":[function(require,module,exports){
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

},{"awayjs-display/lib/bounds/AxisAlignedBoundingBox":undefined}],"awayjs-player/lib/display/AdaptedTextField":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TextField = require("awayjs-display/lib/entities/TextField");
var MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
var AdaptedTextField = (function (_super) {
    __extends(AdaptedTextField, _super);
    function AdaptedTextField() {
        _super.call(this);
    }
    Object.defineProperty(AdaptedTextField.prototype, "adapter", {
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
    AdaptedTextField.prototype.clone = function () {
        var clone = new AdaptedTextField();
        this._iCopyToTextField(clone);
        if (this._adapter)
            clone.adapter = this._adapter.clone(clone);
        return clone;
    };
    Object.defineProperty(AdaptedTextField.prototype, "name", {
        get: function () {
            return this._pName;
        },
        set: function (value) {
            if (this._pName !== value) {
                this._pName = value;
                this.dispatchEvent(new MovieClipEvent(MovieClipEvent.NAME_CHANGED, this));
            }
        },
        enumerable: true,
        configurable: true
    });
    return AdaptedTextField;
})(TextField);
module.exports = AdaptedTextField;

},{"awayjs-display/lib/entities/TextField":undefined,"awayjs-player/lib/events/MovieClipEvent":"awayjs-player/lib/events/MovieClipEvent"}],"awayjs-player/lib/display/MovieClip":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var MouseEvent = require("awayjs-display/lib/events/MouseEvent");
var MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        _super.call(this);
        this._loop = true;
        this._prototype = this;
        this._potentialInstances = [];
        this._currentFrameIndex = -1;
        this._constructedKeyFrameIndex = -1;
        this._isInit = true;
        this._framescripts_to_execute = [];
        this._isPlaying = true; // auto-play
        this._isButton = false;
        this._fps = 30;
        this._time = 0;
        this._enterFrame = new MovieClipEvent(MovieClipEvent.ENTER_FRAME, this);
        this.inheritColorTransform = true;
    }
    Object.defineProperty(MovieClip.prototype, "isInit", {
        get: function () {
            return this._isInit;
        },
        set: function (value) {
            this._isInit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "timeline", {
        get: function () {
            return this._timeline;
        },
        set: function (value) {
            this._timeline = value;
            var i = 0;
            var potential_child_length = value.getPotentialChilds().length;
            for (i = 0; i < potential_child_length; i++) {
                this._potentialInstances[i] = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "loop", {
        get: function () {
            return this._loop;
        },
        set: function (value) {
            this._loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "numFrames", {
        get: function () {
            return this.timeline.numFrames();
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.jumpToLabel = function (label) {
        // the timeline.jumpTolabel will set currentFrameIndex
        this.timeline.jumpToLabel(this, label);
    };
    Object.defineProperty(MovieClip.prototype, "currentFrameIndex", {
        get: function () {
            return this._currentFrameIndex;
        },
        /*
        * Setting the currentFrameIndex will move the playhead for this movieclip to the new position
         */
        set: function (value) {
            if (this._timeline) {
                value = Math.floor(value);
                if (value < 0)
                    value = 0;
                else if (value >= this.timeline.numFrames())
                    value = this.timeline.numFrames() - 1;
                this._skipAdvance = true;
                //this._time = 0;
                this.timeline.gotoFrame(this, value);
                this._currentFrameIndex = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "constructedKeyFrameIndex", {
        get: function () {
            return this._constructedKeyFrameIndex;
        },
        set: function (value) {
            this._constructedKeyFrameIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.reset = function () {
        //if(this.adapter && this.adapter.isBlockedByScript()){
        this._framescripts_to_execute = [];
        this._isPlaying = true;
        this._time = 0;
        this._currentFrameIndex = -1;
        this._constructedKeyFrameIndex = -1;
        var i = this.numChildren;
        while (i--)
            this.removeChildAt(i);
        for (var key in this._potentialInstances) {
            if (this._potentialInstances[key]) {
                if (this._potentialInstances[key].isAsset(MovieClip))
                    this._potentialInstances[key].reset();
            }
        }
        if (this.parent) {
            this._currentFrameIndex = 0;
            this.timeline.constructNextFrame(this);
            this._skipAdvance = true;
        }
        //___scoped_this___.dennis.mov.Man.body.reach.gotoAndPlay("call");
        // i was thinking we might need to reset all children, but it makes stuff worse
        /*
        var i:number=this.numChildren;
        while (i--) {
            var child = this.getChildAt(i);
            if (child.isAsset(MovieClip))
                (<MovieClip>child).reset();
        }
        */
        //this.advanceChildren();
    };
    Object.defineProperty(MovieClip.prototype, "adapter", {
        // adapter is used to provide MovieClip to scripts taken from different platforms
        // TODO: Perhaps adapters should be created dynamically whenever needed, rather than storing them
        get: function () {
            return this._adapter;
        },
        // setter typically managed by factory
        set: function (value) {
            this._adapter = value;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.makeButton = function () {
        this._isButton = true;
        this.stop();
        this._onMouseOver = function (evt) {
            evt.target.currentFrameIndex = 1;
        };
        this._onMouseOut = function (evt) {
            evt.target.currentFrameIndex = 0;
        };
        this._onMouseDown = function (evt) {
            evt.target.currentFrameIndex = 2;
        };
        this._onMouseUp = function (evt) {
            evt.target.currentFrameIndex = this.currentFrameIndex == 0 ? 0 : 1;
        };
        this.addEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
        this.addEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
        this.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
        this.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
    };
    MovieClip.prototype.removeButtonListener = function () {
        this.removeEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
        this.removeEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
        this.removeEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
        this.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
    };
    Object.defineProperty(MovieClip.prototype, "name", {
        get: function () {
            return this._pName;
        },
        set: function (value) {
            if (this._pName !== value) {
                this._pName = value;
                this.dispatchEvent(new MovieClipEvent(MovieClipEvent.NAME_CHANGED, this));
            }
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.addChild = function (child) {
        //if (child.name) console.log("adding child " + child.name + " at frame " + this._currentFrameIndex);
        child.inheritColorTransform = true;
        _super.prototype.addChild.call(this, child);
        if (child.isAsset(MovieClip)) {
            if (child.timeline) {
                if (child.currentFrameIndex == -1) {
                    child.reset();
                }
            }
        }
        this.dispatchEvent(new MovieClipEvent(MovieClipEvent.CHILD_ADDED, child));
        return child;
    };
    MovieClip.prototype.removeChild = function (child) {
        _super.prototype.removeChild.call(this, child);
        this.dispatchEvent(new MovieClipEvent(MovieClipEvent.CHILD_REMOVED, child));
        return child;
    };
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
        var frameMarker = Math.floor(1000 / this._fps);
        // right now, just advance frame once time marker has been reached (only allow for one frame advance per-update)
        this._time += Math.min(timeDelta, frameMarker);
        if (this._time >= frameMarker) {
            this._time = 0;
            this.advanceFrame();
            //console.log("update "+this._currentFrameIndex);
            //console.log("update key "+this._constructedKeyFrameIndex);
            this.dispatchEvent(this._enterFrame);
            var has_executed_script = true;
            while (has_executed_script)
                has_executed_script = this.executePostConstructCommands();
        }
    };
    MovieClip.prototype.getPotentialChildInstance = function (id) {
        if (!this._potentialInstances[id]) {
            this._potentialInstances[id] = this.timeline.getPotentialChildInstance(id);
        }
        return this._potentialInstances[id];
    };
    MovieClip.prototype.addScriptForExecution = function (value) {
        this._framescripts_to_execute.push(value);
    };
    MovieClip.prototype.activateChild = function (id) {
        this.addChild(this.getPotentialChildInstance(id));
    };
    MovieClip.prototype.deactivateChild = function (id) {
        this.removeChild(this._potentialInstances[id]);
    };
    /**
     * Stop playback of animation and hold current position
     */
    MovieClip.prototype.stop = function () {
        this._isPlaying = false;
    };
    MovieClip.prototype.clone = function () {
        var clone = new MovieClip();
        var i;
        if (this._adapter)
            clone.adapter = this._adapter.clone(clone);
        clone._prototype = this._prototype;
        clone.timeline = this.timeline;
        clone._fps = this._fps;
        clone._loop = this._loop;
        clone.name = this.name;
        clone.mouseEnabled = this.mouseEnabled;
        clone.mouseChildren = this.mouseChildren;
        clone._iMaskID = this._iMaskID;
        clone._iMasks = this._iMasks ? this._iMasks.concat() : null;
        if (this.transform.matrix)
            clone.transform.matrix = this.transform.matrix.clone();
        clone.transform.matrix3D = this.transform.matrix3D;
        var ct = this.transform.colorTransform;
        if (ct)
            clone.transform.colorTransform = new ColorTransform(ct.redMultiplier, ct.greenMultiplier, ct.blueMultiplier, ct.alphaMultiplier, ct.redOffset, ct.greenOffset, ct.blueOffset, ct.alphaOffset);
        return clone;
    };
    MovieClip.prototype.advanceFrame = function (skipChildren) {
        if (skipChildren === void 0) { skipChildren = false; }
        if (this.timeline) {
            var i;
            var oldFrameIndex = this._currentFrameIndex;
            var advance = (this._isPlaying && !this._skipAdvance) || oldFrameIndex == -1;
            if (advance && oldFrameIndex == this.timeline.numFrames() - 1 && !this._loop) {
                advance = false;
            }
            if (advance && oldFrameIndex == 0 && this.timeline.numFrames() == 1) {
                //console.log("one frame clip");
                this._currentFrameIndex = 0;
                advance = false;
            }
            if (advance) {
                //console.log("advance");
                ++this._currentFrameIndex;
                if (this._currentFrameIndex == this.timeline.numFrames()) {
                    // looping - jump to first frame.
                    this.currentFrameIndex = 0;
                }
                else if (oldFrameIndex != this._currentFrameIndex) {
                    // not looping - construct next frame
                    this.timeline.constructNextFrame(this);
                }
            }
            if (!skipChildren)
                this.advanceChildren();
        }
        this._skipAdvance = false;
    };
    MovieClip.prototype.advanceChildren = function () {
        var len = this.numChildren;
        for (var i = 0; i < len; ++i) {
            var child = this.getChildAt(i);
            if (child instanceof MovieClip)
                child.advanceFrame();
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
        str += " " + target.name + " = " + target._iMaskID;
        console.log(str);
    };
    MovieClip.prototype.executePostConstructCommands = function () {
        // a script ,might call gotoAndStop() / gotoAndPlay() on itself or on other mc
        // this might result in more script that should be executed.
        // each mc provides a list of index to script that needs postconstructing.
        // in this function, we postcontruct all those scripts
        var has_script_executed = false;
        if (this.timeline) {
            if (this._framescripts_to_execute.length > 0) {
                has_script_executed = true;
                var caller = this.adapter ? this.adapter : this;
                try {
                    this._framescripts_to_execute[0].call(caller);
                }
                catch (err) {
                    console.log("Script error in " + this.name + "\n", this._framescripts_to_execute[0]);
                    console.log(err.message);
                    throw err;
                }
                this._framescripts_to_execute.shift();
            }
        }
        var i;
        var len = this.numChildren - 1;
        for (i = len; i >= 0; --i) {
            var child = this.getChildAt(i);
            if (child.isAsset(MovieClip)) {
                if (child.executePostConstructCommands()) {
                    has_script_executed = true;
                }
            }
        }
        return has_script_executed;
    };
    MovieClip.assetType = "[asset MovieClip]";
    return MovieClip;
})(DisplayObjectContainer);
module.exports = MovieClip;

},{"awayjs-core/lib/geom/ColorTransform":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":undefined,"awayjs-display/lib/events/MouseEvent":undefined,"awayjs-player/lib/events/MovieClipEvent":"awayjs-player/lib/events/MovieClipEvent"}],"awayjs-player/lib/events/MovieClipEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var MovieClipEvent = (function (_super) {
    __extends(MovieClipEvent, _super);
    function MovieClipEvent(type, displayObject) {
        _super.call(this, type);
        this.displayObject = displayObject;
    }
    MovieClipEvent.NAME_CHANGED = "nameChanged";
    MovieClipEvent.CHILD_ADDED = "childAdded";
    MovieClipEvent.CHILD_REMOVED = "childRemoved";
    return MovieClipEvent;
})(Event);
module.exports = MovieClipEvent;

},{"awayjs-core/lib/events/Event":undefined}],"awayjs-player/lib/factories/AS2SceneGraphFactory":[function(require,module,exports){
var AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
var AS2TextFieldAdapter = require("awayjs-player/lib/adapters/AS2TextFieldAdapter");
var MovieClip = require("awayjs-player/lib/display/MovieClip");
var AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
var AS2SceneGraphFactory = (function () {
    function AS2SceneGraphFactory(view) {
        this._view = view;
    }
    AS2SceneGraphFactory.prototype.createMovieClip = function () {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc, this._view);
        return mc;
    };
    AS2SceneGraphFactory.prototype.createTextField = function () {
        var tf = new AdaptedTextField();
        tf.adapter = new AS2TextFieldAdapter(tf, this._view);
        return tf;
    };
    return AS2SceneGraphFactory;
})();
module.exports = AS2SceneGraphFactory;

},{"awayjs-player/lib/adapters/AS2MovieClipAdapter":"awayjs-player/lib/adapters/AS2MovieClipAdapter","awayjs-player/lib/adapters/AS2TextFieldAdapter":"awayjs-player/lib/adapters/AS2TextFieldAdapter","awayjs-player/lib/display/AdaptedTextField":"awayjs-player/lib/display/AdaptedTextField","awayjs-player/lib/display/MovieClip":"awayjs-player/lib/display/MovieClip"}],"awayjs-player/lib/factories/TimelineSceneGraphFactory":[function(require,module,exports){

},{}],"awayjs-player/lib/partition/Entity2DNode":[function(require,module,exports){
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
var Partition2DNode = require("awayjs-player/lib/partition/Partition2DNode");
var EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
var Partition2D = (function (_super) {
    __extends(Partition2D, _super);
    function Partition2D(root) {
        _super.call(this, new Partition2DNode(root));
        this._entity2DNodePool = new EntityNodePool(Entity2DNode, this);
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

},{"awayjs-display/lib/partition/Partition":undefined,"awayjs-display/lib/pool/EntityNodePool":undefined,"awayjs-player/lib/partition/Entity2DNode":"awayjs-player/lib/partition/Entity2DNode","awayjs-player/lib/partition/Partition2DNode":"awayjs-player/lib/partition/Partition2DNode"}],"awayjs-player/lib/renderer/Mask":[function(require,module,exports){
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

},{"awayjs-display/lib/managers/DefaultMaterialManager":undefined,"awayjs-player/lib/renderer/Mask":"awayjs-player/lib/renderer/Mask","awayjs-player/lib/renderer/RenderableSort2D":"awayjs-player/lib/renderer/RenderableSort2D","awayjs-renderergl/lib/DefaultRenderer":undefined}],"awayjs-player/lib/timeline/Timeline":[function(require,module,exports){
var MovieClip = require("awayjs-player/lib/display/MovieClip");
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Timeline = (function () {
    function Timeline() {
        this.numKeyFrames = 0;
        this._potentialPrototypes = [];
        this._keyframe_indices = [];
        this._labels = {};
        this._framescripts = {};
        this._framescripts_translated = {};
    }
    Timeline.prototype.init = function () {
        if ((this._frame_command_indices == null) || (this._frame_recipe == null) || (this._keyframe_durations == null))
            return;
        this._keyframe_firstframes = [];
        this._keyframe_constructframes = [];
        var frame_cnt = 0;
        var ic = 0;
        var ic2 = 0;
        var keyframe_cnt = 0;
        var last_construct_frame = 0;
        for (ic = 0; ic < this.numKeyFrames; ic++) {
            var duration = this._keyframe_durations[(ic)];
            if ((this._frame_recipe[ic] & 1) == 1)
                last_construct_frame = keyframe_cnt;
            this._keyframe_firstframes[keyframe_cnt] = frame_cnt;
            this._keyframe_constructframes[keyframe_cnt++] = last_construct_frame;
            for (ic2 = 0; ic2 < duration; ic2++) {
                this._keyframe_indices[frame_cnt++] = ic;
            }
        }
    };
    Timeline.prototype.get_framescript = function (keyframe_index) {
        if (this._framescripts[keyframe_index] == null)
            return "";
        if (typeof this._framescripts[keyframe_index] == "string")
            return this._framescripts[keyframe_index];
        else {
            throw new Error("Framescript is already translated to Function!!!");
        }
        return "";
    };
    Timeline.prototype.add_framescript = function (value, keyframe_index) {
        this._framescripts[keyframe_index] = value;
    };
    Timeline.prototype.regexIndexOf = function (str, regex, startpos) {
        var indexOf = str.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    };
    Timeline.prototype.add_script_for_postcontruct = function (target_mc, keyframe_idx) {
        if (this._framescripts[keyframe_idx] != null) {
            if (this._framescripts_translated[keyframe_idx] == null) {
                this.translateScript(target_mc.adapter.classReplacements, this._framescripts[keyframe_idx], keyframe_idx);
            }
            target_mc.addScriptForExecution(this._framescripts[keyframe_idx]);
        }
    };
    // TODO: handle this in the exporter so it's safe!
    Timeline.prototype.translateScript = function (classReplacements, frame_script_in, keyframe_idx) {
        var replaced = frame_script_in.replace(/(\\n|\r)/g, "");
        var replacementPreface = "";
        var replacementPostface = "";
        for (var srcName in classReplacements) {
            var dstName = classReplacements[srcName];
            // where class name is a single word
            //var regex = "\b" + srcName + "\b";
            //replaced = replaced.replace(new RegExp(regex, "g"), dstName);
            // store old references to stuff in a temporary var to be reset after script execution;
            // make sure a definition exists, even if it's undefined
            replacementPreface += "var __OLD_" + srcName + " = typeof " + srcName + " == 'function'? " + srcName + " : undefined;\n";
            replacementPreface += srcName + " = require(\"" + dstName + "\");\n";
            replacementPreface += "function int(value) { return value | 0; }\n";
            replacementPostface += srcName + " = __OLD_" + srcName + ";\n";
        }
        // make sure we don't use "this", since Actionscript's "this" has the same scope rules as a variable
        var str = replacementPreface + replaced + replacementPostface;
        //console.log(str);
        this._framescripts_translated[keyframe_idx] = true;
        try {
            this._framescripts[keyframe_idx] = new Function(str);
        }
        catch (err) {
            console.log("Syntax error in script:\n", str);
            console.log(err.message);
            throw err;
        }
    };
    Object.defineProperty(Timeline.prototype, "keyframe_durations", {
        set: function (value) {
            this._keyframe_durations = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "frame_command_indices", {
        set: function (value) {
            this._frame_command_indices = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "frame_recipe", {
        set: function (value) {
            this._frame_recipe = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "command_index_stream", {
        set: function (value) {
            this._command_index_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "command_length_stream", {
        set: function (value) {
            this._command_length_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "add_child_stream", {
        set: function (value) {
            this._add_child_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "remove_child_stream", {
        set: function (value) {
            this._remove_child_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "update_child_stream", {
        set: function (value) {
            this._update_child_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "update_child_props_indices_stream", {
        set: function (value) {
            this._update_child_props_indices_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "update_child_props_length_stream", {
        set: function (value) {
            this._update_child_props_length_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "property_index_stream", {
        set: function (value) {
            this._property_index_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "property_type_stream", {
        set: function (value) {
            this._property_type_stream = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "properties_stream_f32_mtx_all", {
        set: function (value) {
            this._properties_stream_f32_mtx_all = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "properties_stream_f32_mtx_scale_rot", {
        set: function (value) {
            this._properties_stream_f32_mtx_scale_rot = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "properties_stream_f32_mtx_pos", {
        set: function (value) {
            this._properties_stream_f32_mtx_pos = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "properties_stream_f32_ct", {
        set: function (value) {
            this._properties_stream_f32_ct = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "properties_stream_int", {
        set: function (value) {
            this._properties_stream_int = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "properties_stream_strings", {
        set: function (value) {
            this._properties_stream_strings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "keyframe_indices", {
        set: function (value) {
            this._keyframe_indices = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "keyframe_firstframes", {
        set: function (value) {
            this._keyframe_firstframes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "keyframe_constructframes", {
        set: function (value) {
            this._keyframe_constructframes = value;
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.numFrames = function () {
        return this._keyframe_indices.length;
    };
    Timeline.prototype.getPotentialChildPrototype = function (id) {
        return this._potentialPrototypes[id];
    };
    Timeline.prototype.getKeyframeIndexForFrameIndex = function (frame_index) {
        return this._keyframe_indices[frame_index];
    };
    Timeline.prototype.getPotentialChilds = function () {
        return this._potentialPrototypes;
    };
    Timeline.prototype.getPotentialChildInstance = function (id) {
        return this._potentialPrototypes[id].clone();
    };
    Timeline.prototype.registerPotentialChild = function (prototype) {
        var id = this._potentialPrototypes.length;
        this._potentialPrototypes[id] = prototype;
    };
    Timeline.prototype.jumpToLabel = function (target_mc, label) {
        var key_frame_index = this._labels[label];
        if (key_frame_index >= 0)
            target_mc.currentFrameIndex = this._keyframe_firstframes[key_frame_index];
    };
    Timeline.prototype.gotoFrame = function (target_mc, value) {
        //console.log("gotoframe");
        var frameIndex = target_mc.currentFrameIndex;
        var current_keyframe_idx = target_mc.constructedKeyFrameIndex;
        var target_keyframe_idx = this._keyframe_indices[value];
        var firstframe = this._keyframe_firstframes[target_keyframe_idx];
        if (frameIndex == value) {
            //we are already on this frame.
            return;
        }
        //console.log("gotoframe 2");
        if (firstframe == value) {
            //frame changed. and firstframe of keyframe. execute framescript if available
            this.add_script_for_postcontruct(target_mc, target_keyframe_idx);
        }
        if (current_keyframe_idx == target_keyframe_idx) {
            // already constructed
            return;
        }
        var break_frame_idx = this._keyframe_constructframes[target_keyframe_idx];
        //we now have 3 index to keyframes: current_keyframe_idx / target_keyframe_idx / break_frame_idx
        var jump_forward = (target_keyframe_idx > current_keyframe_idx);
        var jump_gap = (break_frame_idx > current_keyframe_idx);
        // in case we jump back or we jump a gap, we want to start constructing at BreakFrame
        var start_construct_idx = break_frame_idx;
        // in case we jump fporward, but not jump a gap, we start at current_keyframe_idx +1
        if ((jump_forward) && (!jump_gap)) {
            start_construct_idx = current_keyframe_idx + 1;
        }
        var removeAll = false;
        var removeAllFromScript = false;
        // if we jump backwards, or if we jump a gap, we want to remove everything from the stage.
        // if we jump a gap, we also want to free everything from script access.
        if ((!jump_forward) || (jump_gap)) {
            removeAll = true;
            if (jump_gap) {
                removeAllFromScript;
            }
        }
        var previous_sessions = []; // store a list of all previous active sessionIDs
        var previous_mcs = []; // store a list of all previous active Movieclips
        var session_cnt = 0;
        var prev_script_cnt = 0;
        var i = 0;
        var k = 0;
        for (i = target_mc.numChildren - 1; i >= 0; i--) {
            //else{
            var child = target_mc.getChildAt(i);
            // if we jump back, or if we do not jump a gap, we need to collect all sessionIDs, in order to know what to reset
            if ((!jump_forward) || (!jump_gap)) {
                previous_sessions[session_cnt++] = child["__sessionID"];
            }
            if (removeAll) {
                if (removeAllFromScript) {
                    target_mc.adapter.unregisterScriptObject(child);
                    if (child.isAsset(MovieClip) && child.adapter)
                        child.adapter.freeFromScript();
                }
                target_mc.removeChildAt(i);
            }
            else {
                if (child.isAsset(MovieClip))
                    previous_mcs[prev_script_cnt++] = child;
            }
        }
        //  pass1: only apply add/remove commands.
        var update_indices = []; // store a list of updatecommand_indices, so we dont have to read frame_recipe again
        var update_cnt = 0;
        for (k = start_construct_idx; k <= target_keyframe_idx; k++) {
            var frame_command_idx = this._frame_command_indices[k];
            var frame_recipe = this._frame_recipe[k];
            if ((frame_recipe & 2) == 2)
                this.remove_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++]);
            if ((frame_recipe & 4) == 4)
                this.add_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++]);
            if ((frame_recipe & 8) == 8)
                update_indices[update_cnt++] = frame_command_idx; // execute update command later
        }
        session_cnt = 0;
        var target_sessions = [];
        for (i = 0; i < target_mc.numChildren; ++i) {
            var child = target_mc.getChildAt(i);
            target_sessions[session_cnt++] = child["__sessionID"];
            if (previous_sessions.indexOf(child["__sessionID"]) == -1) {
                child.reset_to_init_state();
                if (child.isAsset(MovieClip))
                    child.reset();
            }
            else {
                if (!jump_forward) {
                    var doit = true;
                    if (child.isAsset(MovieClip)) {
                        if (child.adapter && child.adapter.isBlockedByScript())
                            doit = false;
                    }
                    if (doit)
                        child.reset_to_init_state();
                }
            }
        }
        for (i = 0; i < previous_mcs.length; ++i) {
            if (target_sessions.indexOf(previous_mcs[i]["__sessionID"]) == -1) {
                previous_mcs[i].adapter.freeFromScript();
                target_mc.adapter.unregisterScriptObject(previous_mcs[i]);
            }
        }
        //  pass2: apply update commands for objects on stage (only if they are not blocked by script)
        var frame_command_idx = 0;
        for (k = 0; k < update_indices.length; k++) {
            frame_command_idx = update_indices[k];
            this.update_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx]);
        }
        target_mc.constructedKeyFrameIndex = target_keyframe_idx;
    };
    Timeline.prototype.constructNextFrame = function (target_mc) {
        //console.log("next frame");
        var frameIndex = target_mc.currentFrameIndex;
        var constructed_keyFrameIndex = target_mc.constructedKeyFrameIndex;
        var new_keyFrameIndex = this._keyframe_indices[frameIndex];
        if (constructed_keyFrameIndex != new_keyFrameIndex) {
            target_mc.constructedKeyFrameIndex = new_keyFrameIndex;
            var frame_command_idx = this._frame_command_indices[new_keyFrameIndex];
            var frame_recipe = this._frame_recipe[new_keyFrameIndex];
            if ((frame_recipe & 1) == 1) {
                var i = target_mc.numChildren;
                while (i--)
                    target_mc.removeChildAt(i);
            }
            else if ((frame_recipe & 2) == 2) {
                this.remove_childs_continous(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++]);
            }
            if ((frame_recipe & 4) == 4)
                this.add_childs_continous(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++]);
            if ((frame_recipe & 8) == 8)
                this.update_childs(target_mc, this._command_index_stream[frame_command_idx], this._command_length_stream[frame_command_idx++]);
        }
        if (this._keyframe_firstframes[new_keyFrameIndex] == frameIndex) {
            this.add_script_for_postcontruct(target_mc, new_keyFrameIndex);
        }
    };
    Timeline.prototype.remove_childs = function (sourceMovieClip, start_index, len) {
        for (var i = 0; i < len; i++)
            sourceMovieClip.removeChildAtDepth(this._remove_child_stream[start_index + i] - 16383);
    };
    Timeline.prototype.remove_childs_continous = function (sourceMovieClip, start_index, len) {
        for (var i = 0; i < len; i++) {
            var target = sourceMovieClip.removeChildAtDepth(this._remove_child_stream[start_index + i] - 16383);
            sourceMovieClip.adapter.unregisterScriptObject(target);
            if (target.isAsset(MovieClip) && target.adapter)
                target.adapter.freeFromScript();
        }
    };
    // used to add childs when jumping between frames
    Timeline.prototype.add_childs = function (sourceMovieClip, start_index, len) {
        for (var i = 0; i < len; i++) {
            var target = sourceMovieClip.getPotentialChildInstance(this._add_child_stream[(start_index * 2) + (i * 2)]);
            target["__sessionID"] = start_index + i;
            sourceMovieClip.addChildAtDepth(target, this._add_child_stream[(start_index * 2) + (i * 2) + 1] - 16383);
        }
    };
    // used to add childs when jumping between frames
    Timeline.prototype.add_childs_continous = function (sourceMovieClip, start_index, len) {
        for (var i = 0; i < len; i++) {
            var target = sourceMovieClip.getPotentialChildInstance(this._add_child_stream[(start_index * 2) + (i * 2)]);
            target["__sessionID"] = start_index + i;
            if (target.isAsset(MovieClip)) {
                if (target.adapter && !target.adapter.isBlockedByScript()) {
                    target.reset();
                    target.reset_to_init_state();
                }
            }
            else {
                target.reset_to_init_state();
            }
            sourceMovieClip.addChildAtDepth(target, this._add_child_stream[(start_index * 2) + (i * 2) + 1] - 16383);
        }
    };
    Timeline.prototype.update_childs = function (sourceMovieClip, start_index, len) {
        //console.log("update childs");
        var i;
        var pc;
        var props_cnt;
        var props_start_idx;
        var value_start_index;
        var props_type;
        var doit;
        for (i = 0; i < len; i++) {
            var childID = this._update_child_stream[start_index + i];
            //console.log("childID = "+childID);
            var target = sourceMovieClip.getPotentialChildInstance(childID);
            if (target.parent == sourceMovieClip) {
                doit = true;
                // check if the child is active + not blocked by script
                if (target.isAsset(MovieClip)) {
                    if (target.adapter.isBlockedByScript()) {
                        doit = false;
                    }
                }
                props_start_idx = this._update_child_props_indices_stream[start_index + i];
                props_cnt = this._update_child_props_length_stream[start_index + i];
                for (pc = 0; pc < props_cnt; pc++) {
                    props_type = this._property_type_stream[props_start_idx + pc];
                    value_start_index = this._property_index_stream[props_start_idx + pc];
                    switch (props_type) {
                        case 0:
                            break;
                        case 1:
                            if (doit) {
                                var new_matrix = target["_iMatrix3D"];
                                if (new_matrix == null) {
                                    new_matrix = new Matrix3D();
                                }
                                new_matrix.rawData[0] = this._properties_stream_f32_mtx_all[(value_start_index * 6)];
                                new_matrix.rawData[1] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 1];
                                new_matrix.rawData[4] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 2];
                                new_matrix.rawData[5] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 3];
                                new_matrix.rawData[12] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 4];
                                new_matrix.rawData[13] = this._properties_stream_f32_mtx_all[(value_start_index * 6) + 5];
                                target["_iMatrix3D"] = new_matrix;
                            }
                            break;
                        case 2:
                            if (doit) {
                                var new_ct = target["colorTransform"];
                                if (new_ct == null) {
                                    new_ct = new ColorTransform();
                                }
                                new_ct.redMultiplier = this._properties_stream_f32_ct[(value_start_index * 8)];
                                new_ct.greenMultiplier = this._properties_stream_f32_ct[(value_start_index * 8) + 1];
                                new_ct.blueMultiplier = this._properties_stream_f32_ct[(value_start_index * 8) + 2];
                                new_ct.alphaMultiplier = this._properties_stream_f32_ct[(value_start_index * 8) + 3];
                                new_ct.redOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 4];
                                new_ct.greenOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 5];
                                new_ct.blueOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 6];
                                new_ct.alphaOffset = this._properties_stream_f32_ct[(value_start_index * 8) + 7];
                                target["colorTransform"] = new_ct;
                            }
                            break;
                        case 3:
                            var mask_length = this._properties_stream_int[value_start_index];
                            var firstMaskID = this._properties_stream_int[value_start_index + 1] - 1;
                            //console.log("mask length "+mask_length);
                            if ((mask_length == 1) && (firstMaskID == -1)) {
                                target["_iMaskID"] = childID;
                            }
                            else {
                                var mc = 0;
                                var mc2 = 0;
                                var masks = new Array();
                                for (mc = 1; mc <= mask_length; mc++) {
                                    masks[mc2] = sourceMovieClip.getPotentialChildInstance(this._properties_stream_int[value_start_index + mc] - 1);
                                    masks[mc2].mouseEnabled = false;
                                    if (masks[mc2].isAsset(MovieClip))
                                        masks[mc2].mouseChildren = false;
                                    mc2++;
                                }
                                target._iMasks = masks;
                            }
                            break;
                        case 4:
                            target.name = this._properties_stream_strings[value_start_index];
                            sourceMovieClip.adapter.registerScriptObject(target);
                            break;
                        case 5:
                            target.name = this._properties_stream_strings[value_start_index];
                            sourceMovieClip.adapter.registerScriptObject(target);
                            //console.log("registered button = "+target.name);
                            target.makeButton();
                            break;
                        case 6:
                            if (doit) {
                                if (value_start_index == 0)
                                    target.visible = false;
                                else
                                    target.visible = true;
                            }
                            break;
                        case 11:
                            if (doit) {
                                var new_matrix = target["_iMatrix3D"];
                                if (new_matrix == null) {
                                    new_matrix = new Matrix3D();
                                }
                                new_matrix.rawData[0] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4)];
                                new_matrix.rawData[1] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4) + 1];
                                new_matrix.rawData[4] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4) + 2];
                                new_matrix.rawData[5] = this._properties_stream_f32_mtx_scale_rot[(value_start_index * 4) + 3];
                                target["_iMatrix3D"] = new_matrix;
                            }
                            break;
                        case 12:
                            if (doit) {
                                var new_matrix = target["_iMatrix3D"];
                                if (new_matrix == null) {
                                    new_matrix = new Matrix3D();
                                }
                                new_matrix.rawData[12] = this._properties_stream_f32_mtx_pos[(value_start_index * 2)];
                                new_matrix.rawData[13] = this._properties_stream_f32_mtx_pos[(value_start_index * 2) + 1];
                                target["_iMatrix3D"] = new_matrix;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };
    return Timeline;
})();
module.exports = Timeline;

},{"awayjs-core/lib/geom/ColorTransform":undefined,"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-player/lib/display/MovieClip":"awayjs-player/lib/display/MovieClip"}]},{},[])


//# sourceMappingURL=awayjs-player.js.map