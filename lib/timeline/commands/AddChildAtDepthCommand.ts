import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class AddChildAtDepthCommand implements FrameCommand
{
	private _childID:number;
	private _sessionID:number;
	private _targetDepth:number;

	constructor(childID:number, targetDepth:number, sessionID:number)
	{
		this._childID = childID;
		this._targetDepth = targetDepth;
		this._sessionID=sessionID;
	}

	public execute(sourceMovieClip : MovieClip):void
	{
		var target = sourceMovieClip.getPotentialChildInstance(this._childID);
		target["__AS2Depth"] = this._targetDepth;
		target["__sessionID"] = this._sessionID;
		sourceMovieClip.activateChild(this._childID);
	}
}
export = AddChildAtDepthCommand;