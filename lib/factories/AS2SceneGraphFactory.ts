import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import AS2TextFieldAdapter = require("awayjs-player/lib/adapters/AS2TextFieldAdapter");
import MovieClip = require("awayjs-player/lib/display/MovieClip");
import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
import TimelineSceneGraphFactory = require("awayjs-player/lib/factories/TimelineSceneGraphFactory");

class AS2SceneGraphFactory implements TimelineSceneGraphFactory
{
    createMovieClip():MovieClip
    {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc);
        return mc;
    }

    createTextField():AdaptedTextField
    {
        var tf = new AdaptedTextField();
        tf.adapter = new AS2TextFieldAdapter(tf);
        return tf;
    }
}
export = AS2SceneGraphFactory;