import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");

class SymbolAdapter
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

    private adaptee : DisplayObjectContainer;

    constructor(adaptee : DisplayObjectContainer)
    {
        this.adaptee = adaptee;
    }

    get _rotation() : number
    {
        return this.adaptee.rotationZ;
    }

    set _rotation(value : number)
    {
        this.adaptee.rotationZ = value;
    }

    get _x() : number
    {
        return this.adaptee.x;
    }

    set _x(value : number)
    {
        this.adaptee.x = value;
    }

    get _y() : number
    {
        return this.adaptee.y;
    }

    set _y(value : number)
    {
        this.adaptee.y = value;
    }

    get _xscale() : number
    {
        return this.adaptee.scaleX;
    }

    set _xscale(value : number)
    {
        this.adaptee.scaleX = value;
    }

    set _yscale(value : number)
    {
        this.adaptee.scaleY = value;
    }

    get _yscale() : number
    {
        return this.adaptee.scaleY;
    }

    get _parent() : MovieClipAdapter
    {
        var parentMC = <MovieClip>this.adaptee.parent;
        return <MovieClipAdapter>parentMC.adapter;
    }

    getDepth() : number
    {
        return this.adaptee.z;
    }
}

export = SymbolAdapter;