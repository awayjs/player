import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class AddChildAtDepthCommand implements FrameCommand
{
	private _childID:number;
	private _targetDepth:number;

	constructor(childID:number, targetDepth:number)
	{
		this._childID = childID;
		this._targetDepth = targetDepth;
	}

	public execute(sourceMovieClip : MovieClip, time:number):void
	{
		var target = sourceMovieClip.getPotentialChildInstance(this._childID);
		target["__AS2Depth"] = this._targetDepth;
		sourceMovieClip.activateChild(this._childID);
	}
}
export = AddChildAtDepthCommand;