import {TextField, Timeline, MovieClip, Sprite, DisplayObjectContainer, ISceneGraphFactory, IView} from "@awayjs/scene";

import {DefaultSceneGraphFactory} from "@awayjs/parsers";

import {AS2MovieClipAdapter} from "../adapters/AS2MovieClipAdapter";
import {AS2TextFieldAdapter} from "../adapters/AS2TextFieldAdapter";

export class AS2SceneGraphFactory extends DefaultSceneGraphFactory implements ISceneGraphFactory
{
	private _view:IView;

	constructor(view:IView)
	{
		super();

		this._view = view;
	}

	createMovieClip(timeline:Timeline = null):MovieClip
	{
		return <MovieClip> new AS2MovieClipAdapter(new MovieClip(timeline), this._view).adaptee;
	}

	createTextField():TextField
	{
		return <TextField> new AS2TextFieldAdapter(new TextField(), this._view).adaptee;
	}
}