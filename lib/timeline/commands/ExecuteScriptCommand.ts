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

    public execute(sourceMovieClip : MovieClip, frame:number):void
    {
        if (!this._translatedScript) {
            this.translateScript(sourceMovieClip.adapter.classReplacements);
        }

        var caller = sourceMovieClip.adapter? sourceMovieClip.adapter : sourceMovieClip;

        try {
            this._translatedScript.call(caller);
        }
        catch(err)
        {
            console.log("Script error in " + sourceMovieClip.name + ":\n" + frame, this._translatedScript);
            console.log(err.message);
            //throw err;
        }
    }

    private regexIndexOf(str : string, regex : RegExp, startpos : number) {
        var indexOf = str.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    }

    // TODO: handle this in the exporter so it's safe!
    public translateScript(classReplacements)
    {
        var replaced = (<string>this._script).replace(/(\\n|\r)/g, "");
        var replacementPreface = "";
        var replacementPostface = "";

        // where "this" is a single word
        //replaced = replaced.replace(/\bthis\./, "___scoped_this___.");

        for (var srcName in classReplacements) {
            var dstName = classReplacements[srcName];
            // where class name is a single word
            //var regex = "\b" + srcName + "\b";
            //replaced = replaced.replace(new RegExp(regex, "g"), dstName);

            // store old references to stuff in a temporary var to be reset after script execution;
            // make sure a definition exists, even if it's undefined
            replacementPreface += "var __OLD_" + srcName + " = typeof " + srcName + " == 'function'? " + srcName + " : undefined;\n";
            replacementPreface += srcName + " = require(\"" + dstName + "\");\n";
            replacementPreface += "function int(value) { return value | 0; }\n";
            replacementPostface += srcName + " = __OLD_" + srcName + ";\n";
        }

        //var functions : string[] = [];
        //var index = -1;
        //var functionRegEx = /\bfunction\s+[A-Za-z_][A-Za-z0-9_]*/g;
        /*do {
            // find a function definition, and pray we can replace global scope
            index = this.regexIndexOf(replaced, functionRegEx, index >= 0? index : 0);
            if (index >= 0) {
                functions.push(replaced.substring(index + 9, replaced.indexOf("(", index)));
                var insertIndex = replaced.indexOf("{", index) + 1;

                replaced = replaced.slice(0, insertIndex) + "\nwith (___scoped_this___) {\n" + replaced.slice(insertIndex);

                insertIndex += 27;

                // insert a closing bracket before the closing bracket of the function (and not one that belongs to another index
                var closingFound = 0;
                var openingFound = 1;   // count the opening bracket for the function
                var len = replaced.length;

                while (insertIndex < len) {
                    var char = replaced.charAt(insertIndex);
                    if (char === "{")
                        ++openingFound;
                    else if (char === "}")
                        ++closingFound;

                    // matching closing found
                    if (closingFound === openingFound) break;
                    ++insertIndex;
                }

                replaced = replaced.slice(0, insertIndex) + "\n}\n" + replaced.slice(insertIndex);
                index = insertIndex + 3;
            }
        } while (index !== -1);

        for (var i = 0; i < functions.length; ++i) {
            replacementPostface += "___scoped_this___." + functions[i] + " = " + functions[i] + ";\n";
        }*/

        // make sure we don't use "this", since Actionscript's "this" has the same scope rules as a variable
        var str =   replacementPreface +
                    //"var ___scoped_this___ = this;" +
                    //"with(___scoped_this___) { \n" +
                        replaced +
                    //"}\n" +
                    replacementPostface;

        //console.log(str);

        this._translatedScript = new Function(str);
    }
}
export = ExecuteScriptCommand;