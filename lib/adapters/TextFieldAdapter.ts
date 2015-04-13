import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");

interface TextFieldAdapter
{
    adaptee : AdaptedTextField
    clone(newAdaptee:AdaptedTextField) : TextFieldAdapter;
}
export = TextFieldAdapter;