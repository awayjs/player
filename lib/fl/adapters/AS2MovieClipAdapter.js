var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AS2SymbolAdapter = require("awayjs-player/lib/fl/adapters/AS2SymbolAdapter");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL2FkYXB0ZXJzL0FTMk1vdmllQ2xpcEFkYXB0ZXIudHMiXSwibmFtZXMiOlsiQVMyTW92aWVDbGlwQWRhcHRlciIsIkFTMk1vdmllQ2xpcEFkYXB0ZXIuY29uc3RydWN0b3IiLCJBUzJNb3ZpZUNsaXBBZGFwdGVyLmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxJQUFPLGdCQUFnQixXQUFXLGdEQUFnRCxDQUFDLENBQUM7QUFJcEYsSUFBTSxtQkFBbUI7SUFBU0EsVUFBNUJBLG1CQUFtQkEsVUFBeUJBO0lBd0JqREEsd0JBQXdCQTtJQUN4QkE7Ozs7OztnQ0FNNEJBO0lBRTVCQSxTQWpDS0EsbUJBQW1CQSxDQWlDWkEsT0FBZ0NBO1FBRTNDQyxrQkFBTUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM3QkEsQ0FBQ0E7SUFFREQsNkJBQTZCQTtJQUM3QkEsR0FBR0E7SUFDSEEsR0FBR0E7SUFFSEEsb0NBQW9DQTtJQUVwQ0EsbUhBQW1IQTtJQUVuSEEsOEdBQThHQTtJQUU5R0Esd0hBQXdIQTtJQUV4SEEsdURBQXVEQTtJQUV2REEsK01BQStNQTtJQUUvTUEsbUJBQW1CQTtJQUVuQkEsZ0ZBQWdGQTtJQUVoRkEsMEhBQTBIQTtJQUUxSEEseUZBQXlGQTtJQUV6RkEsa0dBQWtHQTtJQUVsR0EscUJBQXFCQTtJQUVyQkEscURBQXFEQTtJQUVyREEseUNBQXlDQTtJQUV6Q0Esd0NBQXdDQTtJQUV4Q0EsZ0VBQWdFQTtJQUVoRUEsOENBQThDQTtJQUU5Q0EsbURBQW1EQTtJQUVuREEsd0NBQXdDQTtJQUV4Q0EscUNBQXFDQTtJQUVyQ0EsK0RBQStEQTtJQUUvREEscUNBQXFDQTtJQUVyQ0Esc0NBQXNDQTtJQUV0Q0Esc0NBQXNDQTtJQUV0Q0EsdUNBQXVDQTtJQUV2Q0EsK0xBQStMQTtJQUUvTEEsdUtBQXVLQTtJQUV2S0Esd0NBQXdDQTtJQUV4Q0EseURBQXlEQTtJQUV6REEsNkRBQTZEQTtJQUU3REEscUNBQXFDQTtJQUVyQ0Esd0NBQXdDQTtJQUV4Q0EsdUJBQXVCQTtJQUV2QkEsa0JBQWtCQTtJQUVsQkEsdUJBQXVCQTtJQUV2QkEsNkJBQTZCQTtJQUU3QkEsK0JBQStCQTtJQUUvQkEsNEhBQTRIQTtJQUU1SEEsa0JBQWtCQTtJQUVsQkEsc0JBQXNCQTtJQUV0QkEsc0NBQXNDQTtJQUV0Q0EseUJBQXlCQTtJQUV0QkEsbUNBQUtBLEdBQUxBLFVBQU1BLFVBQWlDQTtRQUVuQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQW1CQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtJQUMvQ0EsQ0FBQ0E7SUFDTEYsMEJBQUNBO0FBQURBLENBbklBLEFBbUlDQSxFQW5JaUMsZ0JBQWdCLEVBbUlqRDtBQUNELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJmbC9hZGFwdGVycy9BUzJNb3ZpZUNsaXBBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF19