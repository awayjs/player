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
		return <MovieClip> new AS2MovieClipAdapter(new MovieClip(timeline), this._view).adaptee;
	}

	createTextField():TextField
	{
		return <TextField> new AS2TextFieldAdapter(new TextField(), this._view).adaptee;
	}
}