declare module "awayjs-player/lib/adapters/MovieClipAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	interface MovieClipAdapter {
	    adaptee: DisplayObjectContainer;
	    clone(newAdaptee: DisplayObjectContainer): MovieClipAdapter;
	}
	export = MovieClipAdapter;
	
}
declare module "awayjs-player/lib/timeline/commands/FrameCommand" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	/**
	 * IMPORTANT: FrameCommands are NOT allowed to store references to actual objects, only childIDs. This prevents complex
	 * cross-command object reference management when instancing. It also allows commands and frames instances to be shared
	 * across MovieClip instances.
	 */
	interface FrameCommand {
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = FrameCommand;
	
}
declare module "awayjs-player/lib/timeline/TimelineKeyFrame" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
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
declare module "awayjs-player/lib/display/MovieClip" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
	import TimelineKeyFrame = require("awayjs-player/lib/timeline/TimelineKeyFrame");
	class MovieClip extends DisplayObjectContainer {
	    private _keyFrames;
	    private _time;
	    private _currentFrameIndex;
	    private _fps;
	    private _isPlaying;
	    private _loop;
	    private _totalFrames;
	    private _prototype;
	    private _adapter;
	    private _potentialChildren;
	    constructor();
	    adapter: MovieClipAdapter;
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
	    /**
	     * Add a new TimelineFrame.
	     */
	    addFrame(newFrame: TimelineKeyFrame): void;
	    /**
	     * Returns the child ID for this MovieClip
	     */
	    getPotentialChild(id: number): DisplayObject;
	    /**
	     * Returns the child ID for this MovieClip
	     */
	    registerPotentialChild(prototype: DisplayObject): number;
	    activateChild(id: number): void;
	    deactivateChild(id: number): void;
	    /**
	     * This is called inside the TimelineFrame.execute() function.
	     */
	    private executeFrameScript(frameScript);
	    /**
	     * Stop playback of animation and hold current position
	     */
	    stop(): void;
	    clone(): DisplayObject;
	    private resetPlayHead();
	    private advanceFrame(skipFrames?);
	    private updateKeyFrames(skipFrames);
	    logHierarchy(depth?: number): void;
	    printHierarchyName(depth: number, target: DisplayObject): void;
	}
	export = MovieClip;
	
}
declare module "awayjs-player/lib/adapters/AS2SymbolAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
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
declare module "awayjs-player/lib/adapters/AS2MovieClipAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
	class AS2MovieClipAdapter extends AS2SymbolAdapter implements MovieClipAdapter {
	    private currentFrameIndex;
	    constructor(adaptee: DisplayObjectContainer);
	    clone(newAdaptee: DisplayObjectContainer): MovieClipAdapter;
	}
	export = AS2MovieClipAdapter;
	
}
declare module "awayjs-player/lib/factories/TimelineSceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	interface TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	}
	export = TimelineSceneGraphFactory;
	
}
declare module "awayjs-player/lib/factories/AS2SceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import TimelineSceneGraphFactory = require("awayjs-player/lib/factories/TimelineSceneGraphFactory");
	class AS2SceneGraphFactory implements TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	}
	export = AS2SceneGraphFactory;
	
}
declare module "awayjs-player/lib/partition/Partition2DNode" {
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	class Partition2DNode extends NodeBase {
	    private _root;
	    constructor(root: DisplayObject);
	    acceptTraverser(traverser: CollectorBase): void;
	    traverseSceneGraph(displayObject: any, traverser: CollectorBase): void;
	    private traverseChildren(container, traverser);
	    iAddNode(node: NodeBase): void;
	}
	export = Partition2DNode;
	
}
declare module "awayjs-player/lib/partition/Partition2D" {
	import DisplayObject = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Partition = require("awayjs-display/lib/partition/Partition");
	class Partition2D extends Partition {
	    constructor(root: DisplayObject);
	}
	export = Partition2D;
	
}
declare module "awayjs-player/lib/timeline/InterpolationObject" {
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
declare module "awayjs-player/lib/timeline/commands/AddChildCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class AddChildCommand implements FrameCommand {
	    private _childID;
	    constructor(childID: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = AddChildCommand;
	
}
declare module "awayjs-player/lib/timeline/commands/ApplyAS2DepthsCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class ApplyAS2DepthsCommand implements FrameCommand {
	    constructor();
	    execute(sourceMovieClip: MovieClip, time: number): void;
	    private sortChildrenByDepth(a, b);
	}
	export = ApplyAS2DepthsCommand;
	
}
declare module "awayjs-player/lib/timeline/commands/RemoveChildCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class RemoveChildCommand implements FrameCommand {
	    private _childID;
	    constructor(childID: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = RemoveChildCommand;
	
}
declare module "awayjs-player/lib/timeline/commands/UpdatePropertyCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class UpdatePropertyCommand implements FrameCommand {
	    private _targetID;
	    private _propertyName;
	    private _value;
	    constructor(targetID: number, propertyName: string, value: any);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = UpdatePropertyCommand;
	
}