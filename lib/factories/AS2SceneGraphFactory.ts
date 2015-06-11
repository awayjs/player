import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import AS2TextFieldAdapter = require("awayjs-player/lib/adapters/AS2TextFieldAdapter");
import MovieClip = require("awayjs-player/lib/display/MovieClip");
import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
import TimelineSceneGraphFactory = require("awayjs-player/lib/factories/TimelineSceneGraphFactory");
import View			= require("awayjs-display/lib/containers/View");


class AS2SceneGraphFactory implements TimelineSceneGraphFactory
{
    private _view:View;

    constructor(view:View)
    {
        this._view = view;
    }
    createMovieClip():MovieClip
    {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc, this._view);
        return mc;
    }

    createTextField():AdaptedTextField
    {
        var tf = new AdaptedTextField();
        tf.adapter = new AS2TextFieldAdapter(tf, this._view);
        return tf;
    }
}
export = AS2SceneGraphFactory;