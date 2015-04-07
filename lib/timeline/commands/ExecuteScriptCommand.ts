import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

class ExecuteScriptCommand implements FrameCommand
{
    // script are functions called with "this" referring to either the adapter or the MovieClip
    private _script:string;
    private _translatedScript:Function;

    constructor(script:Function);

    // pass in a script that will be evalled into a function definition
    constructor(script:string);

    constructor(script:any)
    {
        if (typeof script == "string")
            this._script = script;
        else
            this._translatedScript = <Function>script;
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        if (!this._translatedScript)
            this.translateScript(sourceMovieClip.adapter.classReplacements);

        var caller = sourceMovieClip.adapter? sourceMovieClip.adapter : sourceMovieClip;
        this._translatedScript.call(caller);
    }

    // TODO: handle this in the exporter so it's safe!
    public translateScript(classReplacements)
    {
        var replaced = (<string>this._script).replace(/(\\n|\r)/g, "");
        var replacementPreface = "";
        var replacementPostface = "";

        // where "this" is a single word
        replaced = replaced.replace(/\wthis\./g, "___scoped_this___.");

        for (var srcName in classReplacements) {
            var dstName = classReplacements[srcName];
            // where class name is a single word
            var regex = "\b" + srcName + "\b";
            replaced = replaced.replace(new RegExp(regex, "g"), dstName);

            // store old references to stuff in a temporary var to be reset after script execution;
            // make sure a definition exists, even if it's undefined
            replacementPreface += "var __OLD_" + srcName + " = typeof " + srcName + " == 'function'? " + srcName + " : undefined;\n";

            replacementPostface += srcName + " = __OLD_" + srcName + ";\n";
        }

        // make sure we don't use "this", since Actionscript's "this" has the same scope rules as a variable
        var str =   replacementPreface +
                    "var ___scoped_this___ = this;" +
                    "with(___scoped_this___) { \n" +
                        replaced +
                    "}\n" +
                    replacementPostface;

        //console.log(str);
        this._translatedScript = new Function(str);
    }
}
export = ExecuteScriptCommand;