// We're using a specific command so we don't need to manage an AS2-like "depth" property, which has no meaning in Away3D's display hierarchy
// This implementation itself is a hack, tho, but it works.
var ApplyAS2DepthsCommand = (function () {
    function ApplyAS2DepthsCommand() {
    }
    ApplyAS2DepthsCommand.prototype.execute = function (sourceMovieClip, time) {
        var childrenArray = sourceMovieClip["_children"];
        childrenArray.sort(this.sortChildrenByDepth);
    };
    ApplyAS2DepthsCommand.prototype.sortChildrenByDepth = function (a, b) {
        var da = (a["__AS2Depth"]);
        var db = (b["__AS2Depth"]);
        if (da === undefined)
            da = 0;
        if (db === undefined)
            db = 0;
        return db - da;
    };
    return ApplyAS2DepthsCommand;
})();
module.exports = ApplyAS2DepthsCommand;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL3RpbWVsaW5lL2NvbW1hbmRzL0FwcGx5QVMyRGVwdGhzQ29tbWFuZC50cyJdLCJuYW1lcyI6WyJBcHBseUFTMkRlcHRoc0NvbW1hbmQiLCJBcHBseUFTMkRlcHRoc0NvbW1hbmQuY29uc3RydWN0b3IiLCJBcHBseUFTMkRlcHRoc0NvbW1hbmQuZXhlY3V0ZSIsIkFwcGx5QVMyRGVwdGhzQ29tbWFuZC5zb3J0Q2hpbGRyZW5CeURlcHRoIl0sIm1hcHBpbmdzIjoiQUFLQSxBQUVBLDZJQUY2STtBQUM3SSwyREFBMkQ7SUFDckQscUJBQXFCO0lBRXZCQSxTQUZFQSxxQkFBcUJBO0lBSXZCQyxDQUFDQTtJQUVNRCx1Q0FBT0EsR0FBZEEsVUFBZUEsZUFBMkJBLEVBQUVBLElBQVdBO1FBRW5ERSxJQUFJQSxhQUFhQSxHQUFHQSxlQUFlQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUNqREEsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQTtJQUNqREEsQ0FBQ0E7SUFFT0YsbURBQW1CQSxHQUEzQkEsVUFBNEJBLENBQWVBLEVBQUVBLENBQWVBO1FBRXhERyxJQUFJQSxFQUFFQSxHQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuQ0EsSUFBSUEsRUFBRUEsR0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEtBQUtBLFNBQVNBLENBQUNBO1lBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1FBQzdCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxTQUFTQSxDQUFDQTtZQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUM3QkEsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBQ0xILDRCQUFDQTtBQUFEQSxDQXBCQSxBQW9CQ0EsSUFBQTtBQUNELEFBQStCLGlCQUF0QixxQkFBcUIsQ0FBQyIsImZpbGUiOiJmbC90aW1lbGluZS9jb21tYW5kcy9BcHBseUFTMkRlcHRoc0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOltudWxsXX0=