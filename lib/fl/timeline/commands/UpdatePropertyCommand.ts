import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

class UpdatePropertyCommand extends FrameCommand
{
    private _target:DisplayObject;
    private _propertyName:string;
    private _value:any; // had hoped to use generics, but that results in parser headaches

    constructor(target: DisplayObject, propertyName:string, value:any)
    {
        super();
        this._target = target;
        this._propertyName = propertyName;
        this._value = value;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        this._target[this._propertyName] = this._value;
    }
}
export = UpdatePropertyCommand;