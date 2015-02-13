import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

interface MovieClipAdapter
{
    adaptee : DisplayObjectContainer
    clone(newAdaptee:DisplayObjectContainer) : MovieClipAdapter;
}
export = MovieClipAdapter;