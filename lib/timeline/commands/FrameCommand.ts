import MovieClip = require("awayjs-player/lib/display/MovieClip");

/**
 * IMPORTANT: FrameCommands are NOT allowed to store references to actual objects, only childIDs. This prevents complex
 * cross-command object reference management when instancing. It also allows commands and frames instances to be shared
 * across MovieClip instances.
 */
interface FrameCommand
{
    execute(sourceMovieClip : MovieClip, frame:number):void;
}
export = FrameCommand;
