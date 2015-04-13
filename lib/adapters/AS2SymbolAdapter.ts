import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

// also contains global AS2 functions
class AS2SymbolAdapter
{
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

    // _height: Number
    // _width: Number

    // _xmouse: Number [read-only]
    // _ymouse: Number [read-only]

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

    private __quality : string = "high";


    // assume root never changes
    private static ROOT : AS2MovieClipAdapter;
    private static REFERENCE_TIME : number = -1;
    private static CLASS_REPLACEMENTS : Object;

    constructor(adaptee : DisplayObjectContainer)
    {
        this._adaptee = adaptee;

        if (AS2SymbolAdapter.REFERENCE_TIME === -1)
            AS2SymbolAdapter.REFERENCE_TIME = new Date().getMilliseconds();

        if (!AS2SymbolAdapter.CLASS_REPLACEMENTS) {
            AS2SymbolAdapter.CLASS_REPLACEMENTS = {};
            AS2SymbolAdapter.CLASS_REPLACEMENTS["Color"] = "AS2ColorAdapter";
        }
    }

    get adaptee() : DisplayObjectContainer
    {
        return this._adaptee;
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

    get _visible() : boolean
    {
        return this._adaptee.visible;
    }

    set _visible(value : boolean)
    {
        this._adaptee.visible = value;
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
    }

    trace() : void
    {
        //console.log.apply(window, arguments);
    }

    // may need proper high-def timer mechanism
    getTimer() : Number
    {
        return new Date().getMilliseconds() - AS2SymbolAdapter.REFERENCE_TIME;
    }

    get _alpha() : number
    {
        return this.adaptee.transform.colorTransform.alphaMultiplier;
    }

    set _alpha(value: number)
    {
        this.adaptee.transform.colorTransform.alphaMultiplier = value;
    }

    get _url() : string
    {
        return document.URL;
    }

    get _global() : AS2MovieClipAdapter
    {
        return null;
    }

    get _level0() : AS2MovieClipAdapter
    {
        return this._root;
    }

    get _root() : AS2MovieClipAdapter
    {
        if (!AS2SymbolAdapter.ROOT) {
            // parents are always MovieClips
            var clip = this.adaptee;
            while (clip.parent && (<MovieClip>clip.parent).adapter) {
                clip = clip.parent;
            }
            AS2SymbolAdapter.ROOT = <AS2MovieClipAdapter>(<MovieClip>clip).adapter;
        }

        return AS2SymbolAdapter.ROOT;
    }

    random(range:number)
    {
        return Math.random() * range;
    }

    get classReplacements():Object
    {
        return AS2SymbolAdapter.CLASS_REPLACEMENTS;
    }
}

export = AS2SymbolAdapter;