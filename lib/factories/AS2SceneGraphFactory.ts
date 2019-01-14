import {TextField, Timeline, MovieClip, DefaultSceneGraphFactory, Scene} from "@awayjs/scene";

import {AS2MovieClipAdapter} from "../adapters/AS2MovieClipAdapter";
import {AS2TextFieldAdapter} from "../adapters/AS2TextFieldAdapter";

export class AS2SceneGraphFactory extends DefaultSceneGraphFactory
{
	private _scene:Scene;

	constructor(scene:Scene)
	{
		super();

		this._scene = scene;
	}

	createMovieClip(timeline:Timeline = null):MovieClip
	{
		return <MovieClip> new AS2MovieClipAdapter(new MovieClip(timeline), this._scene).adaptee;
	}

	createTextField():TextField
	{
		return <TextField> new AS2TextFieldAdapter(new TextField(), this._scene).adaptee;
	}
}