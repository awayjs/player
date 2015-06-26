import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class SetMaskCommand implements FrameCommand
{
    private _targetID:number;
    private _maskIDs:Array<number>;

    // target can be MovieClip, its ColorTransform, and so on
    constructor(targetID : number, maskIDs : Array<number>)
    {
        this._targetID = targetID;
        this._maskIDs = maskIDs;
    }

    public execute(sourceMovieClip : MovieClip):void
    {
        var len = this._maskIDs.length;
        var masks = new Array<DisplayObject>();
        for (var i:number = 0; i < len; ++i) {
            masks[i] = sourceMovieClip.getPotentialChildInstance(this._maskIDs[i]);
        }
        sourceMovieClip.getPotentialChildInstance(this._targetID)._iMasks = masks;
    }
}
export = SetMaskCommand;