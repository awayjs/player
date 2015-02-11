import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

class RemoveChildCommand extends FrameCommand
{
    private _id : number;
    private _child:DisplayObjectContainer;

    constructor(child:DisplayObjectContainer, id:number)
    {
        super();
        this._child = child;
        this._id = id;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        sourceMovieClip.removeChild(this._child);
    }
}
export = RemoveChildCommand;