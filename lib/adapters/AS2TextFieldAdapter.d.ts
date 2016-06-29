import { AS2SymbolAdapter } from "../adapters/AS2SymbolAdapter";
import { IDisplayObjectAdapter } from "@awayjs/display/lib/adapters/IDisplayObjectAdapter";
import { TextField } from "@awayjs/display/lib/display/TextField";
import { View } from "@awayjs/display/lib/View";
export declare class AS2TextFieldAdapter extends AS2SymbolAdapter implements IDisplayObjectAdapter {
    private _embedFonts;
    constructor(adaptee: TextField, view: View);
    clone(newAdaptee: TextField): AS2TextFieldAdapter;
    textColor: number;
    embedFonts: boolean;
    text: string;
}
export default AS2TextFieldAdapter;
