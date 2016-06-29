"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var AS2MCSoundProps = (function (_super) {
    __extends(AS2MCSoundProps, _super);
    function AS2MCSoundProps() {
        _super.call(this);
        this._volume = 1;
        this._pan = 1;
        this._changeEvent = new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.INVALIDATE, this);
    }
    AS2MCSoundProps.prototype.dispose = function () {
        this._audio = null;
        this._changeEvent = null;
    };
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
    Object.defineProperty(AS2MCSoundProps.prototype, "audio", {
        get: function () {
            return this._audio;
        },
        set: function (value) {
            if (this._audio)
                this._audio.stop();
            this._audio = value;
        },
        enumerable: true,
        configurable: true
    });
    return AS2MCSoundProps;
}(AssetBase_1.AssetBase));
exports.AS2MCSoundProps = AS2MCSoundProps;
