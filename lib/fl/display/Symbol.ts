import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import SymbolAdapter = require("awayjs-player/lib/fl/adapters/SymbolAdapter");


/**
 * Base class for anything containing a AS2 Flash object (MovieClip or Button)
 */
class Symbol extends DisplayObjectContainer
{
    private _adapter : SymbolAdapter;

    constructor()
    {
        super();
        this._adapter = this.createAdapter();
    }

    protected createAdapter() : SymbolAdapter
    {
        throw new Error('This method is abstract');
    }

    get adapter() : SymbolAdapter
    {
        return this._adapter;
    }
}
export = Symbol;