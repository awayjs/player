import WaveAudio						from "awayjs-core/lib/audio/WaveAudio";
import WaveAudioParser					from "awayjs-core/lib/parsers/WaveAudioParser";
import AssetEvent						from "awayjs-core/lib/events/AssetEvent";
import AS2MovieClipAdapter				from "awayjs-player/lib/adapters/AS2MovieClipAdapter";
import AS2MCSoundProps					from "awayjs-player/lib/adapters/AS2MCSoundProps";
import AssetLibrary						from "awayjs-core/lib/library/AssetLibrary";

declare var mainApplication;

// also contains global AS2 functions
class AS2SoundAdapter
{
	//private _transform:Object;
	private _target:AS2MovieClipAdapter;
	private _soundProps:AS2MCSoundProps;

	private _loop:boolean = false;
	private _name:string = "";
	private _id:number = -1;
	private _playing:boolean = false;
	private  _volume:number = 0; // uses this vol property on sound.

	private static _globalSoundProps:AS2MCSoundProps = new AS2MCSoundProps();
	private static _soundIDCnt:number = 0;

	private _onGlobalChangeDelegate:(event:AssetEvent) => void;

	// TODO: Any real Sound stuff should be externalized for AwayJS use. For now use internally since it's only 2D.
	constructor(target:AS2MovieClipAdapter)
	{
		// not sure how to handle target yet
		this._id = AS2SoundAdapter._soundIDCnt++;
		this._target = target;
		this._soundProps = (target != null && target.__pSoundProps)? this._target.__pSoundProps:AS2SoundAdapter._globalSoundProps;

		this._onGlobalChangeDelegate = (event:AssetEvent) => this.onGlobalChange(event);

		AS2SoundAdapter._globalSoundProps.addEventListener(AssetEvent.INVALIDATE, this._onGlobalChangeDelegate);
	}

	public attachSound(id:string)
	{
		this._name=id;
		// TODO: This will be AudioAsset or something
		var asset = <WaveAudio> AssetLibrary.getAsset(id);

		if (asset)
			this._soundProps.audio = asset.clone();

		this.updateVolume();
	}

	/*getBytesLoaded():number
	{
		return 1;
	}

	getBytesTotal():number
	{
		return 1;
	}*/

	public getPan():number
	{
		return this._soundProps.pan;
	}

	public setPan(value:number)
	{
		this._soundProps.pan = value;
		// panning not supported at this point
	}

	/*getTransform():Object
	{
		return this._transform;
	}

	setTransform(value:Object)
	{
		this._transform = value;
	}*/

	public getVolume():number
	{
		return this._soundProps.volume * 100;
	}

	public setVolume(value:number)
	{
		this._soundProps.volume = value / 100;

		this.updateVolume();
	}

	/*loadSound(url:string, isStreaming:boolean)
	{
		this.disposeAudio();
		// how to handle isStreaming == false? Manually?
		this._soundProps.audio = new Audio();
		this._soundProps.audio.src = url;
		this.initAudio();
	}*/

	public start(offsetInSeconds:number = 0, loops:number = 0)
	{
		this._playing = true;

		this._loop = Boolean(loops > 0);

		// todo volume hardcoded to 1
		if(typeof mainApplication !== "undefined")
			mainApplication.startSound(this._name, this._id, this._volume, this._loop);
		else if(this._soundProps.audio)
			this._soundProps.audio.play(offsetInSeconds, this._loop);
	}

	public stop(linkageID:string = null)
	{
		if(!this._playing)
			return;

		this._playing = false;

		// todo volume hardcoded to 1
		if(typeof mainApplication !== "undefined")
			mainApplication.stopSound(this._id);
		else if(this._soundProps.audio)
			this._soundProps.audio.stop();
	}

	public get position():number
	{
		if(this._soundProps.audio)
			return this._soundProps.audio.currentTime;
		return 0;
	}

	public get duration():number
	{
		if(this._soundProps.audio)
			return this._soundProps.audio.duration;
		return 0;
	}

	public get id3():Object
	{
		return {};
	}

	private onGlobalChange(event:AssetEvent)
	{
		this.updateVolume();
	}

	private updateVolume()
	{
		var vol:number =  this._soundProps.volume * AS2SoundAdapter._globalSoundProps.volume;
		
		if(vol>1)
			vol=1;
		
		if(vol<0)
			vol=0;
		
		vol = Math.round(vol*100)/100;
		
		if(this._volume == vol)
			return;

		this._volume = vol;

		if(typeof mainApplication !== "undefined") {
			if (this._playing)
				mainApplication.updateSound(this._id, this._volume, this._loop);
		} else if (this._soundProps.audio)
			this._soundProps.audio.volume = this._volume;
	}
}
export default AS2SoundAdapter;