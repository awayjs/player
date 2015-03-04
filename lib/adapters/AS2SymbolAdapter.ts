import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class AS2SymbolAdapter
{
    // _alpha
    // blendMode
    // cacheAsBitmap
    // filters
    // _focusrect: Boolean
    // _highquality: Number // DEPRECATED ANYWAY
    // menu: ContextMenu
    // _quality: String
    // scale9Grid: Rectangle
    // _soundbuftime: Number
    // tabEnabled: Boolean
    // tabIndex: Number
    // _target: String  [read-only]
    // trackAsMenu: Boolean
    // _url: String [read-only]
    // useHandCursor: Boolean
    // _visible: Boolean

    // _height: Number
    // _width: Number

    // _xmouse: Number [read-only]
    // _ymouse: Number [read-only]

    // _name: String
    // _parent: MovieClip
    // _x: number
    // _y: number
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

    private _adaptee : DisplayObjectContainer;

    constructor(adaptee : DisplayObjectContainer)
    {
        this._adaptee = adaptee;
    }

    get adaptee() : DisplayObjectContainer
    {
        return this._adaptee;
    }

    get _rotation() : number
    {
        return this._adaptee.rotationZ;
    }

    set _rotation(value : number)
    {
        this._adaptee.rotationZ = value;
    }

    get _x() : number
    {
        return this._adaptee.x;
    }

    set _x(value : number)
    {
        this._adaptee.x = value;
    }

    get _y() : number
    {
        return this._adaptee.y;
    }

    set _y(value : number)
    {
        this._adaptee.y = value;
    }

    get _xscale() : number
    {
        return this._adaptee.scaleX;
    }

    set _xscale(value : number)
    {
        this._adaptee.scaleX = value;
    }

    set _yscale(value : number)
    {
        this._adaptee.scaleY = value;
    }

    get _yscale() : number
    {
        return this._adaptee.scaleY;
    }

    get _parent() : AS2MovieClipAdapter
    {
        var parentMC = <MovieClip>this._adaptee.parent;
        return <AS2MovieClipAdapter>parentMC.adapter;
    }

    getDepth() : number
    {
        return this._adaptee.z;
    }
}

export = AS2SymbolAdapter;