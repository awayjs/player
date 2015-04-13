import MovieClip = require("awayjs-player/lib/display/MovieClip");
import TextField = require("awayjs-display/lib/entities/TextField");

interface TimelineSceneGraphFactory
{
    createMovieClip(): MovieClip;
    createTextField(): TextField;
}
export = TimelineSceneGraphFactory;