"use strict";
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var AS2MCSoundProps_1 = require("../adapters/AS2MCSoundProps");
var AssetLibrary_1 = require("@awayjs/core/lib/library/AssetLibrary");
var AudioManager_1 = require("@awayjs/core/lib/managers/AudioManager");
// also contains global AS2 functions
var AS2SoundAdapter = (function () {
    // TODO: Any real Sound stuff should be externalized for AwayJS use. For now use internally since it's only 2D.
    function AS2SoundAdapter(target) {
        var _this = this;
        this._loop = false;
        this._name = "";
        this._id = -1;
        this._playing = false;
        this._volume = 0; // uses this vol property on sound.
        // not sure how to handle target yet
        this._id = AS2SoundAdapter._soundIDCnt++;
        this._target = target;
        this._soundProps = (target != null && target.__pSoundProps) ? this._target.__pSoundProps : AS2SoundAdapter._globalSoundProps;
        this._onGlobalChangeDelegate = function (event) { return _this.onGlobalChange(event); };
        AS2SoundAdapter._globalSoundProps.addEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onGlobalChangeDelegate);
    }
    AS2SoundAdapter.prototype.attachSound = function (id) {
        this._name = id;
        // TODO: This will be AudioAsset or something
        var asset = AssetLibrary_1.AssetLibrary.getAsset(id);
        if (asset)
            this._soundProps.audio = asset.clone();
        this.updateVolume();
    };
    /*getBytesLoaded():number
    {
        return 1;
    }

    getBytesTotal():number
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
    /*getTransform():Object
    {
        return this._transform;
    }

    setTransform(value:Object):void
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
    /*loadSound(url:string, isStreaming:boolean):void
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
        this._playing = true;
        this._loop = Boolean(loops > 0);
        if (AudioManager_1.AudioManager.getExternalSoundInterface()) {
            AudioManager_1.AudioManager.getExternalSoundInterface().startSound(this._name, this._id, this._volume, this._loop);
            return;
        }
        if (this._soundProps.audio) {
            this._soundProps.audio.play(offsetInSeconds, this._loop);
            return;
        }
        console.log("Calling AS2SoundAdapter.start() was not successfull. Audio not set for this sound.");
    };
    AS2SoundAdapter.prototype.stop = function (linkageID) {
        if (linkageID === void 0) { linkageID = null; }
        if (!this._playing)
            return;
        this._playing = false;
        if (AudioManager_1.AudioManager.getExternalSoundInterface()) {
            AudioManager_1.AudioManager.getExternalSoundInterface().stopSound(this._id);
            return;
        }
        else if (this._soundProps.audio) {
            this._soundProps.audio.stop();
            return;
        }
        console.log("Calling AS2SoundAdapter.stop() was not successfull. Audio not set for this sound.");
    };
    Object.defineProperty(AS2SoundAdapter.prototype, "position", {
        get: function () {
            if (this._soundProps.audio)
                return this._soundProps.audio.currentTime;
            return 0;
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
        var vol = this._soundProps.volume * AS2SoundAdapter._globalSoundProps.volume;
        if (vol > 1)
            vol = 1;
        if (vol < 0)
            vol = 0;
        vol = Math.round(vol * 100) / 100;
        if (this._volume == vol)
            return;
        this._volume = vol;
        if (AudioManager_1.AudioManager.getExternalSoundInterface()) {
            if (this._playing)
                AudioManager_1.AudioManager.getExternalSoundInterface().updateSound(this._id, this._volume, this._loop);
        }
        else if (this._soundProps.audio)
            this._soundProps.audio.volume = this._volume;
    };
    AS2SoundAdapter._globalSoundProps = new AS2MCSoundProps_1.AS2MCSoundProps();
    AS2SoundAdapter._soundIDCnt = 0;
    return AS2SoundAdapter;
}());
exports.AS2SoundAdapter = AS2SoundAdapter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AS2SoundAdapter;
