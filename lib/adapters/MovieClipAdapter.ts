import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
interface MovieClipAdapter
{
    adaptee : DisplayObjectContainer;
    clone(newAdaptee:DisplayObjectContainer) : MovieClipAdapter;
    isBlockedByScript():boolean;
    freeFromScript():void;
    registerScriptObject(child : DisplayObject):void;
    unregisterScriptObject(child : DisplayObject):void;
    updateDepths():void;

    // Lists a bunch of class names which need to be replaced with adapter types
    classReplacements:Object;
}
export = MovieClipAdapter;