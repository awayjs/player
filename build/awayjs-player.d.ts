declare module "awayjs-player/lib/fl/adapters/MovieClipAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	interface MovieClipAdapter {
	    adaptee: DisplayObjectContainer;
	}
	export = MovieClipAdapter;
	
}
declare module "awayjs-player/lib/fl/timeline/CommandPropsBase" {
	/**
	 * BaseClass for CommandProperties. Should not be instantiated directly.
	 */
	class CommandPropsBase {
	    constructor();
	    deactivate(thisObj: any): void;
	    apply(thisObj: any, time: number, speed: number): void;
	}
	export = CommandPropsBase;
	
}
declare module "awayjs-player/lib/fl/timeline/TimelineObject" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import CommandPropsBase = require("awayjs-player/lib/fl/timeline/CommandPropsBase");
	/**
	 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
	 *  A TimeLineObject basically consists of an objID, and an IAsset.
	 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets
	
	 */
	class TimelineObject {
	    private _asset;
	    private _objID;
	    private _deactivateCommandProps;
	    private _isActive;
	    private _is2D;
	    constructor(asset: IAsset, objID: number, deactiveCommandProps: CommandPropsBase);
	    deactivateCommandProps: CommandPropsBase;
	    deactivate(): void;
	    asset: IAsset;
	    objID: number;
	    is2D: boolean;
	    isActive: boolean;
	}
	export = TimelineObject;
	
}
declare module "awayjs-player/lib/fl/timeline/FrameCommand" {
	import CommandPropsBase = require("awayjs-player/lib/fl/timeline/CommandPropsBase");
	import TimeLineObject = require("awayjs-player/lib/fl/timeline/TimelineObject");
	/**
	 * FrameCommand associates a TimeLineobject with CommandProps.
	 * CommandProps can be of different class, depending on the type of Asset that the TimeLineObject references to.
	 */
	class FrameCommand {
	    private _commandProps;
	    private _tlObj;
	    private _activate;
	    constructor(tlObj: TimeLineObject);
	    activateObj: boolean;
	    commandProps: CommandPropsBase;
	    tlObj: TimeLineObject;
	    execute(time: number, speed: number): void;
	}
	export = FrameCommand;
	
}
declare module "awayjs-player/lib/fl/timeline/TimelineFrame" {
	import FrameCommand = require("awayjs-player/lib/fl/timeline/FrameCommand");
	/**
	 * TimelineFrame holds 3 list of FrameCommands
	 *  - list1 _frameCommands should be  executed when playing the timeline (previous Frame was played)
	 *  - list2 _frameCommandsReverse should be executed when playing the timeline reversed (previous Frame was played)
	 *  - list3 _frameCommandsInit should be executed when jumping to a frame, so we need to fully init the frame
	 *
	 *  Addionial TimelineFrame properties are:
	 *  - script - can be executed, after the frameCommands have been executed
	 *  - list of FrameLabels, and list of corresponding labelTypes
	 *  - duration-value (1 frame is not necessary 1 frame long)
	 *  - startTime and endTime are needed internally when deciding what frame to display
	 */
	class TimelineFrame {
	    private _script;
	    private _startTime;
	    private _endTime;
	    private _duration;
	    private _movieClip;
	    private _frameCommands;
	    private _frameCommandsReverse;
	    private _frameCommandsInit;
	    private _framelabels;
	    private _labelTypes;
	    private _isDirty;
	    constructor();
	    addCommand(newCommand: FrameCommand): void;
	    addCommandReverse(newCommand: FrameCommand): void;
	    addCommandInit(newCommand: FrameCommand): void;
	    addLabel(label: string, type: number): void;
	    framelabels: Array<string>;
	    labelTypes: Array<number>;
	    script: string;
	    addToScript(newscript: string): void;
	    isDirty: boolean;
	    makeDirty(): void;
	    startTime: number;
	    duration: number;
	    endTime: number;
	    setFrameTime(startTime: number, duration: number): void;
	    /**
	     * executes the set of Commands for this Frame.
	     * Each Frame has 3 sets of commands:
	     *  0 = init frame commands = the frame must be init as if previous frame was not played
	     *  1 = play frame commands = the previous frame was played
	     *  2 = playReverse Commands = the next frame was played
	     */
	    executeCommands(commandSet: number, time: number, speed: number): void;
	}
	export = TimelineFrame;
	
}
declare module "awayjs-player/lib/fl/display/MovieClip" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
	import TimelineObject = require("awayjs-player/lib/fl/timeline/TimelineObject");
	import TimelineFrame = require("awayjs-player/lib/fl/timeline/TimelineFrame");
	class MovieClip extends DisplayObjectContainer {
	    private _timelineObjs;
	    private _frames;
	    private _time;
	    private _currentFrame;
	    private _speed;
	    private _fps;
	    private _isplaying;
	    private _isInit;
	    private _playMode;
	    private _duration;
	    private _adapter;
	    constructor();
	    adapter: MovieClipAdapter;
	    speed: number;
	    fps: number;
	    assetType: string;
	    /**
	     * should be called right before the call to away3d-render.
	     */
	    update(timeDelta: number, jumpingToFrame?: boolean): void;
	    /**
	     * Add a new TimelineFrame.
	     */
	    addFrame(newFrame: TimelineFrame): void;
	    duration: number;
	    /**
	     * This is called inside the TimelineFrame.execute() function.
	     */
	    executeFrameScript(frameScript: string): void;
	    /**
	     * Starts playback of animation from current position
	     */
	    start(): void;
	    /**
	     * Stop playback of animation and hold current position
	     */
	    stop(): void;
	    /**
	     * Classic gotoAndPlay like as3 api - set frame by frame-number.
	     */
	    gotoAndPlay(frameNumber: number): void;
	    /**
	     * Classic gotoAndStop as3 api - set frame by frame-number.
	     */
	    gotoAndStop(frameNumber: number): void;
	    /**
	     * gotoAndPlay - set frame by frame-label.
	     */
	    gotoAndPlayLabel(frameLabel: string): void;
	    /**
	     * gotoAndStop - set frame by frame-label.
	     */
	    gotoAndStopLabel(frameLabel: string): void;
	    /**
	     * gotoAndPlay - set time in ms.
	     */
	    gotoAndPlayTime(time: number): void;
	    /**
	     * gotoAndStop - set time in ms.
	     */
	    gotoAndStopTime(time: number): void;
	    addTimelineObject(newTlObj: TimelineObject, isDisplayObj?: boolean): void;
	    getTimelineObjectByID(objID: number): TimelineObject;
	    getObjectByInstanceName(instanceName: string): IAsset;
	}
	export = MovieClip;
	
}
declare module "awayjs-player/lib/fl/adapters/AS2SymbolAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import AS2MovieClipAdapter = require("awayjs-player/lib/fl/adapters/AS2MovieClipAdapter");
	class AS2SymbolAdapter {
	    private _adaptee;
	    constructor(adaptee: DisplayObjectContainer);
	    adaptee: DisplayObjectContainer;
	    _rotation: number;
	    _x: number;
	    _y: number;
	    _xscale: number;
	    _yscale: number;
	    _parent: AS2MovieClipAdapter;
	    getDepth(): number;
	}
	export = AS2SymbolAdapter;
	
}
declare module "awayjs-player/lib/fl/adapters/AS2MovieClipAdapter" {
	import AS2SymbolAdapter = require("awayjs-player/lib/fl/adapters/AS2SymbolAdapter");
	import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	class AS2MovieClipAdapter extends AS2SymbolAdapter implements MovieClipAdapter {
	    private currentFrameIndex;
	    constructor(adaptee: DisplayObjectContainer);
	}
	export = AS2MovieClipAdapter;
	
}
declare module "awayjs-player/lib/fl/factories/TimelineSceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
	interface TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	}
	export = TimelineSceneGraphFactory;
	
}
declare module "awayjs-player/lib/fl/factories/AS2SceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
	import TimelineSceneGraphFactory = require("awayjs-player/lib/fl/factories/TimelineSceneGraphFactory");
	class AS2SceneGraphFactory implements TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	}
	export = AS2SceneGraphFactory;
	
}
declare module "awayjs-player/lib/fl/timeline/InterpolationObject" {
	/**
	 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
	 *  A TimeLineObject basically consists of an objID, and an IAsset.
	 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets
	
	 */
	class InterpolationObject {
	    private _type;
	    private _startValue;
	    private _startTime;
	    private _endValue;
	    private _endTime;
	    private _duration;
	    constructor(type: number, startValue: any, endValue: any, startTime: number, endTime: number);
	    getState(time: number, speed: number): any;
	}
	export = InterpolationObject;
	
}
declare module "awayjs-player/lib/fl/timeline/CommandPropsDisplayObject" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import CommandPropsBase = require("awayjs-player/lib/fl/timeline/CommandPropsBase");
	import InterpolationObject = require("awayjs-player/lib/fl/timeline/InterpolationObject");
	class CommandPropsDisplayObject extends CommandPropsBase {
	    private _doDisplaymatrix;
	    private _displayMatrix;
	    private _displayMatrixInterpolate;
	    private _doColorTransform;
	    private _colorTransform;
	    private _colorTransformInterpolate;
	    private _doDepth;
	    private _depth;
	    private _doFilters;
	    private _filter;
	    private _doBlendMode;
	    private _blendMode;
	    private _doDepthClip;
	    private _depthClip;
	    private _doInstanceName;
	    private _instanceName;
	    constructor();
	    setBlendMode(blendMode: number): void;
	    setClipDepth(clipDepth: number): void;
	    setFilter(filter: any): void;
	    setDepth(depth: number): void;
	    setDisplaymatrixInterpolate(interpolate: InterpolationObject): void;
	    setDisplaymatrix(displayMatrix: Matrix3D): void;
	    setColorTransform(colorTransform: ColorTransform): void;
	    setColorTranformInterpolate(interpolate: InterpolationObject): void;
	    setInstancename(instanceName: string): void;
	    deactivate(thisObj: DisplayObjectContainer): void;
	    apply(thisObj: DisplayObjectContainer, time: number, speed: number): void;
	}
	export = CommandPropsDisplayObject;
	
}