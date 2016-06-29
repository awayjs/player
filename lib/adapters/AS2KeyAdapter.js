"use strict";
var AS2KeyAdapter = (function () {
    function AS2KeyAdapter() {
    }
    AS2KeyAdapter.addListener = function (listener) {
        AS2KeyAdapter._listeners.push(listener);
    };
    AS2KeyAdapter.removeListener = function (listener) {
        var listeners = AS2KeyAdapter._listeners;
        var index = listeners.indexOf(listener);
        if (index != -1)
            listeners.splice(index, 1);
    };
    AS2KeyAdapter.isDown = function (code) {
        return AS2KeyAdapter._keys[code];
    };
    AS2KeyAdapter.getCode = function () {
        return AS2KeyAdapter._key;
    };
    AS2KeyAdapter.getAscii = function () {
        return AS2KeyAdapter._char;
    };
    AS2KeyAdapter._onKeyDown = function (event) {
        AS2KeyAdapter._key = event.keyCode;
        AS2KeyAdapter._char = event.charCode;
        AS2KeyAdapter._keys[event.keyCode] = true;
        var len = AS2KeyAdapter._listeners.length;
        for (var i = 0; i < len; i++)
            if (AS2KeyAdapter._listeners[i].onKeyDown)
                AS2KeyAdapter._listeners[i].onKeyDown();
    };
    AS2KeyAdapter._onKeyUp = function (event) {
        AS2KeyAdapter._keys[event.keyCode] = false;
        var len = AS2KeyAdapter._listeners.length;
        for (var i = 0; i < len; i++)
            if (AS2KeyAdapter._listeners[i].onKeyUp)
                AS2KeyAdapter._listeners[i].onKeyUp();
    };
    AS2KeyAdapter._keys = new Array();
    AS2KeyAdapter._listeners = new Array();
    AS2KeyAdapter._addListeners = (function () {
        if (document) {
            document.onkeydown = function (event) { return AS2KeyAdapter._onKeyDown(event); };
            document.onkeyup = function (event) { return AS2KeyAdapter._onKeyUp(event); };
        }
    })();
    /**
     * Constant associated with the key code value for the Backspace key (8).
     */
    AS2KeyAdapter.BACKSPACE = 8;
    /**
     * Constant associated with the key code value for the Caps Lock key (20).
     */
    AS2KeyAdapter.CAPSLOCK = 20;
    /**
     * Constant associated with the key code value for the Control key (17).
     */
    AS2KeyAdapter.CONTROL = 17;
    /**
     * Constant associated with the key code value for the Delete key (46).
     */
    AS2KeyAdapter.DELETEKEY = 46;
    /**
     * Constant associated with the key code value for the Down Arrow key (40).
     */
    AS2KeyAdapter.DOWN = 40;
    /**
     * Constant associated with the key code value for the End key (35).
     */
    AS2KeyAdapter.END = 35;
    /**
     * Constant associated with the key code value for the Enter key (13).
     */
    AS2KeyAdapter.ENTER = 13;
    /**
     * Constant associated with the key code value for the Escape key (27).
     */
    AS2KeyAdapter.ESCAPE = 27;
    /**
     * Constant associated with the key code value for the Home key (36).
     */
    AS2KeyAdapter.HOME = 36;
    /**
     * Constant associated with the key code value for the Insert key (45).
     */
    AS2KeyAdapter.INSERT = 45;
    /**
     * Constant associated with the key code value for the Left Arrow key (37).
     */
    AS2KeyAdapter.LEFT = 37;
    /**
     * Constant associated with the key code value for the Page Down key (34).
     */
    AS2KeyAdapter.PGDN = 34;
    /**
     * Constant associated with the key code value for the Page Up key (33).
     */
    AS2KeyAdapter.PGUP = 33;
    /**
     * Constant associated with the key code value for the Right Arrow key (39).
     */
    AS2KeyAdapter.RIGHT = 39;
    /**
     * Constant associated with the key code value for the Shift key (16).
     */
    AS2KeyAdapter.SHIFT = 16;
    /**
     * Constant associated with the key code value for the Spacebar (32).
     */
    AS2KeyAdapter.SPACE = 32;
    /**
     * Constant associated with the key code value for the Tab key (9).
     */
    AS2KeyAdapter.TAB = 9;
    /**
     * Constant associated with the key code value for the Up Arrow key (38).
     */
    AS2KeyAdapter.UP = 38;
    return AS2KeyAdapter;
}());
exports.AS2KeyAdapter = AS2KeyAdapter;
