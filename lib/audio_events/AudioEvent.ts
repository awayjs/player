import Event					= require("awayjs-core/lib/events/Event");

/**
 * @class away.events.AudioEvent
 */
class AudioEvent extends Event
{
	/**
	 *
	 */
	public static AUDIO_START:string = "audioStart";

	/**
	 *
	 */
	public static AUDIO_STOP:string = 'audioStop';

	/**
	 *
	 */
	public static AUDIO_UPDATE:string = 'audioUpdate';


	private _sound_name:string;
	private _volume:number;
	private _loop:boolean;

	/**
	 *
	 */
	constructor(type:string, sound_name:string, volume:number, loop:boolean )
	{
		super(type);

		this._sound_name = sound_name;
		this._volume = volume;
		this._loop = loop;
	}

	/**
	 *
	 */
	public get sound_name():string
	{
		return this._sound_name;
	}
	public get volume():number
	{
		return this._volume;
	}
	public get loop():boolean
	{
		return this._loop;
	}

	/**
	 *
	 */
	public clone():Event
	{
		return <Event> new AudioEvent(this.type, this._sound_name, this._volume , this._loop );
	}
}

export = AudioEvent;