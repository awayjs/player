import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import AS2TextFieldAdapter = require("awayjs-player/lib/adapters/AS2TextFieldAdapter");
import TextField = require("awayjs-display/lib/entities/TextField");
import MovieClip = require("awayjs-display/lib/entities/MovieClip");
import ITimelineSceneGraphFactory = require("awayjs-display/lib/factories/ITimelineSceneGraphFactory");
import View			= require("awayjs-display/lib/containers/View");


class AS2SceneGraphFactory implements ITimelineSceneGraphFactory
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

    createTextField():TextField
    {
        var tf = new TextField();
        tf.adapter = new AS2TextFieldAdapter(tf, this._view);
        return tf;
    }
}
export = AS2SceneGraphFactory;