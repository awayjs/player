import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

// can't use SetPropertyCommand since we NEED the setter to be called properly
class SetInstanceNameCommand implements FrameCommand
{
    private _targetID:number;
    private _name:string;

    // target can be MovieClip, its ColorTransform, and so on
    constructor(targetID : number, name:string)
    {
        this._targetID = targetID;
        this._name = name;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        var target = sourceMovieClip.getPotentialChildInstance(this._targetID);
        sourceMovieClip[this._name] = target;
        target.name = this._name;
    }
}
export = SetInstanceNameCommand;