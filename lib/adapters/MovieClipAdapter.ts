import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

interface MovieClipAdapter
{
    adaptee : DisplayObjectContainer
    clone(newAdaptee:DisplayObjectContainer) : MovieClipAdapter;

    // Lists a bunch of class names which need to be replaced with adapter types
    classReplacements:Object;
}
export = MovieClipAdapter;