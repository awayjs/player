import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import MovieClip = require("awayjs-player/lib/display/MovieClip");
import TimelineSceneGraphFactory = require("awayjs-player/lib/factories/TimelineSceneGraphFactory");

class AS2SceneGraphFactory implements TimelineSceneGraphFactory
{
    createMovieClip():MovieClip
    {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc);
        return mc;
    }
}
export = AS2SceneGraphFactory;