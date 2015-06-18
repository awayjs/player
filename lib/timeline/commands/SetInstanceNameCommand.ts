import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

import AS2MovieClipAtapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
// can't use SetPropertyCommand since we NEED the setter to be called properly
class SetInstanceNameCommand implements FrameCommand
{
    private _targetID:number;
    private _name:string;

    // target can be MovieClip, its ColorTransform, and so on
    constructor(targetID : number, name:string)
    {
        this._targetID = targetID;
        this._name = name;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        var target = sourceMovieClip.getPotentialChildInstance(this._targetID);
        target.name = this._name;
        // i know that changing the name should trigger the event on AS2MovieClipAtapter,
        // which in turn should register the object with a new name.
        // but it did not seem to be working (maybe because of events being to slow ?)
        // brute force to register this child for scriptaccess on the parent movieclip
        (<AS2MovieClipAtapter>sourceMovieClip["adapter"])._pRegisterChild(target);
    }
}
export = SetInstanceNameCommand;