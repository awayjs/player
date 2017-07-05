import {AssetEvent, EventBase, Point, AssetLibrary, URLRequest, LoaderEvent} from "@awayjs/core";

import {DisplayObject, LoaderContainer, DisplayObjectContainer, IMovieClipAdapter, MovieClip, MouseEvent, IView} from "@awayjs/scene";

import {AS2SymbolAdapter}					from "./AS2SymbolAdapter";
import {AS2MCSoundProps}					from "./AS2MCSoundProps";
import {AS2ColorAdapter}					from "./AS2ColorAdapter";
import {AS2SystemAdapter}					from "./AS2SystemAdapter";
import {AS2SoundAdapter}					from "./AS2SoundAdapter";
import {AS2KeyAdapter}						from "./AS2KeyAdapter";
import {AS2MouseAdapter}					from "./AS2MouseAdapter";
import {AS2StageAdapter}					from "./AS2StageAdapter";
import {AS2SharedObjectAdapter}				from "./AS2SharedObjectAdapter";


var includeString:string
	= 'var Color			= this._includes.Color;\n' +
	'var System				= this._includes.System;\n' +
	'var Sound				= this._includes.Sound;\n' +
	'var Key				= this._includes.Key;\n' +
	'var Mouse				= this._includes.Mouse;\n' +
	'var Stage				= this._includes.Stage;\n' +
	'var SharedObject		= this._includes.SharedObject;\n' +
	'var int = function(value) {return Math.floor(value) | 0;}\n' +
	'var string = function(value) {return value.toString();}\n' +
	'var getURL = function(value) {window.open(value,"_blank");}\n\n';

declare var __framescript__;

export class AS2MovieClipAdapter extends AS2SymbolAdapter implements IMovieClipAdapter
{
	// _droptarget [read-only]
	// focusEnabled: Boolean
	// forceSmoothing: Boolean
	// hitArea: Object
	// _lockroot: Boolean
	// opaqueBackground: Number
	// scrollRect: Object
	// tabChildren: Boolean
	// transform: Transform		// contains matrix + color matrix

	public __pSoundProps:AS2MCSoundProps;

	public _includes:Object={
		Color:AS2ColorAdapter,
		System:AS2SystemAdapter,
		Sound:AS2SoundAdapter,
		Key:AS2KeyAdapter,
		Mouse:AS2MouseAdapter,
		Stage:AS2StageAdapter,
		SharedObject:AS2SharedObjectAdapter
	};

	// translate to scripts:
	private _onEnterFrame:(event:AssetEvent) => void;
	private _onRelease:(event:MouseEvent) => void;
	private _onRollOver:(event:MouseEvent) => void;
	private _onRollOut:(event:MouseEvent) => void;
	private _onPress: (event:MouseEvent) => void;
	private _onMouseDown:(event:MouseEvent) => void;
	private _onMouseUp:(event:MouseEvent) => void;
	private _onMouseWheel:(event:MouseEvent) => void;

	constructor(adaptee:MovieClip, view:IView)
	{
		// create an empty MovieClip if none is passed
		super(adaptee || new MovieClip(), view);
		this.__pSoundProps = new AS2MCSoundProps();

		this._onLoaderCompleteDelegate = (event:LoaderEvent) => this.onLoaderComplete(event);
		this._onAssetCompleteDelegate = (event:AssetEvent) => this.onAssetComplete(event);

	}
private _loader:LoaderContainer;
	public loadMovie(url:string, method:string=null):void
	{
		this._loader = new LoaderContainer();
		this._loader.addEventListener(LoaderEvent.LOAD_COMPLETE, this._onLoaderCompleteDelegate);
		this._loader.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
		this._loader.load(new URLRequest(url));
	}

	private _onLoaderCompleteDelegate:(event:LoaderEvent) => void;
	private onLoaderComplete(event: LoaderEvent){
		console.log("loaded url!");
		this._loader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this._onLoaderCompleteDelegate);
		this._loader.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
		this._loader=null;
		//todo: dispose loader ?

	}

	private _onAssetCompleteDelegate:(event:AssetEvent) => void;
	private onAssetComplete(event: AssetEvent){

		event.asset
		if(event.asset.isAsset(MovieClip)) {
			var awayMC:MovieClip=(<MovieClip>event.asset);
			// if this is the "Scene 1", we transfer the timeline into the mc that is loading the movie
			if (event.asset.name=="Scene 1" || event.asset.name=="main"){
				//this.adaptee.addChild(awayMC);
				(<MovieClip>this.adaptee).timeline=awayMC.timeline;
				(<MovieClip>this.adaptee).reset();
				this.gotoAndPlay(1);
			}
		}
	}
	public dispose():void
	{
		super.dispose();

		this.__pSoundProps.dispose();
		this.__pSoundProps = null;
	}

	public get _framesloaded():number
	{
		// not loading frame by frame?
		return (<MovieClip> this.adaptee).numFrames;
	}

	public get _currentframe():number
	{
		return (<MovieClip> this.adaptee).currentFrameIndex + 1;
	}

	public get _totalframes():number
	{
		return (<MovieClip> this.adaptee).numFrames;
	}

	public get enabled():boolean
	{
		return (<MovieClip> this.adaptee).mouseEnabled;
	}

	public evalScript(str:string):Function
	{
		var tag:HTMLScriptElement = document.createElement('script');
		tag.text = 'var __framescript__ = function() {\n' + includeString + str + '\n}';

		//add and remove script tag to dom to trigger compilation
		var sibling = document.scripts[0];
		sibling.parentNode.insertBefore(tag, sibling).parentNode.removeChild(tag);

		var script =  __framescript__;
		window['__framescript__'] = null;

		return script;
	}

	//attachAudio(id: AS2SoundAdapter):void {	}

	//attachBitmap(bmp: BitmapImage2D, depth: Number, pixelSnapping: String = null, smoothing: boolean = false):void { }

	public attachMovie(id: string, name: string, depth: number, initObject: Object = null):MovieClip
	{
		var attached_mc:MovieClip = <MovieClip> AssetLibrary.getAsset(id);
		var cloned_mc:MovieClip = <MovieClip> attached_mc.clone();
		var adapter = new AS2MovieClipAdapter(cloned_mc, this._view);
		(<MovieClip> this.adaptee).addChildAtDepth(adapter.adaptee, depth);
		adapter.adaptee.name = name;
		this.registerScriptObject(adapter.adaptee);
		return attached_mc;
		// todo: apply object from initObject to attached_mc

	}

	//beginBitmapFill(bmp: BitmapImage2D, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false):void {}

	//beginFill(rgb: Number, alpha: number = 1.0):void {}

	//beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null):void {}

	//clear():void {}

	public createEmptyMovieClip(name: string, depth: number):AS2MovieClipAdapter
	{
		var mc:MovieClip = new MovieClip();
		mc.adapter = new AS2MovieClipAdapter(mc, this._view);
		mc.name = name;
		(<MovieClip> this.adaptee).addChildAtDepth(mc, depth);
		this.registerScriptObject(mc);
		return <AS2MovieClipAdapter> mc.adapter;
	}

	//createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number):TextField {}

	//curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number):void {}

	public duplicateMovieClip(name: string, depth: number, initObject: Object):AS2MovieClipAdapter
	{
		var duplicate:AS2MovieClipAdapter = <AS2MovieClipAdapter> this.adaptee.clone().adapter;
		duplicate.adaptee.name = name;

		if (initObject)
			for (var key in initObject)
				if (duplicate.hasOwnProperty(key))
					duplicate[key] = initObject[key];

		this.adaptee.parent.addChildAtDepth(duplicate.adaptee, depth);

		return duplicate;
	}

	//endFill():void {}

	//getBounds(bounds: Object):Object { return null; }

	// not applicable?
	getBytesLoaded():number { return 1; }

	// not applicable?
	getBytesTotal():number { return 1; }

	getInstanceAtDepth(depth: number):MovieClip
	{
		return <MovieClip> (<MovieClip> this.adaptee).getChildAtDepth(depth);
	}

	getNextHighestDepth():number
	{
		return (<MovieClip> this.adaptee).getNextHighestDepth();
	}

	//getRect(bounds: Object):Object { return null; }

	//getSWFVersion():number { return 0; }

	//getTextSnapshot():TextSnapshot {}

	//getURL(url: string, window: string, method: string):void {}

	globalToLocal(pt: any):void
	{
		var newPoint = this.adaptee.globalToLocal(new Point(pt.x, pt.y));
		pt.x = newPoint.x;
		pt.y = newPoint.y;
	}

	gotoAndPlay(frame: any):void
	{
		if (frame == null)
			return;

		this.play();
		this._gotoFrame(frame);
	}

	gotoAndStop(frame: any):void
	{
		if (frame == null)
			return;

		this.stop();
		this._gotoFrame(frame);
	}

	play():void
	{
		(<MovieClip>this.adaptee).play();
	}

	stop():void
	{
		(<MovieClip>this.adaptee).stop();
	}

	hitTest(x: number, y: number, shapeFlag: boolean = false):boolean
	{
		return this.adaptee.hitTestPoint(x, y, shapeFlag);
	}

	//lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number):void {}

	//lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number):void {}

	//lineTo(x: number, y: number):void {}

	//loadMovie(url: string, method: string = null):void {}

	//loadVariables(url: string, method: string = null):void {}

	localToGlobal(pt: any):void
	{
		var newPoint = this.adaptee.localToGlobal(new Point(pt.x, pt.y));
		pt.x = newPoint.x;
		pt.y = newPoint.y;
	}

	//moveTo(x: number, y: number):void {}

	nextFrame():void
	{
		++(<MovieClip>this.adaptee).currentFrameIndex;
	}

	prevFrame():void
	{
		--(<MovieClip>this.adaptee).currentFrameIndex;
	}

	removeMovieClip():void {
		if(this.adaptee.parent){
			this.adaptee.parent.removeChild(this.adaptee);
		}
	}

	setMask(mc: DisplayObject):void
	{
		(<MovieClip>this.adaptee).masks = [mc];
	}

	//startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0):void {}

	//stopDrag():void {}

	swapDepths(target: DisplayObject):void
	{
		var parent:DisplayObjectContainer = this.adaptee.parent;

		if (parent != null && target.parent == parent)
			parent.swapChildren(this.adaptee, target)

	}

	//unloadMovie():void {}

	clone(newAdaptee:MovieClip):AS2MovieClipAdapter
	{
		return new AS2MovieClipAdapter(newAdaptee, this._view);
	}

	/**
	 *
	 */
	public get onEnterFrame():(event:AssetEvent) => void
	{
		return this._onEnterFrame;
	}

	public set onEnterFrame(value:(event:AssetEvent) => void)
	{
		this._onEnterFrame = this._replaceEventListener(AssetEvent.ENTER_FRAME, this._onEnterFrame, value);
	}

	/**
	 *
	 */
	public get onRollOut():(event:MouseEvent) => void
	{
		return this._onRollOut;
	}

	public set onRollOut(value:(event:MouseEvent) => void)
	{
		this._onRollOut = this._replaceEventListener(MouseEvent.MOUSE_OUT, this._onRollOut, value);
	}

	/**
	 *
	 */
	public get onRollOver():(event:MouseEvent) => void
	{
		return this._onRollOver;
	}

	public set onRollOver(value:(event:MouseEvent) => void)
	{
		this._onRollOver = this._replaceEventListener(MouseEvent.MOUSE_OVER, this._onRollOver, value);
	}

	/**
	 *
	 */
	public get onRelease():(event:MouseEvent) => void
	{
		return this._onRelease;
	}

	public set onRelease(value:(event:MouseEvent) => void)
	{
		this._onRelease = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onRelease, value);
	}

	/**
	 *
	 */
	public get onPress():(event:MouseEvent) => void
	{
		return this._onPress;
	}

	public set onPress(value:(event:MouseEvent) => void)
	{
		this._onPress = this._replaceEventListener(MouseEvent.MOUSE_DOWN, this._onPress, value);
	}

	/**
	 *
	 */
	public get onMouseDown():(event:MouseEvent) => void
	{
		return this._onMouseDown;
	}

	public set onMouseDown(value:(event:MouseEvent) => void)
	{
		this._onMouseDown = this._replaceEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown, value);
	}

	/**
	 *
	 */
	public get onMouseUp():(event:MouseEvent) => void
	{
		return this._onMouseUp;
	}

	public set onMouseUp(value:(event:MouseEvent) => void)
	{
		this._onMouseUp = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onMouseUp, value);
	}

	public get onMouseWheel():(event:MouseEvent) => void
	{
		return this._onMouseWheel;
	}

	public set onMouseWheel(value:(event:MouseEvent) => void)
	{

		var mc = this.adaptee;

		if (this._onMouseWheel)
			mc.removeEventListener(MouseEvent.MOUSE_WHEEL, this._onMouseWheel);
		if (value) {
			var self = this;
			var delegate = (event) => value.call(self, event);
			mc.addEventListener(MouseEvent.MOUSE_WHEEL, delegate);
			this._onMouseWheel = delegate;
		}

	}
	public registerScriptObject(child:DisplayObject):void
	{
		if (child.name)
			this[child.name] = child.adapter ? child.adapter:child;
	}

	public unregisterScriptObject(child:DisplayObject):void
	{
		delete this[child.name];

		if(child.isAsset(MovieClip))
			(<MovieClip>child).removeButtonListeners();
	}

	private _gotoFrame(frame:any):void
	{
		var mc = <MovieClip>this.adaptee;
		if (typeof frame === "string")
			mc.jumpToLabel(<string>frame);
		else
			mc.currentFrameIndex = (<number>frame) - 1;
	}

	private _replaceEventListener(eventType:string, currentListener:(event:EventBase) => void, newListener:(event:EventBase) => void):() => void
	{
		var mc = this.adaptee;

		if (currentListener)
			mc.removeEventListener(eventType, currentListener);

		if (newListener) {
			var self = this;
			var delegate = () => newListener.call(self);
			mc.addEventListener(eventType, delegate);
		}

		return delegate;
	}
}