import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");

interface TimelineSceneGraphFactory
{
    createMovieClip(): MovieClip;
}
export = TimelineSceneGraphFactory;