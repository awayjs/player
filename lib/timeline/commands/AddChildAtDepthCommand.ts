import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class AddChildAtDepthCommand implements FrameCommand
{
	private _childID:number;
	private _target_depth:number;

	constructor(childID:number, target_depth:number)
	{
		this._childID = childID;
		this._target_depth = target_depth;
	}

	public execute(sourceMovieClip : MovieClip, time:number):void
	{
		var target = sourceMovieClip.getPotentialChildInstance(this._childID);
		target["__AS2Depth"] = this._target_depth;
		sourceMovieClip.activateChild(this._childID);
		sourceMovieClip.visible=true;
	}
}
export = AddChildAtDepthCommand;