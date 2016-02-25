import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import AS2TextFieldAdapter = require("awayjs-player/lib/adapters/AS2TextFieldAdapter");
import TextField = require("awayjs-display/lib/display/TextField");
import Timeline = require("awayjs-display/lib/base/Timeline");
import MovieClip = require("awayjs-display/lib/display/MovieClip");
import ITimelineSceneGraphFactory = require("awayjs-display/lib/factories/ITimelineSceneGraphFactory");
import View			= require("awayjs-display/lib/View");


class AS2SceneGraphFactory implements ITimelineSceneGraphFactory
{
    private _view:View;

    constructor(view:View)
    {
        this._view = view;
    }
    createMovieClip(timeline:Timeline):MovieClip
    {
        var mc = new MovieClip(timeline);
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