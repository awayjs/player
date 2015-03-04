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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL2FkYXB0ZXJzL0FTMk1vdmllQ2xpcEFkYXB0ZXIudHMiXSwibmFtZXMiOlsiQVMyTW92aWVDbGlwQWRhcHRlciIsIkFTMk1vdmllQ2xpcEFkYXB0ZXIuY29uc3RydWN0b3IiLCJBUzJNb3ZpZUNsaXBBZGFwdGVyLmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxJQUFPLGdCQUFnQixXQUFXLDZDQUE2QyxDQUFDLENBQUM7QUFHakYsSUFBTSxtQkFBbUI7SUFBU0EsVUFBNUJBLG1CQUFtQkEsVUFBeUJBO0lBd0JqREEsd0JBQXdCQTtJQUN4QkE7Ozs7OztnQ0FNNEJBO0lBRTVCQSxTQWpDS0EsbUJBQW1CQSxDQWlDWkEsT0FBZ0NBO1FBRTNDQyxrQkFBTUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM3QkEsQ0FBQ0E7SUFFREQsNkJBQTZCQTtJQUM3QkEsR0FBR0E7SUFDSEEsR0FBR0E7SUFFSEEsb0NBQW9DQTtJQUVwQ0EsbUhBQW1IQTtJQUVuSEEsOEdBQThHQTtJQUU5R0Esd0hBQXdIQTtJQUV4SEEsdURBQXVEQTtJQUV2REEsK01BQStNQTtJQUUvTUEsbUJBQW1CQTtJQUVuQkEsZ0ZBQWdGQTtJQUVoRkEsMEhBQTBIQTtJQUUxSEEseUZBQXlGQTtJQUV6RkEsa0dBQWtHQTtJQUVsR0EscUJBQXFCQTtJQUVyQkEscURBQXFEQTtJQUVyREEseUNBQXlDQTtJQUV6Q0Esd0NBQXdDQTtJQUV4Q0EsZ0VBQWdFQTtJQUVoRUEsOENBQThDQTtJQUU5Q0EsbURBQW1EQTtJQUVuREEsd0NBQXdDQTtJQUV4Q0EscUNBQXFDQTtJQUVyQ0EsK0RBQStEQTtJQUUvREEscUNBQXFDQTtJQUVyQ0Esc0NBQXNDQTtJQUV0Q0Esc0NBQXNDQTtJQUV0Q0EsdUNBQXVDQTtJQUV2Q0EsK0xBQStMQTtJQUUvTEEsdUtBQXVLQTtJQUV2S0Esd0NBQXdDQTtJQUV4Q0EseURBQXlEQTtJQUV6REEsNkRBQTZEQTtJQUU3REEscUNBQXFDQTtJQUVyQ0Esd0NBQXdDQTtJQUV4Q0EsdUJBQXVCQTtJQUV2QkEsa0JBQWtCQTtJQUVsQkEsdUJBQXVCQTtJQUV2QkEsNkJBQTZCQTtJQUU3QkEsK0JBQStCQTtJQUUvQkEsNEhBQTRIQTtJQUU1SEEsa0JBQWtCQTtJQUVsQkEsc0JBQXNCQTtJQUV0QkEsc0NBQXNDQTtJQUV0Q0EseUJBQXlCQTtJQUV0QkEsbUNBQUtBLEdBQUxBLFVBQU1BLFVBQWlDQTtRQUVuQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQW1CQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtJQUMvQ0EsQ0FBQ0E7SUFDTEYsMEJBQUNBO0FBQURBLENBbklBLEFBbUlDQSxFQW5JaUMsZ0JBQWdCLEVBbUlqRDtBQUNELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJhZGFwdGVycy9BUzJNb3ZpZUNsaXBBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhID0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XHJcbmltcG9ydCBNYXRyaXggPSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4XCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lciA9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xyXG5pbXBvcnQgQVMyU3ltYm9sQWRhcHRlciA9IHJlcXVpcmUoXCJhd2F5anMtcGxheWVyL2xpYi9hZGFwdGVycy9BUzJTeW1ib2xBZGFwdGVyXCIpO1xyXG5pbXBvcnQgTW92aWVDbGlwQWRhcHRlciA9IHJlcXVpcmUoXCJhd2F5anMtcGxheWVyL2xpYi9hZGFwdGVycy9Nb3ZpZUNsaXBBZGFwdGVyXCIpO1xyXG5cclxuY2xhc3MgQVMyTW92aWVDbGlwQWRhcHRlciBleHRlbmRzIEFTMlN5bWJvbEFkYXB0ZXIgaW1wbGVtZW50cyBNb3ZpZUNsaXBBZGFwdGVyXHJcbntcclxuXHQvLyBfY3VycmVudGZyYW1lIFtyZWFkLW9ubHldXHJcblx0Ly8gX2Ryb3B0YXJnZXQgW3JlYWQtb25seV1cclxuXHQvLyBlbmFibGVkOiBCb29sZWFuXHJcblx0Ly8gZm9jdXNFbmFibGVkOiBCb29sZWFuXHJcblx0Ly8gZm9yY2VTbW9vdGhpbmc6IEJvb2xlYW5cclxuXHQvLyBfZnJhbWVzbG9hZGVkOiBOdW1iZXIgW3JlYWQtb25seV1cclxuXHQvLyBoaXRBcmVhOiBPYmplY3RcclxuXHQvLyBfbG9ja3Jvb3Q6IEJvb2xlYW5cclxuXHQvLyBfbmFtZTogU3RyaW5nXHJcblx0Ly8gb3BhcXVlQmFja2dyb3VuZDogTnVtYmVyXHJcblx0Ly8gc2Nyb2xsUmVjdDogT2JqZWN0XHJcblx0Ly8gdGFiQ2hpbGRyZW46IEJvb2xlYW5cclxuXHQvLyBfdG90YWxmcmFtZXM6IE51bWJlciBbcmVhZC1vbmx5XVxyXG5cdC8vIHRyYW5zZm9ybTogVHJhbnNmb3JtXHRcdC8vIGNvbnRhaW5zIG1hdHJpeCArIGNvbG9yIG1hdHJpeFxyXG5cdC8vIGdsb2JhbFRvTG9jYWwob2JqKVxyXG5cdC8vIGxvY2FsVG9HbG9iYWwob2JqKVxyXG5cdC8vIG1vdmVUb1xyXG5cdC8vIGdldEJvdW5kc1xyXG5cdC8vIGdldFJlY3RcclxuXHJcblx0cHJpdmF0ZSBjdXJyZW50RnJhbWVJbmRleDogbnVtYmVyO1xyXG5cclxuXHQvLyB0cmFuc2xhdGUgdG8gc2NyaXB0czpcclxuXHQvKnB1YmxpYyBvbkRhdGE6IEZ1bmN0aW9uO1xyXG5cdHB1YmxpYyBvbkVudGVyRnJhbWU6IEZ1bmN0aW9uO1xyXG5cdHB1YmxpYyBvbkxvYWQ6IEZ1bmN0aW9uO1xyXG5cdHB1YmxpYyBvbk1vdXNlRG93bjogRnVuY3Rpb247XHJcblx0cHVibGljIG9uTW91c2VNb3ZlOiBGdW5jdGlvbjtcclxuXHRwdWJsaWMgb25Nb3VzZVVwOiBGdW5jdGlvbjtcclxuXHRwdWJsaWMgb25VbmxvYWQ6IEZ1bmN0aW9uOyovXHJcblxyXG5cdGNvbnN0cnVjdG9yKGFkYXB0ZWUgOiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHN1cGVyKGFkYXB0ZWUpO1xyXG5cdFx0dGhpcy5jdXJyZW50RnJhbWVJbmRleCA9IC0xO1xyXG5cdH1cclxuXHJcblx0Ly9nZXQgX3RvdGFsRnJhbWVzKCkgOiBudW1iZXJcclxuXHQvL3tcclxuXHQvL31cclxuXHJcblx0Ly9hdHRhY2hBdWRpbyhpZDogT2JqZWN0KSA6IHZvaWQge1x0fVxyXG5cclxuXHQvL2F0dGFjaEJpdG1hcChibXA6IEJpdG1hcERhdGEsIGRlcHRoOiBOdW1iZXIsIHBpeGVsU25hcHBpbmc6IFN0cmluZyA9IG51bGwsIHNtb290aGluZzogYm9vbGVhbiA9IGZhbHNlKSA6IHZvaWQgeyB9XHJcblxyXG5cdC8vYXR0YWNoTW92aWUoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkZXB0aDogbnVtYmVyLCBpbml0T2JqZWN0OiBPYmplY3QgPSBudWxsKSA6IE1vdmllQ2xpcCB7IHJldHVybiBudWxsOyB9XHJcblxyXG5cdC8vYmVnaW5CaXRtYXBGaWxsKGJtcDogQml0bWFwRGF0YSwgbWF0cml4OiBNYXRyaXggPSBudWxsLCByZXBlYXQ6IGJvb2xlYW4gPSBmYWxzZSwgc21vb3RoaW5nOiBib29sZWFuID0gZmFsc2UpIDogdm9pZCB7fVxyXG5cclxuXHQvL2JlZ2luRmlsbChyZ2I6IE51bWJlciwgYWxwaGE6IG51bWJlciA9IDEuMCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vYmVnaW5HcmFkaWVudEZpbGwoZmlsbFR5cGU6IHN0cmluZywgY29sb3JzOiBBcnJheSwgYWxwaGFzOiBBcnJheSwgcmF0aW9zOiBBcnJheSwgbWF0cml4OiBPYmplY3QsIHNwcmVhZE1ldGhvZDogc3RyaW5nID0gbnVsbCwgaW50ZXJwb2xhdGlvbk1ldGhvZDogc3RyaW5nICA9IG51bGwsIGZvY2FsUG9pbnRSYXRpbzogbnVtYmVyICA9IG51bGwpIDogdm9pZCB7fVxyXG5cclxuXHQvL2NsZWFyKCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vY3JlYXRlRW1wdHlNb3ZpZUNsaXAobmFtZTogc3RyaW5nLCBkZXB0aDogbnVtYmVyKSA6IE1vdmllQ2xpcCB7IHJldHVybiBudWxsOyB9XHJcblxyXG5cdC8vY3JlYXRlVGV4dEZpZWxkKGluc3RhbmNlTmFtZTogU3RyaW5nLCBkZXB0aDogTnVtYmVyLCB4OiBOdW1iZXIsIHk6IE51bWJlciwgd2lkdGg6IE51bWJlciwgaGVpZ2h0OiBOdW1iZXIpIDogVGV4dEZpZWxkIHt9XHJcblxyXG5cdC8vY3VydmVUbyhjb250cm9sWDogbnVtYmVyLCBjb250cm9sWTogbnVtYmVyLCBhbmNob3JYOiBudW1iZXIsIGFuY2hvclk6IG51bWJlcikgOiB2b2lkIHt9XHJcblxyXG5cdC8vZHVwbGljYXRlTW92aWVDbGlwKG5hbWU6IHN0cmluZywgZGVwdGg6IG51bWJlciwgaW5pdE9iamVjdDogT2JqZWN0KSA6IE1vdmllQ2xpcCB7IHJldHVybiBudWxsOyB9XHJcblxyXG5cdC8vZW5kRmlsbCgpIDogdm9pZCB7fVxyXG5cclxuXHQvL2dldEJvdW5kcyhib3VuZHM6IE9iamVjdCkgOiBPYmplY3QgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuXHQvL2dldEJ5dGVzTG9hZGVkKCkgOiBudW1iZXIgeyByZXR1cm4gMDsgfVxyXG5cclxuXHQvL2dldEJ5dGVzVG90YWwoKSA6IG51bWJlciB7IHJldHVybiAwOyB9XHJcblxyXG5cdC8vZ2V0SW5zdGFuY2VBdERlcHRoKGRlcHRoOiBOdW1iZXIpIDogTW92aWVDbGlwIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcblx0Ly9nZXROZXh0SGlnaGVzdERlcHRoKCkgOiBudW1iZXIgeyByZXR1cm4gMDsgfVxyXG5cclxuXHQvL2dldFJlY3QoYm91bmRzOiBPYmplY3QpIDogT2JqZWN0IHsgcmV0dXJuIG51bGw7IH1cclxuXHJcblx0Ly9nZXRTV0ZWZXJzaW9uKCkgOiBudW1iZXIgeyByZXR1cm4gMDsgfVxyXG5cclxuXHQvL2dldFRleHRTbmFwc2hvdCgpIDogVGV4dFNuYXBzaG90IHt9XHJcblxyXG5cdC8vZ2V0VVJMKHVybDogc3RyaW5nLCB3aW5kb3c6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcpIDogdm9pZCB7fVxyXG5cclxuXHQvL2dsb2JhbFRvTG9jYWwocHQ6IE9iamVjdCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vZ290b0FuZFBsYXkoZnJhbWU6IE9iamVjdCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vZ290b0FuZFN0b3AoZnJhbWU6IE9iamVjdCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vaGl0VGVzdCgpIDogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHQvL2xpbmVHcmFkaWVudFN0eWxlKGZpbGxUeXBlOiBzdHJpbmcsIGNvbG9yczogYXJyYXksIGFscGhhczogYXJyYXksIHJhdGlvczogYXJyYXksIG1hdHJpeDogT2JqZWN0LCBzcHJlYWRNZXRob2Q6IHN0cmluZyA9IG51bGwsIGludGVycG9sYXRpb25NZXRob2Q6IHN0cmluZywgZm9jYWxQb2ludFJhdGlvOiBudW1iZXIpIDogdm9pZCB7fVxyXG5cclxuXHQvL2xpbmVTdHlsZSh0aGlja25lc3M6IG51bWJlciwgcmdiOiBudW1iZXIsIGFscGhhOiBudW1iZXIsIHBpeGVsSGludGluZzogYm9vbGVhbiwgbm9TY2FsZTogc3RyaW5nLCBjYXBzU3R5bGU6IHN0cmluZywgam9pbnRTdHlsZTogc3RyaW5nLCBtaXRlckxpbWl0OiBudW1iZXIpIDogdm9pZCB7fVxyXG5cclxuXHQvL2xpbmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcikgOiB2b2lkIHt9XHJcblxyXG5cdC8vbG9hZE1vdmllKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyA9IG51bGwpIDogdm9pZCB7fVxyXG5cclxuXHQvL2xvYWRWYXJpYWJsZXModXJsOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nID0gbnVsbCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vbG9jYWxUb0dsb2JhbChwdDogT2JqZWN0KSA6IHZvaWQge31cclxuXHJcblx0Ly9tb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpIDogdm9pZCB7fVxyXG5cclxuXHQvL25leHRGcmFtZSgpIDogdm9pZCB7fVxyXG5cclxuXHQvL3BsYXkoKSA6IHZvaWQge31cclxuXHJcblx0Ly9wcmV2RnJhbWUoKSA6IHZvaWQge31cclxuXHJcblx0Ly9yZW1vdmVNb3ZpZUNsaXAoKSA6IHZvaWQge31cclxuXHJcblx0Ly9zZXRNYXNrKG1jOiBPYmplY3QpIDogdm9pZCB7fVxyXG5cclxuXHQvL3N0YXJ0RHJhZyhsb2NrQ2VudGVyOiBib29sZWFuID0gZmFsc2UsIGxlZnQ6IG51bWJlciA9IDAsIHRvcDogbnVtYmVyID0gMCwgcmlnaHQ6IG51bWJlciA9IDAsIGJvdHRvbTogbnVtYmVyID0gMCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vc3RvcCgpIDogdm9pZCB7fVxyXG5cclxuXHQvL3N0b3BEcmFnKCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vc3dhcERlcHRocyh0YXJnZXQ6IE9iamVjdCkgOiB2b2lkIHt9XHJcblxyXG5cdC8vdW5sb2FkTW92aWUoKSA6IHZvaWQge31cclxuXHJcbiAgICBjbG9uZShuZXdBZGFwdGVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpOk1vdmllQ2xpcEFkYXB0ZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEFTMk1vdmllQ2xpcEFkYXB0ZXIobmV3QWRhcHRlZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0ID0gQVMyTW92aWVDbGlwQWRhcHRlcjsiXX0=