"use strict";
var AS2MovieClipAdapter_1 = require("../adapters/AS2MovieClipAdapter");
var AS2TextFieldAdapter_1 = require("../adapters/AS2TextFieldAdapter");
var TextField_1 = require("@awayjs/display/lib/display/TextField");
var MovieClip_1 = require("@awayjs/display/lib/display/MovieClip");
var AS2SceneGraphFactory = (function () {
    function AS2SceneGraphFactory(view) {
        this._view = view;
    }
    AS2SceneGraphFactory.prototype.createMovieClip = function (timeline) {
        var mc = new MovieClip_1.MovieClip(timeline);
        mc.adapter = new AS2MovieClipAdapter_1.AS2MovieClipAdapter(mc, this._view);
        return mc;
    };
    AS2SceneGraphFactory.prototype.createTextField = function () {
        var tf = new TextField_1.TextField();
        tf.adapter = new AS2TextFieldAdapter_1.AS2TextFieldAdapter(tf, this._view);
        return tf;
    };
    return AS2SceneGraphFactory;
}());
exports.AS2SceneGraphFactory = AS2SceneGraphFactory;
