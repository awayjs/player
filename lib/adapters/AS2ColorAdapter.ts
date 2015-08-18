import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
import Matrix = require("awayjs-core/lib/geom/Matrix");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");

// also contains global AS2 functions
class AS2ColorAdapter
{
    private _target : ColorTransform;
    private _rgb : number = 0xffffff;
    private _transform : any;

    constructor(target:AS2SymbolAdapter)
    {
        target._blockedByScript = true;

        this._target = target.adaptee._iColorTransform || (target.adaptee._iColorTransform = new ColorTransform());
        this._transform = { ra: 100, rb: 0, ga: 100, gb: 0, ba: 100, bb: 0, aa: 100, ab: 0 };
    }

    public getRGB() : number
    {
        return this._rgb;
    }

    public setRGB(value : number)
    {
        this._rgb = value;
        var r = (value >> 16) & 0xff;
        var g = (value >> 8) & 0xff;
        var b = value & 0xff;

        this.setTransform({ra: r / 0xff * 100, ga: g / 0xff * 100, ba: b / 0xff * 100, aa: 100, rb: 0, gb: 0, bb: 0, ab: 0  });
    }

    public getTransform():any
    {
        return this._transform;
    }

    public setTransform(value:any):void
    {
        this._transform = value;
        var ct = this._target;

        ct.redMultiplier = value.ra === undefined? 1 : value.ra / 100;
        ct.greenMultiplier = value.ga === undefined? 1 : value.ga / 100;
        ct.blueMultiplier = value.ba === undefined? 1 : value.ba / 100;
        ct.alphaMultiplier = value.aa === undefined? 1 : value.aa / 100;
        ct.redOffset = value.rb || 0;
        ct.greenOffset = value.gb || 0;
        ct.blueOffset = value.bb || 0;
        ct.alphaOffset = value.ab || 0;
    }
}

export = AS2ColorAdapter;