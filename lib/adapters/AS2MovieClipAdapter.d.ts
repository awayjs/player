import { AssetEvent } from "@awayjs/core/lib/events/AssetEvent";
import { DisplayObject } from "@awayjs/display/lib/display/DisplayObject";
import { IMovieClipAdapter } from "@awayjs/display/lib/adapters/IMovieClipAdapter";
import { MovieClip } from "@awayjs/display/lib/display/MovieClip";
import { MouseEvent } from "@awayjs/display/lib/events/MouseEvent";
import { View } from "@awayjs/display/lib/View";
import { AS2SymbolAdapter } from "../adapters/AS2SymbolAdapter";
import { AS2MCSoundProps } from "../adapters/AS2MCSoundProps";
export declare class AS2MovieClipAdapter extends AS2SymbolAdapter implements IMovieClipAdapter {
    __pSoundProps: AS2MCSoundProps;
    _includes: Object;
    private _onEnterFrame;
    private _onRelease;
    private _onRollOver;
    private _onRollOut;
    private _onPress;
    private _onMouseDown;
    private _onMouseUp;
    constructor(adaptee: MovieClip, view: View);
    dispose(): void;
    readonly _framesloaded: number;
    readonly _currentframe: number;
    readonly _totalframes: number;
    readonly enabled: boolean;
    evalScript(str: string): Function;
    attachMovie(id: string, name: string, depth: number, initObject?: Object): MovieClip;
    createEmptyMovieClip(name: string, depth: number): AS2MovieClipAdapter;
    duplicateMovieClip(name: string, depth: number, initObject: Object): AS2MovieClipAdapter;
    getBytesLoaded(): number;
    getBytesTotal(): number;
    getInstanceAtDepth(depth: number): MovieClip;
    getNextHighestDepth(): number;
    globalToLocal(pt: any): void;
    gotoAndPlay(frame: any): void;
    gotoAndStop(frame: any): void;
    play(): void;
    stop(): void;
    hitTest(x: number, y: number, shapeFlag?: boolean): boolean;
    localToGlobal(pt: any): void;
    nextFrame(): void;
    prevFrame(): void;
    setMask(mc: DisplayObject): void;
    swapDepths(target: DisplayObject): void;
    clone(newAdaptee: MovieClip): AS2MovieClipAdapter;
    /**
     *
     */
    onEnterFrame: (event: AssetEvent) => void;
    /**
     *
     */
    onRollOut: (event: MouseEvent) => void;
    /**
     *
     */
    onRollOver: (event: MouseEvent) => void;
    /**
     *
     */
    onRelease: (event: MouseEvent) => void;
    /**
     *
     */
    onPress: (event: MouseEvent) => void;
    /**
     *
     */
    onMouseDown: (event: MouseEvent) => void;
    /**
     *
     */
    onMouseUp: (event: MouseEvent) => void;
    registerScriptObject(child: DisplayObject): void;
    unregisterScriptObject(child: DisplayObject): void;
    private _gotoFrame(frame);
    private _replaceEventListener(eventType, currentListener, newListener);
}
