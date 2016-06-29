"use strict";
var ColorTransform_1 = require("@awayjs/core/lib/geom/ColorTransform");
var HierarchicalProperties_1 = require("@awayjs/display/lib/base/HierarchicalProperties");
var FrameScriptManager_1 = require("@awayjs/display/lib/managers/FrameScriptManager");
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
    AS2SymbolAdapter.prototype.isBlockedByScript = function () { return this._blockedByScript; };
    AS2SymbolAdapter.prototype.isVisibilityByScript = function () { return this._visibilityByScript; };
    AS2SymbolAdapter.prototype.freeFromScript = function () { this._blockedByScript = false; this._visibilityByScript = false; };
    AS2SymbolAdapter.prototype.dispose = function () {
        this._adaptee = null;
        this._view = null;
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
    Object.defineProperty(AS2SymbolAdapter.prototype, "_touchpoints", {
        get: function () {
            return this._view.getLocalTouchPoints(this._adaptee);
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
    Object.defineProperty(AS2SymbolAdapter.prototype, "_alpha", {
        get: function () {
            return this.adaptee.transform.colorTransform ? (this.adaptee.transform.colorTransform.alphaMultiplier * 100) : 100;
        },
        set: function (value) {
            if (!this.adaptee.transform.colorTransform)
                this.adaptee.transform.colorTransform = new ColorTransform_1.ColorTransform();
            this.adaptee.transform.colorTransform.alphaMultiplier = value / 100;
            this.adaptee.pInvalidateHierarchicalProperties(HierarchicalProperties_1.HierarchicalProperties.COLOR_TRANSFORM);
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
        FrameScriptManager_1.FrameScriptManager.clearInterval(handle); //window.clearInterval(handle);
        return;
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
        args[0] = function () { func.apply(scope, arguments); };
        return FrameScriptManager_1.FrameScriptManager.setInterval(args[0]); // window.setInterval.apply(window, args);
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
        return Math.floor(Math.random() * range);
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
}());
exports.AS2SymbolAdapter = AS2SymbolAdapter;
