import {TextField, Timeline, MovieClip, ITimelineSceneGraphFactory, IView} from "@awayjs/scene";

import {AS2MovieClipAdapter} from "../adapters/AS2MovieClipAdapter";
import {AS2TextFieldAdapter} from "../adapters/AS2TextFieldAdapter";

export class AS2SceneGraphFactory implements ITimelineSceneGraphFactory
{
	private _view:IView;

	constructor(view:IView)
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