import BitmapData = require("awayjs-core/lib/base/BitmapData");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import AS2SymbolAdapter = require("awayjs-player/lib/fl/adapters/AS2SymbolAdapter");
import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

class AS2MovieClipAdapter extends AS2SymbolAdapter implements MovieClipAdapter
{
	// _currentframe [read-only]
	// _droptarget [read-only]
	// enabled: Boolean
	// focusEnabled: Boolean
	// forceSmoothing: Boolean
	// _framesloaded: Number [read-only]
	// hitArea: Object
	// _lockroot: Boolean
	// _name: String
	// opaqueBackground: Number
	// scrollRect: Object
	// tabChildren: Boolean
	// _totalframes: Number [read-only]
	// transform: Transform		// contains matrix + color matrix
	// globalToLocal(obj)
	// localToGlobal(obj)
	// moveTo
	// getBounds
	// getRect

	private currentFrameIndex: number;

	// translate to scripts:
	/*public onData: Function;
	public onEnterFrame: Function;
	public onLoad: Function;
	public onMouseDown: Function;
	public onMouseMove: Function;
	public onMouseUp: Function;
	public onUnload: Function;*/

	constructor(adaptee : DisplayObjectContainer)
	{
		super(adaptee);
		this.currentFrameIndex = -1;
	}

	//get _totalFrames() : number
	//{
	//}

	//attachAudio(id: Object) : void {	}

	//attachBitmap(bmp: BitmapData, depth: Number, pixelSnapping: String = null, smoothing: boolean = false) : void { }

	//attachMovie(id: string, name: string, depth: number, initObject: Object = null) : MovieClip { return null; }

	//beginBitmapFill(bmp: BitmapData, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false) : void {}

	//beginFill(rgb: Number, alpha: number = 1.0) : void {}

	//beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null) : void {}

	//clear() : void {}

	//createEmptyMovieClip(name: string, depth: number) : MovieClip { return null; }

	//createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}

	//curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}

	//duplicateMovieClip(name: string, depth: number, initObject: Object) : MovieClip { return null; }

	//endFill() : void {}

	//getBounds(bounds: Object) : Object { return null; }

	//getBytesLoaded() : number { return 0; }

	//getBytesTotal() : number { return 0; }

	//getInstanceAtDepth(depth: Number) : MovieClip { return null; }

	//getNextHighestDepth() : number { return 0; }

	//getRect(bounds: Object) : Object { return null; }

	//getSWFVersion() : number { return 0; }

	//getTextSnapshot() : TextSnapshot {}

	//getURL(url: string, window: string, method: string) : void {}

	//globalToLocal(pt: Object) : void {}

	//gotoAndPlay(frame: Object) : void {}

	//gotoAndStop(frame: Object) : void {}

	//hitTest() : boolean { return false; }

	//lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number) : void {}

	//lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number) : void {}

	//lineTo(x: number, y: number) : void {}

	//loadMovie(url: string, method: string = null) : void {}

	//loadVariables(url: string, method: string = null) : void {}

	//localToGlobal(pt: Object) : void {}

	//moveTo(x: number, y: number) : void {}

	//nextFrame() : void {}

	//play() : void {}

	//prevFrame() : void {}

	//removeMovieClip() : void {}

	//setMask(mc: Object) : void {}

	//startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) : void {}

	//stop() : void {}

	//stopDrag() : void {}

	//swapDepths(target: Object) : void {}

	//unloadMovie() : void {}
}
export = AS2MovieClipAdapter;