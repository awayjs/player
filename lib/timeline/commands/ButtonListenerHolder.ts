import MouseEvent = require("awayjs-display/lib/events/MouseEvent");
import SceneEvent = require("awayjs-display/lib/events/SceneEvent");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class ButtonListenerHolder
{
    private _target_mc:MovieClip;
    private _onMouseOver:Function;
    private _onMouseOut:Function;
    private _onMouseDown:Function;
    private _onMouseUp:Function;
    private _onRemovedFromScene:Function;

    constructor(target : MovieClip)
    {

    }

}
export = ButtonListenerHolder;