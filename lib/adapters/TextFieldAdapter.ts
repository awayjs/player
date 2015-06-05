import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

interface TextFieldAdapter
{
    adaptee : DisplayObjectContainer
    clone(newAdaptee:AdaptedTextField) : TextFieldAdapter;
}
export = TextFieldAdapter;