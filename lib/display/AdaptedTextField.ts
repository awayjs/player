import TextField = require("awayjs-display/lib/entities/TextField");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

import TextFieldAdapter = require("awayjs-player/lib/adapters/TextFieldAdapter");
import TimelineKeyFrame = require("awayjs-player/lib/timeline/TimelineKeyFrame");

class AdaptedTextField extends TextField
{
    private _adapter:TextFieldAdapter;

    constructor()
    {
        super();
    }

    // adapter is used to provide MovieClip to scripts taken from different platforms
    // TODO: Perhaps adapters should be created dynamically whenever needed, rather than storing them
    public get adapter():TextFieldAdapter
    {
        return this._adapter;
    }

    public clone():DisplayObject
    {
        var clone = new AdaptedTextField();
        this._iCopyToTextField(clone);
        clone.adapter = this.adapter.clone(clone);
        return clone;
    }

    // setter typically managed by factor
    public set adapter(value:TextFieldAdapter)
    {
        this._adapter = value;
    }
}
export = AdaptedTextField;
