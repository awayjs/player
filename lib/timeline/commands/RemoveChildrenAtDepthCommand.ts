import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class RemoveChildrenAtDepthCommand implements FrameCommand
{
	private _depth_to_remove:Array<number>;

	constructor(depth_to_remove:Array<number>)
	{
		this._depth_to_remove = depth_to_remove;
	}

	public execute(sourceMovieClip : MovieClip):void
	{
		var childrenArray = sourceMovieClip["_children"];
		for(var i:number=0; i<this._depth_to_remove.length;i++){
			for(var c:number=0; c<childrenArray.length;c++){
				if(childrenArray[c].__AS2Depth==this._depth_to_remove[i]){
					sourceMovieClip.removeChild(childrenArray[c]);
					break;
				}
			}
		}
	}
}
export = RemoveChildrenAtDepthCommand;