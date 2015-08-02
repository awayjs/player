import ColorTransform			= require("awayjs-core/lib/geom/ColorTransform");
import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

import AS2SharedObjectAdapter = require("awayjs-player/lib/adapters/AS2SharedObjectAdapter");
import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import AS2KeyAdapter = require("awayjs-player/lib/adapters/AS2KeyAdapter");
import AS2MouseAdapter = require("awayjs-player/lib/adapters/AS2MouseAdapter");
import AS2StageAdapter = require("awayjs-player/lib/adapters/AS2StageAdapter");

import View			= require("awayjs-display/lib/containers/View");


// also contains global AS2 gunctions
class AS2SymbolAdapter
{
    public _view:View;

    // TODO: REMOVE AND PROVIDE AS CLASS (See System) ONCE TRANSLATOR IS FIXED
    // And then change properties to statics
    public get Key() { return AS2KeyAdapter; }
    public get Mouse() { return AS2MouseAdapter; }
    public get Stage() { return AS2StageAdapter; }
    public get SharedObject() { return AS2SharedObjectAdapter; }
    public String(value:any) { return value.toString(); }
    public string(value:any) { return value.toString(); }
    public getURL(value:string) { return value; }

    public isBlockedByScript():boolean { return this._blockedByScript;}
    public isVisibilityByScript():boolean { return this._blockedByScript;}
    public freeFromScript():void { this._blockedByScript=false; this._visibilityByScript=false;}

    // blendMode
    // cacheAsBitmap
    // filters
    // _focusrect: Boolean
    // _highquality: Number // DEPRECATED ANYWAY
    // menu: ContextMenu
    // scale9Grid: Rectangle
    // _soundbuftime: Number
    // tabEnabled: Boolean
    // tabIndex: Number
    // _target: String  [read-only]
    // trackAsMenu: Boolean
    // _url: String [read-only]
    // useHandCursor: Boolean

    // id (renamed to instanceID)

    /*public onDragOut : Function;
    public onDragOver : Function;
    public onKeyDown : Function;
    public onKeyUp : Function;
    public onKillFocus : Function;
    public onPress : Function;
    public onRelease : Function;
    public onReleaseOutside : Function;
    public onRollOut : Function;
    public onRollOver : Function;
    public onSetFocus : Function;*/

    private __root : AS2SymbolAdapter;

    private _adaptee : DisplayObjectContainer;

    private __quality : string = "high";

    public _blockedByScript:boolean;
    public _visibilityByScript:boolean;

    private static REFERENCE_TIME : number = -1;

    constructor(adaptee : DisplayObjectContainer, view:View)
    {
        this._adaptee = adaptee;
        this._view = view;

        this._blockedByScript=false;
        if (AS2SymbolAdapter.REFERENCE_TIME === -1)
            AS2SymbolAdapter.REFERENCE_TIME = new Date().getTime();
    }


    getVersion() : number
    {
        return 0;
    }

    get adaptee() : DisplayObjectContainer
    {
        return this._adaptee;
    }

    get _height():number
    {
        return this._adaptee.height;
    }

    set _height(value:number)
    {
        this._adaptee.height = value;
        this._blockedByScript=true;
    }

    get _name() : string
    {
        return this._adaptee.name;
    }

    get _rotation() : number
    {
        return this._adaptee.rotationZ;
    }

    set _rotation(value : number)
    {
        this._adaptee.rotationZ = value;
        this._blockedByScript=true;
    }

    get _x() : number
    {
        return this._adaptee.x;
    }

    set _x(value : number)
    {
        this._adaptee.x = value;
        this._blockedByScript=true;
    }

    get _xmouse() : number
    {
        return this._view.getLocalMouseX(this._adaptee);
    }

    get _y() : number
    {
        return this._adaptee.y;
    }

    set _y(value : number)
    {
        this._adaptee.y = value;
        this._blockedByScript=true;
    }

    get _ymouse() : number
    {
        return this._view.getLocalMouseY(this._adaptee);
    }

    get _xscale() : number
    {
        return this._adaptee.scaleX*100;
    }

    set _xscale(value : number)
    {
        this._adaptee.scaleX = value/100;
        this._blockedByScript=true;
    }

    get _yscale() : number
    {
        return this._adaptee.scaleY*100;
    }

    set _yscale(value : number)
    {
        this._adaptee.scaleY = value/100;
        this._blockedByScript=true;
    }

    get _visible() : boolean
    {
        return this._adaptee.visible;
    }

    set _visible(value : boolean)
    {
        this._adaptee.visible = value;
        this._visibilityByScript=true;
    }

    get _width():number
    {
        return this._adaptee.width;
    }

    set _width(value:number)
    {
        this._adaptee.width = value;
        this._blockedByScript=true;
    }

    getDepth() : number
    {
        return this._adaptee.z;
    }

    // just assure consistency for scripts, doesn't actually effect rendering.
    get _quality() : string
    {
        return this.__quality;
    }

    set quality(value : string)
    {
        this.__quality = value;
       // this._blockedByScript=true;
    }

    trace(message:any) : void
    {
        console.log(message);
    }

    // may need proper high-def timer mechanism
    getTimer() : Number
    {
        return new Date().getTime() - AS2SymbolAdapter.REFERENCE_TIME;
    }

    int(value:any) : number
    {
        return value | 0;
    }

    get _alpha() : number
    {
        return this.adaptee.transform.colorTransform? this.adaptee.transform.colorTransform.alphaMultiplier : 1;
    }

    set _alpha(value: number)
    {
        this.adaptee.colorTransform.alphaMultiplier = value;
        this._blockedByScript=true;
    }

    get _url() : string
    {
        return document.URL;
    }

    get _global() : AS2MovieClipAdapter
    {
        return null;
    }

    get _level0() : AS2SymbolAdapter
    {
        return this._root;
    }

    // temporary:
    get _level10301() : AS2SymbolAdapter
    {
        return this._root;
    }

    get _root() : AS2SymbolAdapter
    {
        if (!this.__root) {
            var p = this._parent;
            // parents are always MovieClips
            this.__root = p? p._root : this;
        }

        return this.__root;
    }

    random(range:number)
    {
        return Math.random() * range;
    }

    public get _parent() : AS2MovieClipAdapter
    {
        var parent = this.adaptee.parent;

        return parent? <AS2MovieClipAdapter> parent.adapter : null;
    }
}

export = AS2SymbolAdapter;