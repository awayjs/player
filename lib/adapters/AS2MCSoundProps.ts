import Event = require("awayjs-core/lib/events/Event");
import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");

class AS2MCSoundProps extends EventDispatcher
{
    private _volume : number = 1;
    private _pan : number = 1;
    private _changeEvent : Event = new Event(Event.CHANGE);
    private _loops : number = 0;
    private _audio : HTMLAudioElement;
    private _onEndedDelegate : (event:any) => void;

    constructor()
    {
        super();
        this._onEndedDelegate = (event:Event) => this.onEnded(event);
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

    public get loops()
    {
        return this._loops;
    }

    public set loops(value:number)
    {
        this._loops = value;
    }

    public get audio()
    {
        return this._audio;
    }

    public set audio(value:HTMLAudioElement)
    {
        if (this._audio) {
            this._audio.removeEventListener('ended', this._onEndedDelegate);
            this._audio.pause();
        }

        this._audio = value;
        this._loops = 0;

        if (value)
            value.loop = false;

        this._audio.addEventListener('ended', this._onEndedDelegate);
    }

    private onEnded(event:any):void
    {
        if (--this._loops > 0) {
            this._audio.currentTime = 0;
            this._audio.play();
        }
        else {
            this._loops = 0;
        }
    }
}
export = AS2MCSoundProps;
