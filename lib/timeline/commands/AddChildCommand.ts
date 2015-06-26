import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class AddChildCommand implements FrameCommand
{
    private _childID:number;

    constructor(childID:number)
    {
        this._childID = childID;
    }

    public execute(sourceMovieClip : MovieClip):void
    {
        sourceMovieClip.activateChild(this._childID);
    }
}
export = AddChildCommand;