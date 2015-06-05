import TextField = require("awayjs-display/lib/entities/TextField");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

import TextFieldAdapter = require("awayjs-player/lib/adapters/TextFieldAdapter");
import TimelineKeyFrame = require("awayjs-player/lib/timeline/TimelineKeyFrame");
import MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");

class AdaptedTextField extends TextField
{
    private _adapter:TextFieldAdapter;

    constructor()
    {
        super();
    }

    public get adapter():TextFieldAdapter
    {
        return this._adapter;
    }

    // setter typically managed by factor
    public set adapter(value:TextFieldAdapter)
    {
        this._adapter = value;
    }

    public clone():DisplayObject
    {
        var clone = new AdaptedTextField();
        this._iCopyToTextField(clone);
        if (this._adapter) clone.adapter = this._adapter.clone(clone);
        return clone;
    }

    public get name() : string
    {
        return this._pName;
    }

    public set name(value:string)
    {
        if (this._pName !== value) {
            this._pName = value;
            this.dispatchEvent(new MovieClipEvent(MovieClipEvent.NAME_CHANGED, this));
        }
    }
}
export = AdaptedTextField;
