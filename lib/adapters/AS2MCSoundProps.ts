import WaveAudio				= require("awayjs-core/lib/data/WaveAudio");
import Event = require("awayjs-core/lib/events/Event");
import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");

class AS2MCSoundProps extends EventDispatcher
{
    private _volume : number = 1;
    private _pan : number = 1;
    private _changeEvent : Event = new Event(Event.CHANGE);
    private _audio : WaveAudio;

    constructor()
    {
        super();
    }

    public dispose()
    {
        this._audio = null;
        this._changeEvent = null;
    }

    public get volume()
    {
        return this._volume;
    }

    public set volume(value:number)
    {
        if (this._volume != value) {
            this._volume = value;
            this.dispatchEvent(this._changeEvent);
        }
    }

    public get pan()
    {
        return this._pan;
    }

    public set pan(value:number)
    {
        if (this._pan != value) {
            this._pan = value;
            this.dispatchEvent(this._changeEvent);
        }
    }

    public get audio()
    {
        return this._audio;
    }

    public set audio(value:WaveAudio)
    {
        if (this._audio)
            this._audio.stop();

        this._audio = value;
    }

}

export = AS2MCSoundProps;