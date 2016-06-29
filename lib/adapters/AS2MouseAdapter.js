"use strict";
var AS2MouseAdapter = (function () {
    function AS2MouseAdapter() {
    }
    // this does nothing really, just to catch usage in scripts
    AS2MouseAdapter.addListener = function (listener) {
        AS2MouseAdapter._globalListeners.push(listener);
        // TODO: Init actual mouse events here, relative to root MovieClip (I suppose?)
    };
    AS2MouseAdapter._globalListeners = [];
    return AS2MouseAdapter;
}());
exports.AS2MouseAdapter = AS2MouseAdapter;
