import {IDisplayObjectAdapter, TextField, Scene} from "@awayjs/scene";

import {AS2SymbolAdapter} from "./AS2SymbolAdapter";

export class AS2TextFieldAdapter extends AS2SymbolAdapter implements IDisplayObjectAdapter
{
	private _embedFonts:boolean;

	constructor(adaptee:TextField, scene:Scene)
	{
		super(adaptee, scene);
		adaptee.multiline=true;
		adaptee.wordWrap=true;
	}

	public clone():AS2TextFieldAdapter
	{
		var clone:AS2TextFieldAdapter = new AS2TextFieldAdapter(TextField.getNewTextField(), this._scene);

		this.adaptee.copyTo(clone.adaptee);

		return clone;
	}

	public get textColor():number
	{
		return (<TextField>this._adaptee).textColor;
	}

	public set textColor(value:number)
	{
		(<TextField>this._adaptee).textColor = value;
	}
	
	public get embedFonts():boolean
	{
		return this._embedFonts;
	}

	public set embedFonts(value:boolean)
	{
		this._embedFonts = value;
	}

	public get text():string
	{
		return (<TextField>this._adaptee).text;
	}

	public set text(value:string)
	{
		(<TextField>this._adaptee).text = value;
	}
}
export default AS2TextFieldAdapter;