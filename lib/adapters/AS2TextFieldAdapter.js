"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AS2SymbolAdapter_1 = require("../adapters/AS2SymbolAdapter");
var TextField_1 = require("@awayjs/display/lib/display/TextField");
var AS2TextFieldAdapter = (function (_super) {
    __extends(AS2TextFieldAdapter, _super);
    function AS2TextFieldAdapter(adaptee, view) {
        // create an empty text field if none is passed
        _super.call(this, adaptee || new TextField_1.TextField(), view);
    }
    AS2TextFieldAdapter.prototype.clone = function (newAdaptee) {
        return new AS2TextFieldAdapter(newAdaptee, this._view);
    };
    Object.defineProperty(AS2TextFieldAdapter.prototype, "textColor", {
        get: function () {
            return this.adaptee.textColor;
        },
        set: function (value) {
            this.adaptee.textColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2TextFieldAdapter.prototype, "embedFonts", {
        get: function () {
            return this._embedFonts;
        },
        set: function (value) {
            this._embedFonts = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2TextFieldAdapter.prototype, "text", {
        get: function () {
            return this.adaptee.text;
        },
        set: function (value) {
            this.adaptee.text = value;
        },
        enumerable: true,
        configurable: true
    });
    return AS2TextFieldAdapter;
}(AS2SymbolAdapter_1.AS2SymbolAdapter));
exports.AS2TextFieldAdapter = AS2TextFieldAdapter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AS2TextFieldAdapter;
