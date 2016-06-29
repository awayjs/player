"use strict";
var AS2SharedObjectAdapter = (function () {
    function AS2SharedObjectAdapter(name) {
        this._object_name = name;
        if (typeof (Storage) !== "undefined") {
            this.data = JSON.parse(localStorage.getItem(name));
        }
        if (this.data == null) {
            console.log("no shared object found");
            this.data = {};
        }
    }
    // should become a static
    AS2SharedObjectAdapter.getLocal = function (name, localPath, secure) {
        return new AS2SharedObjectAdapter(name);
    };
    // needs to stay as it is
    AS2SharedObjectAdapter.prototype.flush = function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(this._object_name, JSON.stringify(this.data));
        }
        else {
            console.log("no local storage available");
        }
        // save all local data to wherever it needs to go
    };
    return AS2SharedObjectAdapter;
}());
exports.AS2SharedObjectAdapter = AS2SharedObjectAdapter;
