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
	    apply(thisObj: any, time: number): void;
	}
	export = CommandPropsBase;
	
}
declare module "awayjs-player/lib/fl/timeline/commands/FrameCommand" {
	import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
	/**
	 * FrameCommand associates a TimeLineobject with CommandProps.
	 * CommandProps can be of different class, depending on the type of Asset that the TimeLineObject references to.
	 */
	class FrameCommand {
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = FrameCommand;
	
}
declare module "awayjs-player/lib/fl/timeline/TimelineKeyFrame" {
	import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
	import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
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
	class TimelineKeyFrame {
	    private _startTime;
	    private _endTime;
	    private _duration;
	    private _frameCommands;
	    private _frameConstructCommands;
	    private _frameDestructCommands;
	    private _isActive;
	    constructor();
	    addCommand(command: FrameCommand): void;
	    addConstructCommand(command: FrameCommand): void;
	    addDestructCommand(command: FrameCommand): void;
	    startTime: number;
	    duration: number;
	    endTime: number;
	    isActive: boolean;
	    setFrameTime(startTime: number, duration: number): void;
	    activate(sourceMovieClip: MovieClip): void;
	    deactivate(sourceMovieClip: MovieClip): void;
	    update(sourceMovieClip: MovieClip, time: number): void;
	}
	export = TimelineKeyFrame;
	
}
declare module "awayjs-player/lib/fl/display/MovieClip" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
	import TimelineKeyFrame = require("awayjs-player/lib/fl/timeline/TimelineKeyFrame");
	class MovieClip extends DisplayObjectContainer {
	    private _keyFrames;
	    private _time;
	    private _currentFrameIndex;
	    private _fps;
	    private _isPlaying;
	    private _loop;
	    private _totalFrames;
	    private _df;
	    private _Td;
	    private _adapter;
	    constructor();
	    adapter: MovieClipAdapter;
	    fps: number;
	    assetType: string;
	    init(): void;
	    /**
	     * Starts playback of animation from current position
	     */
	    play(): void;
	    /**
	     * should be called right before the call to away3d-render.
	     */
	    update(timeDelta: number): void;
	    /**
	     * Add a new TimelineFrame.
	     */
	    addFrame(newFrame: TimelineKeyFrame): void;
	    /**
	     * This is called inside the TimelineFrame.execute() function.
	     */
	    executeFrameScript(frameScript: string): void;
	    /**
	     * Stop playback of animation and hold current position
	     */
	    stop(): void;
	    private resetPlayHead();
	    private advanceFrame(skipFrames?);
	    private updateKeyFrames(skipFrames);
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
	    apply(thisObj: DisplayObjectContainer, time: number): void;
	}
	export = CommandPropsDisplayObject;
	
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
declare module "awayjs-player/lib/fl/timeline/commands/AddChildCommand" {
	import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	class AddChildCommand extends FrameCommand {
	    private _id;
	    private _child;
	    constructor(child: DisplayObjectContainer, id: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = AddChildCommand;
	
}
declare module "awayjs-player/lib/fl/timeline/commands/RemoveChildCommand" {
	import FrameCommand = require("awayjs-player/lib/fl/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	class RemoveChildCommand extends FrameCommand {
	    private _id;
	    private _child;
	    constructor(child: DisplayObjectContainer, id: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = RemoveChildCommand;
	
}