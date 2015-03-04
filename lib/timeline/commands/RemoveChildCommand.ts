import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class RemoveChildCommand implements FrameCommand
{
    private _childID:number;

    constructor(childID:number)
    {
        this._childID = childID;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        sourceMovieClip.deactivateChild(this._childID);
    }
}
export = RemoveChildCommand;