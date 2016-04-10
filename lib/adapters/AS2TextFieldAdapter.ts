import AS2SymbolAdapter from "../adapters/AS2SymbolAdapter";

import IDisplayObjectAdapter		from "awayjs-display/lib/adapters/IDisplayObjectAdapter";
import TextField from "awayjs-display/lib/display/TextField";
import View			from "awayjs-display/lib/View";

class AS2TextFieldAdapter extends AS2SymbolAdapter implements IDisplayObjectAdapter
{
    private _embedFonts : boolean;

    constructor(adaptee : TextField, view:View)
    {
        // create an empty text field if none is passed
        super(adaptee || new TextField(), view);
    }

    clone(newAdaptee:TextField):AS2TextFieldAdapter
    {
        return new AS2TextFieldAdapter(newAdaptee, this._view);
    }

    get textColor() : number
    {
        return (<TextField>this.adaptee).textColor;
    }

    set textColor(value:number)
    {
        (<TextField>this.adaptee).textColor = value;
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
        return (<TextField>this.adaptee).text;
    }

    set text(value:string)
    {
        (<TextField>this.adaptee).text = value;
    }
}
export default AS2TextFieldAdapter;