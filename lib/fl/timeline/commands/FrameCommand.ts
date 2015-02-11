import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

/**
 * FrameCommand associates a TimeLineobject with CommandProps.
 * CommandProps can be of different class, depending on the type of Asset that the TimeLineObject references to.
 */
class FrameCommand
{
    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        throw new AbstractMethodError();
    }
}

export = FrameCommand;
