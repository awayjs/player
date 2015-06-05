import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MouseEvent = require("awayjs-display/lib/events/MouseEvent");
import SceneEvent = require("awayjs-display/lib/events/SceneEvent");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class SetButtonCommand implements FrameCommand
{
    private _targetID:number;
    private _onMouseOver:Function;
    private _onMouseOut:Function;
    private _onMouseDown:Function;
    private _onMouseUp:Function;
    private _onRemovedFromScene:Function;

    constructor(targetID : number)
    {
        this._targetID = targetID;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        var target = sourceMovieClip.getPotentialChildInstance(this._targetID);
        if (target instanceof MovieClip) {
            var mc = <MovieClip>target;
            mc.stop();
            this._onMouseOver = function() { target.currentFrameIndex = 1; };
            this._onMouseOut = function() { target.currentFrameIndex = 0; };
            this._onMouseDown = function() { target.currentFrameIndex = 2; };
            this._onMouseUp = function() { target.currentFrameIndex = target.currentFrameIndex == 0? 0 : 1; };

            this._onRemovedFromScene = function()
            {
                mc.removeEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
                mc.removeEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
                mc.removeEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
                mc.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
                mc.removeEventListener(SceneEvent.REMOVED_FROM_SCENE, this._onRemovedFromScene);
            };

            mc.addEventListener(MouseEvent.MOUSE_OVER, this._onMouseOver);
            mc.addEventListener(MouseEvent.MOUSE_OUT, this._onMouseOut);
            mc.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown);
            mc.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
            mc.addEventListener(SceneEvent.REMOVED_FROM_SCENE, this._onRemovedFromScene);
        }
    }
}
export = SetButtonCommand;