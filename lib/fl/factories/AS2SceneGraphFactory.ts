import AS2MovieClipAdapter = require("awayjs-player/lib/fl/adapters/AS2MovieClipAdapter");
import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
import TimelineSceneGraphFactory = require("awayjs-player/lib/fl/factories/TimelineSceneGraphFactory");

class AS2SceneGraphFactory implements TimelineSceneGraphFactory
{
    createMovieClip():MovieClip
    {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc);
        return mc;
    }
}