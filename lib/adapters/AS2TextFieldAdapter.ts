import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
import TextFieldAdapter = require("awayjs-player/lib/adapters/TextFieldAdapter");
import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
import View			= require("awayjs-display/lib/containers/View");

class AS2TextFieldAdapter extends AS2SymbolAdapter implements TextFieldAdapter
{
    private _embedFonts : boolean;

    constructor(adaptee : AdaptedTextField, view:View)
    {
        // create an empty text field if none is passed
        super(adaptee || new AdaptedTextField(), view);
    }

    clone(newAdaptee:AdaptedTextField):TextFieldAdapter
    {
        return new AS2TextFieldAdapter(newAdaptee, this._view);
    }

    get embedFonts() : boolean
    {
        return this._embedFonts;
    }

    set embedFonts(value:boolean)
    {
        this._embedFonts = value;
    }

    get text():string
    {
        return (<AdaptedTextField>this.adaptee).text;
    }

    set text(value:string)
    {
        (<AdaptedTextField>this.adaptee).text = value;
    }
}
export = AS2TextFieldAdapter;