"use strict";
var HierarchicalProperties_1 = require("@awayjs/display/lib/base/HierarchicalProperties");
var ColorTransform_1 = require("@awayjs/core/lib/geom/ColorTransform");
// also contains global AS2 functions
var AS2ColorAdapter = (function () {
    function AS2ColorAdapter(symbol) {
        this._rgb = 0xffffff;
        this._symbol = symbol;
        this._symbol._blockedByScript = true;
        this._target = symbol.adaptee.transform.colorTransform || (symbol.adaptee.transform.colorTransform = new ColorTransform_1.ColorTransform());
        this._transform = { ra: 100, rb: 0, ga: 100, gb: 0, ba: 100, bb: 0, aa: 100, ab: 0 };
    }
    AS2ColorAdapter.prototype.getRGB = function () {
        return this._rgb;
    };
    AS2ColorAdapter.prototype.setRGB = function (value) {
        this._rgb = value;
        var r = (value >> 16) & 0xff;
        var g = (value >> 8) & 0xff;
        var b = value & 0xff;
        this.setTransform({ ra: r / 0xff * 100, ga: g / 0xff * 100, ba: b / 0xff * 100, aa: 100, rb: 0, gb: 0, bb: 0, ab: 0 });
    };
    AS2ColorAdapter.prototype.getTransform = function () {
        return this._transform;
    };
    AS2ColorAdapter.prototype.setTransform = function (value) {
        this._transform = value;
        var ct = this._target;
        ct.redMultiplier = value.ra === undefined ? 1 : value.ra / 100;
        ct.greenMultiplier = value.ga === undefined ? 1 : value.ga / 100;
        ct.blueMultiplier = value.ba === undefined ? 1 : value.ba / 100;
        ct.alphaMultiplier = value.aa === undefined ? 1 : value.aa / 100;
        ct.redOffset = value.rb || 0;
        ct.greenOffset = value.gb || 0;
        ct.blueOffset = value.bb || 0;
        ct.alphaOffset = value.ab || 0;
        this._symbol.adaptee.pInvalidateHierarchicalProperties(HierarchicalProperties_1.HierarchicalProperties.COLOR_TRANSFORM);
    };
    return AS2ColorAdapter;
}());
exports.AS2ColorAdapter = AS2ColorAdapter;
