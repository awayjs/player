import { DisplayObjectContainer } from "@awayjs/display/lib/display/DisplayObjectContainer";
import { TouchPoint } from "@awayjs/display/lib/base/TouchPoint";
import { AS2MovieClipAdapter } from "../adapters/AS2MovieClipAdapter";
import { View } from "@awayjs/display/lib/View";
export declare class AS2SymbolAdapter {
    _view: View;
    isBlockedByScript(): boolean;
    isVisibilityByScript(): boolean;
    freeFromScript(): void;
    private __root;
    private _adaptee;
    private __quality;
    _blockedByScript: boolean;
    _visibilityByScript: boolean;
    static REFERENCE_TIME: number;
    constructor(adaptee: DisplayObjectContainer, view: View);
    dispose(): void;
    getVersion(): number;
    readonly adaptee: DisplayObjectContainer;
    _height: number;
    readonly _name: string;
    _rotation: number;
    _x: number;
    readonly _xmouse: number;
    _y: number;
    readonly _ymouse: number;
    _xscale: number;
    _yscale: number;
    _visible: boolean;
    _width: number;
    readonly _touchpoints: Array<TouchPoint>;
    getDepth(): number;
    readonly _quality: string;
    quality: string;
    trace(message: any): void;
    getTimer(): Number;
    _alpha: number;
    readonly _url: string;
    readonly _global: AS2MovieClipAdapter;
    readonly _level0: AS2SymbolAdapter;
    clearInterval(handle: number): void;
    setInterval(handler: Function, timeout: number, ...args: any[]): number;
    setInterval(scope: any, handler: string, timeout: number, ...args: any[]): number;
    readonly _level10301: AS2SymbolAdapter;
    readonly _root: AS2SymbolAdapter;
    random(range: number): number;
    readonly _parent: AS2MovieClipAdapter;
}
