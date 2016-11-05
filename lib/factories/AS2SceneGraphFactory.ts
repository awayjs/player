import {AS2MovieClipAdapter}			from "../adapters/AS2MovieClipAdapter";
import {AS2TextFieldAdapter}			from "../adapters/AS2TextFieldAdapter";
import {TextField}					from "@awayjs/scene/lib/display/TextField";
import {Timeline}						from "@awayjs/scene/lib/base/Timeline";
import {MovieClip}					from "@awayjs/scene/lib/display/MovieClip";
import {ITimelineSceneGraphFactory}	from "@awayjs/scene/lib/factories/ITimelineSceneGraphFactory";
import {IView}						from "@awayjs/scene/lib/IView";


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