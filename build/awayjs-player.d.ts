declare module "awayjs-player/lib/adapters/AS2ColorAdapter" {
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	class AS2ColorAdapter {
	    private _symbol;
	    private _target;
	    private _rgb;
	    private _transform;
	    constructor(symbol: AS2SymbolAdapter);
	    getRGB(): number;
	    setRGB(value: number): void;
	    getTransform(): any;
	    setTransform(value: any): void;
	}
	export = AS2ColorAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2KeyAdapter" {
	class AS2KeyAdapter {
	    private static _keys;
	    private static _key;
	    private static _char;
	    static _listeners: Array<any>;
	    private static _addListeners;
	    static addListener(listener: any): void;
	    static removeListener(listener: any): void;
	    static isDown(code: number): boolean;
	    static getCode(): number;
	    static getAscii(): number;
	    /**
	     * Constant associated with the key code value for the Backspace key (8).
	     */
	    static BACKSPACE: number;
	    /**
	     * Constant associated with the key code value for the Caps Lock key (20).
	     */
	    static CAPSLOCK: number;
	    /**
	     * Constant associated with the key code value for the Control key (17).
	     */
	    static CONTROL: number;
	    /**
	     * Constant associated with the key code value for the Delete key (46).
	     */
	    static DELETEKEY: number;
	    /**
	     * Constant associated with the key code value for the Down Arrow key (40).
	     */
	    static DOWN: number;
	    /**
	     * Constant associated with the key code value for the End key (35).
	     */
	    static END: number;
	    /**
	     * Constant associated with the key code value for the Enter key (13).
	     */
	    static ENTER: number;
	    /**
	     * Constant associated with the key code value for the Escape key (27).
	     */
	    static ESCAPE: number;
	    /**
	     * Constant associated with the key code value for the Home key (36).
	     */
	    static HOME: number;
	    /**
	     * Constant associated with the key code value for the Insert key (45).
	     */
	    static INSERT: number;
	    /**
	     * Constant associated with the key code value for the Left Arrow key (37).
	     */
	    static LEFT: number;
	    /**
	     * Constant associated with the key code value for the Page Down key (34).
	     */
	    static PGDN: number;
	    /**
	     * Constant associated with the key code value for the Page Up key (33).
	     */
	    static PGUP: number;
	    /**
	     * Constant associated with the key code value for the Right Arrow key (39).
	     */
	    static RIGHT: number;
	    /**
	     * Constant associated with the key code value for the Shift key (16).
	     */
	    static SHIFT: number;
	    /**
	     * Constant associated with the key code value for the Spacebar (32).
	     */
	    static SPACE: number;
	    /**
	     * Constant associated with the key code value for the Tab key (9).
	     */
	    static TAB: number;
	    /**
	     * Constant associated with the key code value for the Up Arrow key (38).
	     */
	    static UP: number;
	    private static _onKeyDown(event);
	    private static _onKeyUp(event);
	}
	export = AS2KeyAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2MCSoundProps" {
	import WaveAudio = require("awayjs-core/lib/audio/WaveAudio");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	class AS2MCSoundProps extends AssetBase {
	    private _volume;
	    private _pan;
	    private _changeEvent;
	    private _audio;
	    constructor();
	    dispose(): void;
	    volume: number;
	    pan: number;
	    audio: WaveAudio;
	}
	export = AS2MCSoundProps;
	
}

declare module "awayjs-player/lib/adapters/AS2MouseAdapter" {
	class AS2MouseAdapter {
	    private static _globalListeners;
	    static addListener(listener: Object): void;
	}
	export = AS2MouseAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SharedObjectAdapter" {
	class AS2SharedObjectAdapter {
	    data: Object;
	    private _object_name;
	    constructor(name: string);
	    static getLocal(name: string, localPath?: string, secure?: boolean): AS2SharedObjectAdapter;
	    flush(): void;
	}
	export = AS2SharedObjectAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2MovieClipAdapter" {
	import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import IMovieClipAdapter = require("awayjs-display/lib/adapters/IMovieClipAdapter");
	import MovieClip = require("awayjs-display/lib/entities/MovieClip");
	import MouseEvent = require("awayjs-display/lib/events/MouseEvent");
	import View = require("awayjs-display/lib/containers/View");
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	import AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
	class AS2MovieClipAdapter extends AS2SymbolAdapter implements IMovieClipAdapter {
	    __pSoundProps: AS2MCSoundProps;
	    private _onEnterFrame;
	    private _onRelease;
	    private _onRollOver;
	    private _onRollOut;
	    private _onPress;
	    private _onMouseDown;
	    private _onMouseUp;
	    constructor(adaptee: MovieClip, view: View);
	    dispose(): void;
	    _framesloaded: number;
	    _currentframe: number;
	    _totalframes: number;
	    enabled: boolean;
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
	export = AS2MovieClipAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SoundAdapter" {
	import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
	class AS2SoundAdapter {
	    private _target;
	    private _soundProps;
	    private _loop;
	    private _name;
	    private _id;
	    private _playing;
	    private _volume;
	    private static _globalSoundProps;
	    private static _soundIDCnt;
	    private _onGlobalChangeDelegate;
	    constructor(target: AS2MovieClipAdapter);
	    attachSound(id: string): void;
	    getPan(): number;
	    setPan(value: number): void;
	    getVolume(): number;
	    setVolume(value: number): void;
	    start(offsetInSeconds?: number, loops?: number): void;
	    stop(linkageID?: string): void;
	    position: number;
	    duration: number;
	    id3: Object;
	    private onGlobalChange(event);
	    private updateVolume();
	}
	export = AS2SoundAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2StageAdapter" {
	class AS2StageAdapter {
	    static showMenu: boolean;
	}
	export = AS2StageAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SymbolAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import TouchPoint = require("awayjs-display/lib/base/TouchPoint");
	import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
	import View = require("awayjs-display/lib/containers/View");
	class AS2SymbolAdapter {
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
	    adaptee: DisplayObjectContainer;
	    _height: number;
	    _name: string;
	    _rotation: number;
	    _x: number;
	    _xmouse: number;
	    _y: number;
	    _ymouse: number;
	    _xscale: number;
	    _yscale: number;
	    _visible: boolean;
	    _width: number;
	    _touchpoints: Array<TouchPoint>;
	    getDepth(): number;
	    _quality: string;
	    quality: string;
	    trace(message: any): void;
	    getTimer(): Number;
	    _alpha: number;
	    _url: string;
	    _global: AS2MovieClipAdapter;
	    _level0: AS2SymbolAdapter;
	    clearInterval(handle: number): void;
	    setInterval(handler: Function, timeout: number, ...args: any[]): number;
	    setInterval(scope: any, handler: string, timeout: number, ...args: any[]): number;
	    _level10301: AS2SymbolAdapter;
	    _root: AS2SymbolAdapter;
	    random(range: number): number;
	    _parent: AS2MovieClipAdapter;
	}
	export = AS2SymbolAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SystemAdapter" {
	class AS2SystemAdapter {
	    static security: Object;
	    static capabilities: Object;
	}
	export = AS2SystemAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2TextFieldAdapter" {
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	import IDisplayObjectAdapter = require("awayjs-display/lib/adapters/IDisplayObjectAdapter");
	import TextField = require("awayjs-display/lib/entities/TextField");
	import View = require("awayjs-display/lib/containers/View");
	class AS2TextFieldAdapter extends AS2SymbolAdapter implements IDisplayObjectAdapter {
	    private _embedFonts;
	    constructor(adaptee: TextField, view: View);
	    clone(newAdaptee: TextField): AS2TextFieldAdapter;
	    textColor: number;
	    embedFonts: boolean;
	    text: string;
	}
	export = AS2TextFieldAdapter;
	
}

declare module "awayjs-player/lib/bounds/AxisAlignedBoundingBox2D" {
	import AxisAlignedBoundingBox = require("awayjs-display/lib/bounds/AxisAlignedBoundingBox");
	export = AxisAlignedBoundingBox;
	
}

declare module "awayjs-player/lib/factories/AS2SceneGraphFactory" {
	import TextField = require("awayjs-display/lib/entities/TextField");
	import Timeline = require("awayjs-display/lib/base/Timeline");
	import MovieClip = require("awayjs-display/lib/entities/MovieClip");
	import ITimelineSceneGraphFactory = require("awayjs-display/lib/factories/ITimelineSceneGraphFactory");
	import View = require("awayjs-display/lib/containers/View");
	class AS2SceneGraphFactory implements ITimelineSceneGraphFactory {
	    private _view;
	    constructor(view: View);
	    createMovieClip(timeline: Timeline): MovieClip;
	    createTextField(): TextField;
	}
	export = AS2SceneGraphFactory;
	
}

