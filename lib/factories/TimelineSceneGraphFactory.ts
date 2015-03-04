import MovieClip = require("awayjs-player/lib/display/MovieClip");

interface TimelineSceneGraphFactory
{
    createMovieClip(): MovieClip;
}
export = TimelineSceneGraphFactory;