import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class UpdatePropertyCommand implements FrameCommand
{
    private _targetID:number;
    private _propertyName:string;
    private _value:any; // had hoped to use generics, but that results in parser headaches

    // target can be MovieClip, its ColorTransform, and so on
    constructor(targetID : number, propertyName:string, value:any)
    {
        this._targetID = targetID;
        this._propertyName = propertyName;
        this._value = value;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        var target = sourceMovieClip.getPotentialChild(this._targetID);
        target[this._propertyName] = this._value;
    }
}
export = UpdatePropertyCommand;