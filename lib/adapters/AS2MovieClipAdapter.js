var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
var AS2MovieClipAdapter = (function (_super) {
    __extends(AS2MovieClipAdapter, _super);
    // translate to scripts:
    /*public onData: Function;
    public onEnterFrame: Function;
    public onLoad: Function;
    public onMouseDown: Function;
    public onMouseMove: Function;
    public onMouseUp: Function;
    public onUnload: Function;*/
    function AS2MovieClipAdapter(adaptee) {
        _super.call(this, adaptee);
        this.currentFrameIndex = -1;
    }
    //get _totalFrames() : number
    //{
    //}
    //attachAudio(id: Object) : void {	}
    //attachBitmap(bmp: BitmapData, depth: Number, pixelSnapping: String = null, smoothing: boolean = false) : void { }
    //attachMovie(id: string, name: string, depth: number, initObject: Object = null) : MovieClip { return null; }
    //beginBitmapFill(bmp: BitmapData, matrix: Matrix = null, repeat: boolean = false, smoothing: boolean = false) : void {}
    //beginFill(rgb: Number, alpha: number = 1.0) : void {}
    //beginGradientFill(fillType: string, colors: Array, alphas: Array, ratios: Array, matrix: Object, spreadMethod: string = null, interpolationMethod: string  = null, focalPointRatio: number  = null) : void {}
    //clear() : void {}
    //createEmptyMovieClip(name: string, depth: number) : MovieClip { return null; }
    //createTextField(instanceName: String, depth: Number, x: Number, y: Number, width: Number, height: Number) : TextField {}
    //curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number) : void {}
    //duplicateMovieClip(name: string, depth: number, initObject: Object) : MovieClip { return null; }
    //endFill() : void {}
    //getBounds(bounds: Object) : Object { return null; }
    //getBytesLoaded() : number { return 0; }
    //getBytesTotal() : number { return 0; }
    //getInstanceAtDepth(depth: Number) : MovieClip { return null; }
    //getNextHighestDepth() : number { return 0; }
    //getRect(bounds: Object) : Object { return null; }
    //getSWFVersion() : number { return 0; }
    //getTextSnapshot() : TextSnapshot {}
    //getURL(url: string, window: string, method: string) : void {}
    //globalToLocal(pt: Object) : void {}
    //gotoAndPlay(frame: Object) : void {}
    //gotoAndStop(frame: Object) : void {}
    //hitTest() : boolean { return false; }
    //lineGradientStyle(fillType: string, colors: array, alphas: array, ratios: array, matrix: Object, spreadMethod: string = null, interpolationMethod: string, focalPointRatio: number) : void {}
    //lineStyle(thickness: number, rgb: number, alpha: number, pixelHinting: boolean, noScale: string, capsStyle: string, jointStyle: string, miterLimit: number) : void {}
    //lineTo(x: number, y: number) : void {}
    //loadMovie(url: string, method: string = null) : void {}
    //loadVariables(url: string, method: string = null) : void {}
    //localToGlobal(pt: Object) : void {}
    //moveTo(x: number, y: number) : void {}
    //nextFrame() : void {}
    //play() : void {}
    //prevFrame() : void {}
    //removeMovieClip() : void {}
    //setMask(mc: Object) : void {}
    //startDrag(lockCenter: boolean = false, left: number = 0, top: number = 0, right: number = 0, bottom: number = 0) : void {}
    //stop() : void {}
    //stopDrag() : void {}
    //swapDepths(target: Object) : void {}
    //unloadMovie() : void {}
    AS2MovieClipAdapter.prototype.clone = function (newAdaptee) {
        return new AS2MovieClipAdapter(newAdaptee);
    };
    return AS2MovieClipAdapter;
})(AS2SymbolAdapter);
module.exports = AS2MovieClipAdapter;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL2FkYXB0ZXJzL0FTMk1vdmllQ2xpcEFkYXB0ZXIudHMiXSwibmFtZXMiOlsiQVMyTW92aWVDbGlwQWRhcHRlciIsIkFTMk1vdmllQ2xpcEFkYXB0ZXIuY29uc3RydWN0b3IiLCJBUzJNb3ZpZUNsaXBBZGFwdGVyLmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxJQUFPLGdCQUFnQixXQUFXLDZDQUE2QyxDQUFDLENBQUM7QUFHakYsSUFBTSxtQkFBbUI7SUFBU0EsVUFBNUJBLG1CQUFtQkEsVUFBeUJBO0lBd0JqREEsd0JBQXdCQTtJQUN4QkE7Ozs7OztnQ0FNNEJBO0lBRTVCQSxTQWpDS0EsbUJBQW1CQSxDQWlDWkEsT0FBZ0NBO1FBRTNDQyxrQkFBTUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM3QkEsQ0FBQ0E7SUFFREQsNkJBQTZCQTtJQUM3QkEsR0FBR0E7SUFDSEEsR0FBR0E7SUFFSEEsb0NBQW9DQTtJQUVwQ0EsbUhBQW1IQTtJQUVuSEEsOEdBQThHQTtJQUU5R0Esd0hBQXdIQTtJQUV4SEEsdURBQXVEQTtJQUV2REEsK01BQStNQTtJQUUvTUEsbUJBQW1CQTtJQUVuQkEsZ0ZBQWdGQTtJQUVoRkEsMEhBQTBIQTtJQUUxSEEseUZBQXlGQTtJQUV6RkEsa0dBQWtHQTtJQUVsR0EscUJBQXFCQTtJQUVyQkEscURBQXFEQTtJQUVyREEseUNBQXlDQTtJQUV6Q0Esd0NBQXdDQTtJQUV4Q0EsZ0VBQWdFQTtJQUVoRUEsOENBQThDQTtJQUU5Q0EsbURBQW1EQTtJQUVuREEsd0NBQXdDQTtJQUV4Q0EscUNBQXFDQTtJQUVyQ0EsK0RBQStEQTtJQUUvREEscUNBQXFDQTtJQUVyQ0Esc0NBQXNDQTtJQUV0Q0Esc0NBQXNDQTtJQUV0Q0EsdUNBQXVDQTtJQUV2Q0EsK0xBQStMQTtJQUUvTEEsdUtBQXVLQTtJQUV2S0Esd0NBQXdDQTtJQUV4Q0EseURBQXlEQTtJQUV6REEsNkRBQTZEQTtJQUU3REEscUNBQXFDQTtJQUVyQ0Esd0NBQXdDQTtJQUV4Q0EsdUJBQXVCQTtJQUV2QkEsa0JBQWtCQTtJQUVsQkEsdUJBQXVCQTtJQUV2QkEsNkJBQTZCQTtJQUU3QkEsK0JBQStCQTtJQUUvQkEsNEhBQTRIQTtJQUU1SEEsa0JBQWtCQTtJQUVsQkEsc0JBQXNCQTtJQUV0QkEsc0NBQXNDQTtJQUV0Q0EseUJBQXlCQTtJQUV0QkEsbUNBQUtBLEdBQUxBLFVBQU1BLFVBQWlDQTtRQUVuQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQW1CQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtJQUMvQ0EsQ0FBQ0E7SUFDTEYsMEJBQUNBO0FBQURBLENBbklBLEFBbUlDQSxFQW5JaUMsZ0JBQWdCLEVBbUlqRDtBQUNELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJhZGFwdGVycy9BUzJNb3ZpZUNsaXBBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhID0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgTWF0cml4ID0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIik7XG5pbXBvcnQgQVMyU3ltYm9sQWRhcHRlciA9IHJlcXVpcmUoXCJhd2F5anMtcGxheWVyL2xpYi9hZGFwdGVycy9BUzJTeW1ib2xBZGFwdGVyXCIpO1xuaW1wb3J0IE1vdmllQ2xpcEFkYXB0ZXIgPSByZXF1aXJlKFwiYXdheWpzLXBsYXllci9saWIvYWRhcHRlcnMvTW92aWVDbGlwQWRhcHRlclwiKTtcblxuY2xhc3MgQVMyTW92aWVDbGlwQWRhcHRlciBleHRlbmRzIEFTMlN5bWJvbEFkYXB0ZXIgaW1wbGVtZW50cyBNb3ZpZUNsaXBBZGFwdGVyXG57XG5cdC8vIF9jdXJyZW50ZnJhbWUgW3JlYWQtb25seV1cblx0Ly8gX2Ryb3B0YXJnZXQgW3JlYWQtb25seV1cblx0Ly8gZW5hYmxlZDogQm9vbGVhblxuXHQvLyBmb2N1c0VuYWJsZWQ6IEJvb2xlYW5cblx0Ly8gZm9yY2VTbW9vdGhpbmc6IEJvb2xlYW5cblx0Ly8gX2ZyYW1lc2xvYWRlZDogTnVtYmVyIFtyZWFkLW9ubHldXG5cdC8vIGhpdEFyZWE6IE9iamVjdFxuXHQvLyBfbG9ja3Jvb3Q6IEJvb2xlYW5cblx0Ly8gX25hbWU6IFN0cmluZ1xuXHQvLyBvcGFxdWVCYWNrZ3JvdW5kOiBOdW1iZXJcblx0Ly8gc2Nyb2xsUmVjdDogT2JqZWN0XG5cdC8vIHRhYkNoaWxkcmVuOiBCb29sZWFuXG5cdC8vIF90b3RhbGZyYW1lczogTnVtYmVyIFtyZWFkLW9ubHldXG5cdC8vIHRyYW5zZm9ybTogVHJhbnNmb3JtXHRcdC8vIGNvbnRhaW5zIG1hdHJpeCArIGNvbG9yIG1hdHJpeFxuXHQvLyBnbG9iYWxUb0xvY2FsKG9iailcblx0Ly8gbG9jYWxUb0dsb2JhbChvYmopXG5cdC8vIG1vdmVUb1xuXHQvLyBnZXRCb3VuZHNcblx0Ly8gZ2V0UmVjdFxuXG5cdHByaXZhdGUgY3VycmVudEZyYW1lSW5kZXg6IG51bWJlcjtcblxuXHQvLyB0cmFuc2xhdGUgdG8gc2NyaXB0czpcblx0LypwdWJsaWMgb25EYXRhOiBGdW5jdGlvbjtcblx0cHVibGljIG9uRW50ZXJGcmFtZTogRnVuY3Rpb247XG5cdHB1YmxpYyBvbkxvYWQ6IEZ1bmN0aW9uO1xuXHRwdWJsaWMgb25Nb3VzZURvd246IEZ1bmN0aW9uO1xuXHRwdWJsaWMgb25Nb3VzZU1vdmU6IEZ1bmN0aW9uO1xuXHRwdWJsaWMgb25Nb3VzZVVwOiBGdW5jdGlvbjtcblx0cHVibGljIG9uVW5sb2FkOiBGdW5jdGlvbjsqL1xuXG5cdGNvbnN0cnVjdG9yKGFkYXB0ZWUgOiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKVxuXHR7XG5cdFx0c3VwZXIoYWRhcHRlZSk7XG5cdFx0dGhpcy5jdXJyZW50RnJhbWVJbmRleCA9IC0xO1xuXHR9XG5cblx0Ly9nZXQgX3RvdGFsRnJhbWVzKCkgOiBudW1iZXJcblx0Ly97XG5cdC8vfVxuXG5cdC8vYXR0YWNoQXVkaW8oaWQ6IE9iamVjdCkgOiB2b2lkIHtcdH1cblxuXHQvL2F0dGFjaEJpdG1hcChibXA6IEJpdG1hcERhdGEsIGRlcHRoOiBOdW1iZXIsIHBpeGVsU25hcHBpbmc6IFN0cmluZyA9IG51bGwsIHNtb290aGluZzogYm9vbGVhbiA9IGZhbHNlKSA6IHZvaWQgeyB9XG5cblx0Ly9hdHRhY2hNb3ZpZShpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRlcHRoOiBudW1iZXIsIGluaXRPYmplY3Q6IE9iamVjdCA9IG51bGwpIDogTW92aWVDbGlwIHsgcmV0dXJuIG51bGw7IH1cblxuXHQvL2JlZ2luQml0bWFwRmlsbChibXA6IEJpdG1hcERhdGEsIG1hdHJpeDogTWF0cml4ID0gbnVsbCwgcmVwZWF0OiBib29sZWFuID0gZmFsc2UsIHNtb290aGluZzogYm9vbGVhbiA9IGZhbHNlKSA6IHZvaWQge31cblxuXHQvL2JlZ2luRmlsbChyZ2I6IE51bWJlciwgYWxwaGE6IG51bWJlciA9IDEuMCkgOiB2b2lkIHt9XG5cblx0Ly9iZWdpbkdyYWRpZW50RmlsbChmaWxsVHlwZTogc3RyaW5nLCBjb2xvcnM6IEFycmF5LCBhbHBoYXM6IEFycmF5LCByYXRpb3M6IEFycmF5LCBtYXRyaXg6IE9iamVjdCwgc3ByZWFkTWV0aG9kOiBzdHJpbmcgPSBudWxsLCBpbnRlcnBvbGF0aW9uTWV0aG9kOiBzdHJpbmcgID0gbnVsbCwgZm9jYWxQb2ludFJhdGlvOiBudW1iZXIgID0gbnVsbCkgOiB2b2lkIHt9XG5cblx0Ly9jbGVhcigpIDogdm9pZCB7fVxuXG5cdC8vY3JlYXRlRW1wdHlNb3ZpZUNsaXAobmFtZTogc3RyaW5nLCBkZXB0aDogbnVtYmVyKSA6IE1vdmllQ2xpcCB7IHJldHVybiBudWxsOyB9XG5cblx0Ly9jcmVhdGVUZXh0RmllbGQoaW5zdGFuY2VOYW1lOiBTdHJpbmcsIGRlcHRoOiBOdW1iZXIsIHg6IE51bWJlciwgeTogTnVtYmVyLCB3aWR0aDogTnVtYmVyLCBoZWlnaHQ6IE51bWJlcikgOiBUZXh0RmllbGQge31cblxuXHQvL2N1cnZlVG8oY29udHJvbFg6IG51bWJlciwgY29udHJvbFk6IG51bWJlciwgYW5jaG9yWDogbnVtYmVyLCBhbmNob3JZOiBudW1iZXIpIDogdm9pZCB7fVxuXG5cdC8vZHVwbGljYXRlTW92aWVDbGlwKG5hbWU6IHN0cmluZywgZGVwdGg6IG51bWJlciwgaW5pdE9iamVjdDogT2JqZWN0KSA6IE1vdmllQ2xpcCB7IHJldHVybiBudWxsOyB9XG5cblx0Ly9lbmRGaWxsKCkgOiB2b2lkIHt9XG5cblx0Ly9nZXRCb3VuZHMoYm91bmRzOiBPYmplY3QpIDogT2JqZWN0IHsgcmV0dXJuIG51bGw7IH1cblxuXHQvL2dldEJ5dGVzTG9hZGVkKCkgOiBudW1iZXIgeyByZXR1cm4gMDsgfVxuXG5cdC8vZ2V0Qnl0ZXNUb3RhbCgpIDogbnVtYmVyIHsgcmV0dXJuIDA7IH1cblxuXHQvL2dldEluc3RhbmNlQXREZXB0aChkZXB0aDogTnVtYmVyKSA6IE1vdmllQ2xpcCB7IHJldHVybiBudWxsOyB9XG5cblx0Ly9nZXROZXh0SGlnaGVzdERlcHRoKCkgOiBudW1iZXIgeyByZXR1cm4gMDsgfVxuXG5cdC8vZ2V0UmVjdChib3VuZHM6IE9iamVjdCkgOiBPYmplY3QgeyByZXR1cm4gbnVsbDsgfVxuXG5cdC8vZ2V0U1dGVmVyc2lvbigpIDogbnVtYmVyIHsgcmV0dXJuIDA7IH1cblxuXHQvL2dldFRleHRTbmFwc2hvdCgpIDogVGV4dFNuYXBzaG90IHt9XG5cblx0Ly9nZXRVUkwodXJsOiBzdHJpbmcsIHdpbmRvdzogc3RyaW5nLCBtZXRob2Q6IHN0cmluZykgOiB2b2lkIHt9XG5cblx0Ly9nbG9iYWxUb0xvY2FsKHB0OiBPYmplY3QpIDogdm9pZCB7fVxuXG5cdC8vZ290b0FuZFBsYXkoZnJhbWU6IE9iamVjdCkgOiB2b2lkIHt9XG5cblx0Ly9nb3RvQW5kU3RvcChmcmFtZTogT2JqZWN0KSA6IHZvaWQge31cblxuXHQvL2hpdFRlc3QoKSA6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuXHQvL2xpbmVHcmFkaWVudFN0eWxlKGZpbGxUeXBlOiBzdHJpbmcsIGNvbG9yczogYXJyYXksIGFscGhhczogYXJyYXksIHJhdGlvczogYXJyYXksIG1hdHJpeDogT2JqZWN0LCBzcHJlYWRNZXRob2Q6IHN0cmluZyA9IG51bGwsIGludGVycG9sYXRpb25NZXRob2Q6IHN0cmluZywgZm9jYWxQb2ludFJhdGlvOiBudW1iZXIpIDogdm9pZCB7fVxuXG5cdC8vbGluZVN0eWxlKHRoaWNrbmVzczogbnVtYmVyLCByZ2I6IG51bWJlciwgYWxwaGE6IG51bWJlciwgcGl4ZWxIaW50aW5nOiBib29sZWFuLCBub1NjYWxlOiBzdHJpbmcsIGNhcHNTdHlsZTogc3RyaW5nLCBqb2ludFN0eWxlOiBzdHJpbmcsIG1pdGVyTGltaXQ6IG51bWJlcikgOiB2b2lkIHt9XG5cblx0Ly9saW5lVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpIDogdm9pZCB7fVxuXG5cdC8vbG9hZE1vdmllKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyA9IG51bGwpIDogdm9pZCB7fVxuXG5cdC8vbG9hZFZhcmlhYmxlcyh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcgPSBudWxsKSA6IHZvaWQge31cblxuXHQvL2xvY2FsVG9HbG9iYWwocHQ6IE9iamVjdCkgOiB2b2lkIHt9XG5cblx0Ly9tb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpIDogdm9pZCB7fVxuXG5cdC8vbmV4dEZyYW1lKCkgOiB2b2lkIHt9XG5cblx0Ly9wbGF5KCkgOiB2b2lkIHt9XG5cblx0Ly9wcmV2RnJhbWUoKSA6IHZvaWQge31cblxuXHQvL3JlbW92ZU1vdmllQ2xpcCgpIDogdm9pZCB7fVxuXG5cdC8vc2V0TWFzayhtYzogT2JqZWN0KSA6IHZvaWQge31cblxuXHQvL3N0YXJ0RHJhZyhsb2NrQ2VudGVyOiBib29sZWFuID0gZmFsc2UsIGxlZnQ6IG51bWJlciA9IDAsIHRvcDogbnVtYmVyID0gMCwgcmlnaHQ6IG51bWJlciA9IDAsIGJvdHRvbTogbnVtYmVyID0gMCkgOiB2b2lkIHt9XG5cblx0Ly9zdG9wKCkgOiB2b2lkIHt9XG5cblx0Ly9zdG9wRHJhZygpIDogdm9pZCB7fVxuXG5cdC8vc3dhcERlcHRocyh0YXJnZXQ6IE9iamVjdCkgOiB2b2lkIHt9XG5cblx0Ly91bmxvYWRNb3ZpZSgpIDogdm9pZCB7fVxuXG4gICAgY2xvbmUobmV3QWRhcHRlZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyKTpNb3ZpZUNsaXBBZGFwdGVyXG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IEFTMk1vdmllQ2xpcEFkYXB0ZXIobmV3QWRhcHRlZSk7XG4gICAgfVxufVxuZXhwb3J0ID0gQVMyTW92aWVDbGlwQWRhcHRlcjsiXX0=