import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

class AddChildCommand implements FrameCommand
{
    private _childID:number;

    constructor(childID:number)
    {
        this._childID = childID;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        sourceMovieClip.activateChild(this._childID);
    }
}
export = AddChildCommand;