import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class UpdatePropertyCommand implements FrameCommand
{
    private _targetID:number;
    private _propertyName:string;
    private _value:any; // had hoped to use generics, but that results in parser headaches

    // target can be MovieClip, its ColorTransform, and so on
    constructor(targetID : number, propertyName:string, value:any)
    {
        this._targetID = targetID;
        this._propertyName = propertyName;
        this._value = value;
    }

    public execute(sourceMovieClip : MovieClip):void
    {
        try {

            var target = sourceMovieClip.getPotentialChildInstance(this._targetID);
            if(target.parent==sourceMovieClip) {
                var blocked_by_script:boolean=false;
                if (target.isAsset(MovieClip)) {
                    var mc:MovieClip = <MovieClip>target;
                    blocked_by_script = mc.adapter.isBlockedByScript();
                }
                if (!blocked_by_script)
                    target[this._propertyName] = this._value;
            }
        }
        catch(err) {
            console.log("Failed to set " + this._propertyName + " on " + sourceMovieClip.name);
            throw err;
        }
    }
}
export = UpdatePropertyCommand;