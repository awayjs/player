import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
import AS2SoundAdapter = require("awayjs-player/lib/adapters/AS2SoundAdapter");
import AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
import MovieClip = require("awayjs-player/lib/display/MovieClip");
import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
import MouseEvent = require("awayjs-display/lib/events/MouseEvent");
import MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
import Point = require("awayjs-core/lib/geom/Point");

class AS2MovieClipAdapter extends AS2SymbolAdapter implements MovieClipAdapter
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

    public __pSoundProps : AS2MCSoundProps;

    private _nameChangeCallback : Function;

	// translate to scripts:
    private _onEnterFrame: Function;
    private _onRelease: Function;

	constructor(adaptee : DisplayObjectContainer)
	{
        adaptee = adaptee || new MovieClip();
        // create an empty MovieClip if none is passed
        super(adaptee);

        this.__pSoundProps = new AS2MCSoundProps();

        var self = this;
        adaptee.addEventListener(MovieClipEvent.CHILD_ADDED,
            function(event:MovieClipEvent) { self._pOnChildAdded.call(self, event); }
        );
        adaptee.addEventListener(MovieClipEvent.CHILD_REMOVED,
            function(event:MovieClipEvent) { self._pOnChildRemoved.call(self, event); }
        );
	}

    get _framesloaded() : number
    {
        // not loading frame by frame?
        return (<MovieClip>this.adaptee).numFrames;
    }

    get _currentframe() : number
    {
        return (<MovieClip>this.adaptee).currentFrameIndex + 1;
    }

	get _totalframes() : number
	{
        return (<MovieClip>this.adaptee).numFrames;
	}

    get enabled() : boolean
    {
        return (<MovieClip>this.adaptee).mouseEnabled;
    }

	//attachAudio(id: AS2SoundAdapter) : void {	}

	//attachBitmap(bmp: BitmapImage2D, depth: Number, pixelSnapping: String = null, smoothing: boolean = false) : void { }

	//attachMovie(id: string, name: string, depth: number, initObject: Object = null) : MovieClip { return null; }

	//beginBitmapFill(bmp: BitmapImage2D, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false) : void {}

	//beginFill(rgb: Number, alpha: number = 1.0) : void {}

	//beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null) : void {}

	//clear() : void {}

	createEmptyMovieClip(name: string, depth: number) : AS2MovieClipAdapter
    {
        var adapter = new AS2MovieClipAdapter(null);
        adapter.adaptee.name = name;
        adapter.adaptee["__AS2Depth"] = depth;
        this.adaptee.addChild(adapter.adaptee);
        this._updateDepths(<MovieClip>this.adaptee);
        return adapter;
    }

	//createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}

	//curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}

	duplicateMovieClip(name: string, depth: number, initObject: Object) : MovieClip
    {
        var duplicate = <MovieClip>(this.adaptee.clone());
        duplicate.name = name;
        duplicate["__AS2Depth"] = depth;

        if (initObject) {
            for (var key in initObject) {
                if (initObject.hasOwnProperty(key))
                    duplicate.adapter[key] = initObject;
            }
        }

        this._updateDepths(<MovieClip>this.adaptee.parent);
        return duplicate;
    }

	//endFill() : void {}

	//getBounds(bounds: Object) : Object { return null; }

    // not applicable?
	getBytesLoaded() : number { return 1; }

    // not applicable?
	getBytesTotal() : number { return 1; }

	getInstanceAtDepth(depth: number) : MovieClip
    {
        var adaptee = this.adaptee;
        var len = adaptee.numChildren;
        for (var i = 0; i < len; ++i) {
            var child = adaptee.getChildAt(i);
            if (child["__AS2Depth"] === depth)
                return <MovieClip>child;
        }
        return null;
    }

	getNextHighestDepth() : number
    {
        var maxDepth = 0;
        var adaptee = this.adaptee;
        var len = adaptee.numChildren;
        for (var i = 0; i < len; ++i) {
            var child = adaptee.getChildAt(i);
            var depth = child["__AS2Depth"];
            if (depth > maxDepth)
                maxDepth = depth;
        }

        return maxDepth + 1;
    }

	//getRect(bounds: Object) : Object { return null; }

	//getSWFVersion() : number { return 0; }

	//getTextSnapshot() : TextSnapshot {}

	//getURL(url: string, window: string, method: string) : void {}

	globalToLocal(pt: any) : void
    {
        var newPoint = this.adaptee.globalToLocal(new Point(pt.x, pt.y));
        pt.x = newPoint.x;
        pt.y = newPoint.y;
    }

	gotoAndPlay(frame: any) : void
    {
        if (frame == null)
            throw new Error();

        this.play();
        this._gotoFrame(frame);
    }

	gotoAndStop(frame: any) : void
    {
        if (frame == null)
            throw new Error();

        this.stop();
        this._gotoFrame(frame);
    }

    play() : void
    {
        (<MovieClip>this.adaptee).play();
    }

    stop() : void
    {
        (<MovieClip>this.adaptee).stop();
    }

	//hitTest() : boolean { return false; }

	//lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number) : void {}

	//lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number) : void {}

	//lineTo(x: number, y: number) : void {}

	//loadMovie(url: string, method: string = null) : void {}

	//loadVariables(url: string, method: string = null) : void {}

	localToGlobal(pt: any) : void
    {
        var newPoint = this.adaptee.globalToLocal(new Point(pt.x, pt.y));
        pt.x = newPoint.x;
        pt.y = newPoint.y;
    }

	//moveTo(x: number, y: number) : void {}

	nextFrame() : void
    {
        ++(<MovieClip>this.adaptee).currentFrameIndex;
    }

	prevFrame() : void
    {
        --(<MovieClip>this.adaptee).currentFrameIndex;
    }

	//removeMovieClip() : void {}

	setMask(mc: DisplayObject) : void
    {
        (<MovieClip>this.adaptee)._iMasks = [ mc ];
    }

	//startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) : void {}

	//stopDrag() : void {}

	swapDepths(target: DisplayObject) : void
    {
        var adaptee = this.adaptee;
        var tmp = adaptee["__AS2Depth"];
        this["__AS2Depth"] = target["__AS2Depth"];
        adaptee["__AS2Depth"] = tmp;
        this._updateDepths(<MovieClip>this.adaptee.parent);
    }

	//unloadMovie() : void {}

    clone(newAdaptee:DisplayObjectContainer):MovieClipAdapter
    {
        return new AS2MovieClipAdapter(newAdaptee);
    }

    public get onEnterFrame(): Function
    {
        return this._onEnterFrame;
    }

    public set onEnterFrame(value : Function)
    {
        this._onEnterFrame = this._replaceEventListener(MovieClipEvent.ENTER_FRAME, this._onEnterFrame, value);
    }

    public get onRelease(): Function
    {
        return this._onRelease;
    }

    public set onRelease(value : Function)
    {
        this._onRelease = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onRelease, value);
    }

    public _pRegisterChild(child : DisplayObject)
    {
        if (child.name)
            this[child.name] = child["adapter"] ? child["adapter"] : child;
    }

    public _pUnregisterChild(child : DisplayObject)
    {
        for (var key in this) {
            if (this.hasOwnProperty(key) && this[key] === child) {
                delete this[key];
                return;
            }
        }
    }

    public _pOnChildAdded(event:MovieClipEvent)
    {
        var child = event.displayObject;
        var self = this;

        // scope is broken, so fix it
        this._nameChangeCallback = function(event:MovieClipEvent) { self._pOnChildNameChanged.call(self, event); }
        child.addEventListener(MovieClipEvent.NAME_CHANGED, this._nameChangeCallback );
        this._pRegisterChild(child);
    }

    private _pOnChildRemoved(event:MovieClipEvent)
    {
        var child = event.displayObject;
        child.removeEventListener(MovieClipEvent.NAME_CHANGED, this._nameChangeCallback);
        if (child.name) this._pUnregisterChild(child);
    }

    private _pOnChildNameChanged(event:MovieClipEvent)
    {
        var child = event.displayObject;
        this._pUnregisterChild(child);
        this._pRegisterChild(child);
    }

    private _gotoFrame(frame:any)
    {
        var mc = <MovieClip>this.adaptee;
        if (typeof frame === "string")
            mc.jumpToLabel(<string>frame);
        else
            mc.currentFrameIndex = (<number>frame) - 1;
    }

    private _updateDepths(target:MovieClip)
    {
        var childrenArray = target["_children"];
        childrenArray.sort(this.sortChildrenByDepth);
    }

    private sortChildrenByDepth(a:DisplayObject, b:DisplayObject) : number
    {
        var da = <number>(a["__AS2Depth"]);
        var db = <number>(b["__AS2Depth"]);
        if (da === undefined) da = 0;
        if (db === undefined) db = 0;
        return da - db;
    }

    private _replaceEventListener(eventType:string, currentListener:Function, newListener:Function)
    {
        var mc = this.adaptee;
        if (currentListener) mc.removeEventListener(eventType, currentListener);

        if (newListener) {
            var self = this;
            var delegate = function() { newListener.call(self); };
            mc.addEventListener(MovieClipEvent.ENTER_FRAME, delegate);
        }

        return delegate;
    }
}
export = AS2MovieClipAdapter;