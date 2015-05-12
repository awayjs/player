import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");

// also contains global AS2 functions
class AS2SoundAdapter
{
    private _pan : number = 0;
    private _volume : number = 0;
    private _transform : Object;
    private _audio : HTMLAudioElement;

    // TODO: Any real Sound stuff should be externalized for AwayJS use. For now use internally since it's only 2D.
    constructor(target:AS2MovieClipAdapter)
    {
        // not sure how to handle target yet
        this._audio = new Audio();
    }

    attachSound(id:string)
    {
        // not sure how to handle this one yet
    }

    getBytesLoaded() : number
    {
        return 1;
    }

    getBytesTotal() : number
    {
        return 1;
    }

    getPan() : number
    {
        return this._pan;
    }

    setPan(value : number)
    {
        this._pan = value;
    }

    getTransform() : Object
    {
        return this._transform;
    }

    setTransform(value:Object)
    {
        this._transform = value;
    }

    getVolume() : number
    {
        return this._volume;
    }

    setVolume(value : number)
    {
        this._volume = value;
    }

    loadSound(url:string, isStreaming:boolean)
    {
        this._audio.src = url;
        // how to handle isStreaming? Manually?
    }

    start(offsetInSeconds:number, loops:number = 0)
    {
        this._audio.currentTime = offsetInSeconds;
        this._audio.play();
        this._audio.loop = loops? true : false;
    }

    stop(linkageID:string = null)
    {
        this._audio.pause();
    }

    get position() : number
    {
        return this._audio.currentTime;
    }

    set position(value : number)
    {
        this._audio.currentTime = value;
    }

    get duration() : number
    {
        return this._audio.duration;
    }

    get id3() : Object
    {
        return {};
    }
}
export = AS2SoundAdapter;