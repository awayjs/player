declare module "awayjs-player/lib/adapters/AS2ColorAdapter" {
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	class AS2ColorAdapter {
	    private _target;
	    private _rgb;
	    private _transform;
	    constructor(target: AS2SymbolAdapter);
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
	import WaveAudio = require("awayjs-core/lib/data/WaveAudio");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	class AS2MCSoundProps extends EventDispatcher {
	    private _volume;
	    private _pan;
	    private _changeEvent;
	    private _loops;
	    private _audio;
	    private _onEndedDelegate;
	    constructor();
	    volume: number;
	    pan: number;
	    loops: number;
	    audio: WaveAudio;
	    private onEnded(event);
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

declare module "awayjs-player/lib/adapters/AS2MovieClipAdapter" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	import AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
	import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
	import View = require("awayjs-display/lib/containers/View");
	class AS2MovieClipAdapter extends AS2SymbolAdapter implements MovieClipAdapter {
	    __pSoundProps: AS2MCSoundProps;
	    private _nameChangeCallback;
	    private _onEnterFrame;
	    private _onRelease;
	    private _onMouseDown;
	    private _onMouseUp;
	    constructor(adaptee: DisplayObjectContainer, view: View);
	    _framesloaded: number;
	    _currentframe: number;
	    _totalframes: number;
	    enabled: boolean;
	    attachMovie(id: string, name: string, depth: number, initObject?: Object): MovieClip;
	    createEmptyMovieClip(name: string, depth: number): AS2MovieClipAdapter;
	    duplicateMovieClip(name: string, depth: number, initObject: Object): MovieClip;
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
	    clone(newAdaptee: DisplayObjectContainer): MovieClipAdapter;
	    onEnterFrame: Function;
	    onRelease: Function;
	    onMouseDown: Function;
	    onMouseUp: Function;
	    registerScriptObject(child: DisplayObject): void;
	    unregisterScriptObject(child: DisplayObject): void;
	    _pOnChildAdded(event: MovieClipEvent): void;
	    private _pOnChildRemoved(event);
	    private _pOnChildNameChanged(event);
	    private _gotoFrame(frame);
	    private _updateDepths(target);
	    updateDepths(): void;
	    private sortChildrenByDepth(a, b);
	    private _replaceEventListener(eventType, currentListener, newListener);
	}
	export = AS2MovieClipAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SharedObjectAdapter" {
	class AS2SharedObjectAdapter {
	    data: Object;
	    constructor();
	    static getLocal(name: string, localPath: string, secure: boolean): AS2SharedObjectAdapter;
	    flush(): void;
	}
	export = AS2SharedObjectAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SoundAdapter" {
	import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
	class AS2SoundAdapter {
	    private _target;
	    private _soundProps;
	    private static _globalSoundProps;
	    private _onGlobalChangeDelegate;
	    constructor(target: AS2MovieClipAdapter);
	    looping: number;
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
	import AS2SharedObjectAdapter = require("awayjs-player/lib/adapters/AS2SharedObjectAdapter");
	import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
	import AS2KeyAdapter = require("awayjs-player/lib/adapters/AS2KeyAdapter");
	import AS2MouseAdapter = require("awayjs-player/lib/adapters/AS2MouseAdapter");
	import AS2StageAdapter = require("awayjs-player/lib/adapters/AS2StageAdapter");
	import View = require("awayjs-display/lib/containers/View");
	class AS2SymbolAdapter {
	    _view: View;
	    Key: typeof AS2KeyAdapter;
	    Mouse: typeof AS2MouseAdapter;
	    Stage: typeof AS2StageAdapter;
	    SharedObject: typeof AS2SharedObjectAdapter;
	    String(value: any): any;
	    string(value: any): any;
	    isBlockedByScript(): boolean;
	    freeFromScript(): void;
	    private __root;
	    private _adaptee;
	    private __quality;
	    _blockedByScript: boolean;
	    private static REFERENCE_TIME;
	    private static CLASS_REPLACEMENTS;
	    constructor(adaptee: DisplayObjectContainer, view: View);
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
	    getDepth(): number;
	    _quality: string;
	    quality: string;
	    trace(message: any): void;
	    getTimer(): Number;
	    int(value: any): number;
	    _alpha: number;
	    _url: string;
	    _global: AS2MovieClipAdapter;
	    _level0: AS2SymbolAdapter;
	    clearInterval(handle: number): void;
	    setInterval(handler: any, timeout: number): void;
	    _level10301: AS2SymbolAdapter;
	    _root: AS2SymbolAdapter;
	    random(range: number): number;
	    classReplacements: Object;
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
	import TextFieldAdapter = require("awayjs-player/lib/adapters/TextFieldAdapter");
	import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
	import View = require("awayjs-display/lib/containers/View");
	class AS2TextFieldAdapter extends AS2SymbolAdapter implements TextFieldAdapter {
	    private _embedFonts;
	    constructor(adaptee: AdaptedTextField, view: View);
	    clone(newAdaptee: AdaptedTextField): TextFieldAdapter;
	    embedFonts: boolean;
	    text: string;
	}
	export = AS2TextFieldAdapter;
	
}

declare module "awayjs-player/lib/adapters/MovieClipAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	interface MovieClipAdapter {
	    adaptee: DisplayObjectContainer;
	    clone(newAdaptee: DisplayObjectContainer): MovieClipAdapter;
	    isBlockedByScript(): boolean;
	    freeFromScript(): void;
	    registerScriptObject(child: DisplayObject): void;
	    unregisterScriptObject(child: DisplayObject): void;
	    updateDepths(): void;
	    classReplacements: Object;
	}
	export = MovieClipAdapter;
	
}

declare module "awayjs-player/lib/adapters/TextFieldAdapter" {
	import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	interface TextFieldAdapter {
	    adaptee: DisplayObjectContainer;
	    clone(newAdaptee: AdaptedTextField): TextFieldAdapter;
	}
	export = TextFieldAdapter;
	
}

declare module "awayjs-player/lib/bounds/AxisAlignedBoundingBox2D" {
	import AxisAlignedBoundingBox = require("awayjs-display/lib/bounds/AxisAlignedBoundingBox");
	export = AxisAlignedBoundingBox;
	
}

declare module "awayjs-player/lib/display/AdaptedTextField" {
	import TextField = require("awayjs-display/lib/entities/TextField");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import TextFieldAdapter = require("awayjs-player/lib/adapters/TextFieldAdapter");
	class AdaptedTextField extends TextField {
	    private _adapter;
	    constructor();
	    adapter: TextFieldAdapter;
	    clone(): DisplayObject;
	    name: string;
	}
	export = AdaptedTextField;
	
}

declare module "awayjs-player/lib/display/MovieClip" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
	import Timeline = require("awayjs-player/lib/timeline/Timeline");
	import ExecuteScriptCommand = require("awayjs-player/lib/timeline/commands/ExecuteScriptCommand");
	class MovieClip extends DisplayObjectContainer {
	    static assetType: string;
	    private _timeline;
	    private _isButton;
	    private _onMouseOver;
	    private _onMouseOut;
	    private _onMouseDown;
	    private _onMouseUp;
	    private _time;
	    private _currentFrameIndex;
	    private _constructedKeyFrameIndex;
	    private _fps;
	    private _isPlaying;
	    private _loop;
	    private _forceFirstScript;
	    private _prototype;
	    private _enterFrame;
	    private _skipAdvance;
	    private _isInit;
	    private _adapter;
	    private _potentialInstances;
	    private _keyFramesWaitingForPostConstruct;
	    constructor();
	    isInit: boolean;
	    forceFirstScript: boolean;
	    timeline: Timeline;
	    loop: boolean;
	    numFrames: number;
	    jumpToLabel(label: string): void;
	    currentFrameIndex: number;
	    constructedKeyFrameIndex: number;
	    reset(): void;
	    adapter: MovieClipAdapter;
	    makeButton(): void;
	    removeButtonListener(): void;
	    name: string;
	    addChild(child: DisplayObject): DisplayObject;
	    removeChild(child: DisplayObject): DisplayObject;
	    fps: number;
	    assetType: string;
	    /**
	     * Starts playback of animation from current position
	     */
	    play(): void;
	    /**
	     * should be called right before the call to away3d-render.
	     */
	    update(timeDelta: number): void;
	    getPotentialChildInstance(id: number): DisplayObject;
	    addScriptForExecution(value: ExecuteScriptCommand): void;
	    activateChild(id: number): void;
	    deactivateChild(id: number): void;
	    /**
	     * Stop playback of animation and hold current position
	     */
	    stop(): void;
	    clone(): DisplayObject;
	    advanceFrame(skipChildren?: boolean): void;
	    private advanceChildren();
	    logHierarchy(depth?: number): void;
	    printHierarchyName(depth: number, target: DisplayObject): void;
	    executePostConstructCommands(): boolean;
	}
	export = MovieClip;
	
}

declare module "awayjs-player/lib/events/MovieClipEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	class MovieClipEvent extends Event {
	    static NAME_CHANGED: string;
	    static CHILD_ADDED: string;
	    static CHILD_REMOVED: string;
	    displayObject: DisplayObject;
	    constructor(type: string, displayObject: DisplayObject);
	}
	export = MovieClipEvent;
	
}

declare module "awayjs-player/lib/factories/AS2SceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import AdaptedTextField = require("awayjs-player/lib/display/AdaptedTextField");
	import TimelineSceneGraphFactory = require("awayjs-player/lib/factories/TimelineSceneGraphFactory");
	import View = require("awayjs-display/lib/containers/View");
	class AS2SceneGraphFactory implements TimelineSceneGraphFactory {
	    private _view;
	    constructor(view: View);
	    createMovieClip(): MovieClip;
	    createTextField(): AdaptedTextField;
	}
	export = AS2SceneGraphFactory;
	
}

declare module "awayjs-player/lib/factories/TimelineSceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import TextField = require("awayjs-display/lib/entities/TextField");
	interface TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	    createTextField(): TextField;
	}
	export = TimelineSceneGraphFactory;
	
}

declare module "awayjs-player/lib/partition/Entity2DNode" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	/**
	 * @class away.partition.EntityNode
	 */
	class Entity2DNode extends EntityNode {
	    static id: string;
	    /**
	     * @inheritDoc
	     */
	    isIntersectingRay(rayPosition: Vector3D, rayDirection: Vector3D): boolean;
	    updateBounds(): void;
	}
	export = Entity2DNode;
	
}

declare module "awayjs-player/lib/partition/Partition2D" {
	import DisplayObject = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import Partition = require("awayjs-display/lib/partition/Partition");
	class Partition2D extends Partition {
	    private _entity2DNodePool;
	    constructor(root: DisplayObject);
	    /**
	     * @internal
	     */
	    _iRegisterEntity(entity: IEntity): void;
	    /**
	     * @internal
	     */
	    _iUnregisterEntity(entity: IEntity): void;
	}
	export = Partition2D;
	
}

declare module "awayjs-player/lib/partition/Partition2DNode" {
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	class Partition2DNode extends NodeBase {
	    private _root;
	    private _maskConfigID;
	    private _index;
	    constructor(root: DisplayObject);
	    acceptTraverser(traverser: CollectorBase): void;
	    traverseSceneGraph(displayObject: any, traverser: CollectorBase, maskID?: number, appliedMasks?: DisplayObject[]): void;
	    private traverseChildren(container, traverser, maskID, appliedMasks);
	    iAddNode(node: NodeBase): void;
	}
	export = Partition2DNode;
	
}

declare module "awayjs-player/lib/renderer/Mask" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import RenderableBase = require("awayjs-renderergl/lib/renderables/RenderableBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import Renderer2D = require("awayjs-player/lib/renderer/Renderer2D");
	class Mask {
	    private _stage;
	    private _renderer;
	    private _registeredMasks;
	    constructor(stage: Stage, renderer: Renderer2D);
	    registerMask(obj: RenderableBase): void;
	    renderMasks(masks: DisplayObject[]): void;
	    reset(): void;
	    private _draw(renderable);
	}
	export = Mask;
	
}

declare module "awayjs-player/lib/renderer/RenderableSort2D" {
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IEntitySorter = require("awayjs-display/lib/sort/IEntitySorter");
	/**
	 * @class away.sort.RenderableMergeSort
	 */
	class RenderableMergeSort implements IEntitySorter {
	    sortBlendedRenderables(head: IRenderable): IRenderable;
	    sortOpaqueRenderables(head: IRenderable): IRenderable;
	}
	export = RenderableMergeSort;
	
}

declare module "awayjs-player/lib/renderer/Renderer2D" {
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
	import RenderableBase = require("awayjs-renderergl/lib/renderables/RenderableBase");
	class Renderer2D extends DefaultRenderer {
	    private _mask;
	    constructor(stage?: Stage);
	    drawRenderables(renderable: RenderableBase, entityCollector: CollectorBase): void;
	    applyRenderable(renderable: RenderableBase): void;
	}
	export = Renderer2D;
	
}

declare module "awayjs-player/lib/timeline/Timeline" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	class Timeline {
	    private _keyframe_indices;
	    private _keyframe_firstframes;
	    private _keyframe_constructframes;
	    private _keyframe_durations;
	    _labels: Object;
	    _framescripts: Object;
	    private _frame_command_indices;
	    private _frame_recipe;
	    private _command_index_stream;
	    private _command_length_stream;
	    private _add_child_stream;
	    private _remove_child_stream;
	    private _update_child_stream;
	    private _update_child_props_length_stream;
	    private _update_child_props_indices_stream;
	    private _property_index_stream;
	    private _property_type_stream;
	    private _properties_stream_int;
	    private _properties_stream_f32_mtx_all;
	    private _properties_stream_f32_mtx_scale_rot;
	    private _properties_stream_f32_mtx_pos;
	    private _properties_stream_f32_ct;
	    private _properties_stream_strings;
	    private _potentialPrototypes;
	    numKeyFrames: number;
	    constructor();
	    init(): void;
	    keyframe_durations: ArrayBufferView;
	    frame_command_indices: ArrayBufferView;
	    frame_recipe: ArrayBufferView;
	    command_index_stream: ArrayBufferView;
	    command_length_stream: ArrayBufferView;
	    add_child_stream: ArrayBufferView;
	    remove_child_stream: ArrayBufferView;
	    update_child_stream: ArrayBufferView;
	    update_child_props_indices_stream: ArrayBufferView;
	    update_child_props_length_stream: ArrayBufferView;
	    property_index_stream: ArrayBufferView;
	    property_type_stream: ArrayBufferView;
	    properties_stream_f32_mtx_all: Float32Array;
	    properties_stream_f32_mtx_scale_rot: Float32Array;
	    properties_stream_f32_mtx_pos: Float32Array;
	    properties_stream_f32_ct: Float32Array;
	    properties_stream_int: ArrayBufferView;
	    properties_stream_strings: Array<string>;
	    keyframe_indices: Array<number>;
	    keyframe_firstframes: Array<number>;
	    keyframe_constructframes: Array<number>;
	    numFrames(): number;
	    getPotentialChildPrototype(id: number): DisplayObject;
	    getKeyframeIndexForFrameIndex(frame_index: number): number;
	    getPotentialChilds(): Array<DisplayObject>;
	    getPotentialChildInstance(id: number): DisplayObject;
	    registerPotentialChild(prototype: DisplayObject): void;
	    executeScriptIfAvailable(target_mc: MovieClip, frameIndex: number): void;
	    jumpToLabel(target_mc: MovieClip, label: string): void;
	    gotoFrame(target_mc: MovieClip, value: number): void;
	    constructNextFrame(target_mc: MovieClip): void;
	    remove_childs(sourceMovieClip: MovieClip, start_index: number, len: number): void;
	    remove_childs_continous(sourceMovieClip: MovieClip, start_index: number, len: number): void;
	    add_childs(sourceMovieClip: MovieClip, start_index: number, len: number): void;
	    add_childs_continous(sourceMovieClip: MovieClip, start_index: number, len: number): void;
	    update_childs(sourceMovieClip: MovieClip, start_index: number, len: number): void;
	}
	export = Timeline;
	
}

declare module "awayjs-player/lib/timeline/commands/ButtonListenerHolder" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class ButtonListenerHolder {
	    private _target_mc;
	    private _onMouseOver;
	    private _onMouseOut;
	    private _onMouseDown;
	    private _onMouseUp;
	    private _onRemovedFromScene;
	    constructor(target: MovieClip);
	}
	export = ButtonListenerHolder;
	
}

declare module "awayjs-player/lib/timeline/commands/ExecuteScriptCommand" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class ExecuteScriptCommand {
	    private _script;
	    private _translatedScript;
	    constructor(script: Function);
	    constructor(script: string);
	    execute(sourceMovieClip: MovieClip): void;
	    private regexIndexOf(str, regex, startpos);
	    translateScript(classReplacements: any): void;
	}
	export = ExecuteScriptCommand;
	
}

