import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

class AddChildCommand extends FrameCommand
{
    private _child:DisplayObjectContainer;

    constructor(child:DisplayObjectContainer)
    {
        super();
        this._child = child;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        sourceMovieClip.addChild(this._child);
    }
}
export = AddChildCommand;