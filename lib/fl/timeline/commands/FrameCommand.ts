import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");

/**
 * IMPORTANT: FrameCommands are NOT allowed to store references to actual objects, only childIDs. This prevents complex
 * cross-command object reference management when instancing. It also allows commands and frames instances to be shared
 * across MovieClip instances.
 */
interface FrameCommand
{
    execute(sourceMovieClip : MovieClip, time:number):void;
}
export = FrameCommand;
