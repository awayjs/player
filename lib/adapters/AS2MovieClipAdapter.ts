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
import AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
import View			= require("awayjs-display/lib/containers/View");

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
  private _onMouseDown: Function;
  private _onMouseUp: Function;

  constructor(adaptee : DisplayObjectContainer, view:View)
  {
    adaptee = adaptee || new MovieClip();
    // create an empty MovieClip if none is passed
    super(adaptee, view);

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

  attachMovie(id: string, name: string, depth: number, initObject: Object = null) : MovieClip {
    var attached_mc:MovieClip = <MovieClip> AssetLibrary.getAsset(id);
    var cloned_mc:MovieClip = <MovieClip> attached_mc.clone();
    var adapter = new AS2MovieClipAdapter(cloned_mc, this._view);
    adapter.adaptee.name = name;
    this.adaptee.addChildAtDepth(adapter.adaptee, depth);
    this.registerScriptObject(adapter.adaptee);
    return attached_mc;
    // todo: apply object from initObject to attached_mc

  }

  //beginBitmapFill(bmp: BitmapImage2D, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false) : void {}

  //beginFill(rgb: Number, alpha: number = 1.0) : void {}

  //beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null) : void {}

  //clear() : void {}

  createEmptyMovieClip(name: string, depth: number) : AS2MovieClipAdapter
  {
    var adapter = new AS2MovieClipAdapter(null, this._view);
    adapter.adaptee.name = name;
    this.adaptee.addChildAtDepth(adapter.adaptee, depth);
    this.registerScriptObject(adapter.adaptee);
    return adapter;
  }

  //createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}

  //curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}

  duplicateMovieClip(name: string, depth: number, initObject: Object) : MovieClip
  {
    var duplicate = <MovieClip>(this.adaptee.clone());
    duplicate.name = name;

    if (initObject) {
      for (var key in initObject) {
        if (duplicate.adapter.hasOwnProperty(key))
          duplicate.adapter[key] = initObject[key];
      }
    }

    this.adaptee.parent.addChildAtDepth(duplicate, depth);
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
    return <MovieClip> this.adaptee.getChildAtDepth(depth);
  }

  getNextHighestDepth() : number
  {
    return this.adaptee.getNextHighestDepth();
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
      return;

    this.play();
    this._gotoFrame(frame);
  }

  gotoAndStop(frame: any) : void
  {
    if (frame == null)
      return;

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

  hitTest(x: number, y: number, shapeFlag: boolean = false) : boolean
  {
    return this.adaptee.hitTestPoint(x, y, shapeFlag);
  }

  //lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number) : void {}

  //lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number) : void {}

  //lineTo(x: number, y: number) : void {}

  //loadMovie(url: string, method: string = null) : void {}

  //loadVariables(url: string, method: string = null) : void {}

  localToGlobal(pt: any) : void
  {
    var newPoint = this.adaptee.localToGlobal(new Point(pt.x, pt.y));
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
    var parent:DisplayObjectContainer = this.adaptee.parent;

    if (parent != null && target.parent == parent)
      parent.swapChildren(this.adaptee, target)

  }

  //unloadMovie() : void {}

  clone(newAdaptee:DisplayObjectContainer):MovieClipAdapter
  {
    return new AS2MovieClipAdapter(newAdaptee, this._view);
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

  public get onMouseDown(): Function
  {
    return this._onMouseDown;
  }

  public set onMouseDown(value : Function)
  {
    this._onMouseDown = this._replaceEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown, value);
  }

  public get onMouseUp(): Function
  {
    return this._onMouseUp;
  }

  public set onMouseUp(value : Function)
  {
    this._onMouseUp = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onMouseUp, value);
  }

  public registerScriptObject(child : DisplayObject)
  {
    if (child.name)
      this[child.name] = child["adapter"] ? child["adapter"] : child;
  }

  public unregisterScriptObject(child : DisplayObject)
  {
    delete this[child.name];
    if(child.isAsset(MovieClip)){
      (<MovieClip>child).removeButtonListener();
    }
  }

  public _pOnChildAdded(event:MovieClipEvent)
  {
    //var child = event.displayObject;
    //var self = this;

    // scope is broken, so fix it
    //this._nameChangeCallback = function(event:MovieClipEvent) { self._pOnChildNameChanged.call(self, event); }
    //child.addEventListener(MovieClipEvent.NAME_CHANGED, this._nameChangeCallback );
  }

  private _pOnChildRemoved(event:MovieClipEvent)
  {
    //var child = event.displayObject;
    //child.removeEventListener(MovieClipEvent.NAME_CHANGED, this._nameChangeCallback);
    //if (child.name) this._pUnregisterChild(child);
  }

  private _pOnChildNameChanged(event:MovieClipEvent)
  {
    var child = event.displayObject;
    this.registerScriptObject(child);
  }

  private _gotoFrame(frame:any)
  {
    var mc = <MovieClip>this.adaptee;
    if (typeof frame === "string")
      mc.jumpToLabel(<string>frame);
    else
      mc.currentFrameIndex = (<number>frame) - 1;
  }

  private _replaceEventListener(eventType:string, currentListener:Function, newListener:Function)
  {
    var mc = this.adaptee;

    if (currentListener)
      mc.removeEventListener(eventType, currentListener);

    if (newListener) {
      var self = this;
      var delegate = function() { newListener.call(self); };
      mc.addEventListener(eventType, delegate);
    }

    return delegate;
  }
}
export = AS2MovieClipAdapter;