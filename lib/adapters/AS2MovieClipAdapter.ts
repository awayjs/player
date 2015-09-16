import BitmapImage2D = require("awayjs-core/lib/data/BitmapImage2D");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
import AS2SoundAdapter = require("awayjs-player/lib/adapters/AS2SoundAdapter");
import AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
import IMovieClipAdapter		= require("awayjs-display/lib/adapters/IMovieClipAdapter");
import MovieClip = require("awayjs-display/lib/entities/MovieClip");
import MouseEvent = require("awayjs-display/lib/events/MouseEvent");
import Event = require("awayjs-core/lib/events/Event");
import Point = require("awayjs-core/lib/geom/Point");
import AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
import View			= require("awayjs-display/lib/containers/View");

var includeString:string = 'var Color			= require("awayjs-player/lib/adapters/AS2ColorAdapter");\n' +
    'var System			= require("awayjs-player/lib/adapters/AS2SystemAdapter");\n' +
    'var Sound			= require("awayjs-player/lib/adapters/AS2SoundAdapter");\n' +
    'var Key				= require("awayjs-player/lib/adapters/AS2KeyAdapter");\n' +
    'var Mouse			= require("awayjs-player/lib/adapters/AS2MouseAdapter");\n' +
    'var Stage			= require("awayjs-player/lib/adapters/AS2StageAdapter");\n' +
    'var SharedObject		= require("awayjs-player/lib/adapters/AS2SharedObjectAdapter");\n' +
    'var int = (value) => Math.floor(value) | 0;\n' +
    'var String = (value) => value.toString();\n' +
    'var string = (value) => value.toString();\n' +
    'var getURL = (value) => value;\n';

declare var __framescript__;

class AS2MovieClipAdapter extends AS2SymbolAdapter implements IMovieClipAdapter
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

  // translate to scripts:
  private _onEnterFrame: Function;
  private _onRelease: Function;
  private _onRollOver:Function;
  private _onRollOut:Function;
  private _onPress: Function;
  private _onMouseDown: Function;
  private _onMouseUp: Function;

  constructor(adaptee : MovieClip, view:View)
  {
    // create an empty MovieClip if none is passed
    super(adaptee || new MovieClip(), view);
    this.__pSoundProps = new AS2MCSoundProps();

  }

  public dispose()
  {
    super.dispose();

    this.__pSoundProps.dispose();
    this.__pSoundProps = null;
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

  evalScript(str:string):Function
  {
    try {
      var tag:HTMLScriptElement = document.createElement('script');
      tag.text = includeString + 'var __framescript__ = function() {\n' + str + '\n}';

      //add and remove script tag to dom to trigger compilation
      var sibling = document.scripts[0];
      sibling.parentNode.insertBefore(tag, sibling).parentNode.removeChild(tag);

      var script =  __framescript__;
      delete window['__framescript__'];
    }
    catch(err)
    {
      console.log("Syntax error in script:\n", str);
      console.log(err.message);
      throw err;
    }
    return script;
  }

  //attachAudio(id: AS2SoundAdapter) : void {	}

  //attachBitmap(bmp: BitmapImage2D, depth: Number, pixelSnapping: String = null, smoothing: boolean = false) : void { }

  attachMovie(id: string, name: string, depth: number, initObject: Object = null) : MovieClip {
    var attached_mc:MovieClip = <MovieClip> AssetLibrary.getAsset(id);
    var cloned_mc:MovieClip = <MovieClip> attached_mc.clone();
    var adapter = new AS2MovieClipAdapter(cloned_mc, this._view);
    this.adaptee.addChildAtDepth(adapter.adaptee, depth);
    adapter.adaptee.name = name;
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
    var mc:MovieClip = new MovieClip();
    mc.adapter = new AS2MovieClipAdapter(mc, this._view);
    mc.name = name;
    this.adaptee.addChildAtDepth(mc, depth);
    this.registerScriptObject(mc);
    return <AS2MovieClipAdapter> mc.adapter;
  }

  //createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}

  //curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}

  duplicateMovieClip(name: string, depth: number, initObject: Object) : AS2MovieClipAdapter
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
    (<MovieClip>this.adaptee).masks = [mc];
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

  clone(newAdaptee:MovieClip):AS2MovieClipAdapter
  {
    return new AS2MovieClipAdapter(newAdaptee, this._view);
  }

  public get onEnterFrame(): Function
  {
    return this._onEnterFrame;
  }

  public set onEnterFrame(value : Function)
  {
    this._onEnterFrame = this._replaceEventListener(Event.ENTER_FRAME, this._onEnterFrame, value);
  }

  public get onRollOut(): Function
  {
    return this._onRollOut;
  }
  public set onRollOut(value : Function)
  {
    this._onRollOut = this._replaceEventListener(MouseEvent.MOUSE_OUT, this._onRollOut, value);
  }
  public get onRollOver(): Function
  {
    return this._onRollOver;
  }
  public set onRollOver(value : Function)
  {
    this._onRollOver = this._replaceEventListener(MouseEvent.MOUSE_OVER, this._onRollOver, value);
  }
  public get onRelease(): Function
  {
    return this._onRelease;
  }
  public set onRelease(value : Function)
  {
    this._onRelease = this._replaceEventListener(MouseEvent.MOUSE_UP, this._onRelease, value);
  }

  public get onPress(): Function
  {
    return this._onPress;
  }

  public set onPress(value : Function)
  {
    this._onPress = this._replaceEventListener(MouseEvent.MOUSE_DOWN, this._onPress, value);
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
      this[child.name] = child.adapter ? child.adapter : child;
  }

  public unregisterScriptObject(child : DisplayObject)
  {
    delete this[child.name];
    if(child.isAsset(MovieClip)){
      (<MovieClip>child).removeButtonListeners();
    }
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