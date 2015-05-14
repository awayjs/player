import Event = require("awayjs-core/lib/events/Event");
import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
import IAsset = require("awayjs-core/lib/library/IAsset");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import Mesh = require("awayjs-display/lib/entities/Mesh");
import Billboard = require("awayjs-display/lib/entities/Billboard");

import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
import MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
import TimelineKeyFrame = require("awayjs-player/lib/timeline/TimelineKeyFrame");

class MovieClip extends DisplayObjectContainer
{
	public static assetType:string = "[asset MovieClip]";

    private static INACTIVE:number = 0;
    private static CONSTRUCTED:number = 1;
    private static POST_CONSTRUCTED:number = 2;

    private _keyFrames:Array<TimelineKeyFrame>;
    private _keyFrameActive:Array<number>;
    private _time:number;// the current time inside the animation
    private _currentFrameIndex:number;// the current frame
    private _jumpIndex:number;// the current frame
    private _currentKeyFrameIndex:number;// the current index of the current active frame
    private _fps:number;// we use ms internally, but have fps, so user can set time by frame
    private _isPlaying:boolean;// false if paused or stopped
    private _loop:boolean = true;
    private _numFrames:number;
    // not sure if needed
    private _prototype:MovieClip;
    private _enterFrame:MovieClipEvent;

    private _adapter:MovieClipAdapter;

    private _potentialPrototypes:Array<DisplayObject>;
    private _potentialInstances:Array<DisplayObject>;

    constructor()
    {
        super();
        this._prototype = this;
        this._keyFrames = [];
        this._keyFrameActive = [];
        this._potentialPrototypes = [];
        this._potentialInstances = [];
        this._currentFrameIndex = -1;
        this._jumpIndex = -1;
        this._currentKeyFrameIndex = -1;
        this._isPlaying = true; // auto-play
        this._fps = 30;
        this._time = 0;
        this._numFrames = 0;
        this._enterFrame = new MovieClipEvent(MovieClipEvent.ENTER_FRAME, this);
        this.inheritColorTransform = true;
    }

    public get numFrames() : number
    {
        return this._numFrames;
    }

    public jumpToLabel(label:string) : void
    {
        var index = -1;
        var len = this._keyFrames.length;

        for (var i = 0; i < len; ++i) {
            if (this._keyFrames[i].label === label) {
                index = this._keyFrames[i].firstFrame;
                break;
            }
        }

        if (index !== -1) {
            //console.log("Jumping to label " + label + "(frame " + index + ")");
            this.currentFrameIndex = index;
        }
    }

    public get currentFrameIndex() : number
    {
        return this._jumpIndex >= 0? this._jumpIndex : this._currentFrameIndex;
    }

    public set currentFrameIndex(value : number)
    {
        value = Math.floor(value);

        if (value < 0)
            value = 0;
        else if (value >= this._numFrames)
            value = this._numFrames - 1;

        this._jumpIndex = value;
    }

    // adapter is used to provide MovieClip to scripts taken from different platforms
    // TODO: Perhaps adapters should be created dynamically whenever needed, rather than storing them
    public get adapter():MovieClipAdapter
    {
        return this._adapter;
    }

    // setter typically managed by factor
    public set adapter(value:MovieClipAdapter)
    {
        this._adapter = value;
    }

    public get name() : string
    {
        return this._pName;
    }

    public set name(value:string)
    {
        if (this._pName !== value) {
            this._pName = value;
            this.dispatchEvent(new MovieClipEvent(MovieClipEvent.NAME_CHANGED, this));
        }
    }

    public addChild(child:DisplayObject):DisplayObject
    {
        child.inheritColorTransform = true;
        super.addChild(child);
        this.dispatchEvent(new MovieClipEvent(MovieClipEvent.CHILD_ADDED, child));
        return child;
    }

    public removeChild(child:DisplayObject):DisplayObject
    {
        super.removeChild(child);
        this.dispatchEvent(new MovieClipEvent(MovieClipEvent.CHILD_REMOVED, child));
        return child;
    }

    public get fps():number
    {
        return this._fps;
    }

    public set fps(newFps:number)
    {
        this._fps = newFps;
        var len = this._potentialPrototypes.length;
        for (var i = 0; i < len; ++i) {
            if (typeof this._potentialPrototypes[i] === "MovieClip")
                (<MovieClip>this._potentialPrototypes[i]).fps = this._fps;
        }
        var len = this._potentialInstances.length;
        for (var i = 0; i < len; ++i) {
            if (this._potentialInstances[i] &&  typeof this._potentialInstances[i] === "MovieClip")
                (<MovieClip>this._potentialInstances[i]).fps = this._fps;
        }
    }

    public get assetType():string
    {
        return MovieClip.assetType;
    }

    /**
     * Starts playback of animation from current position
     */
    public play()
    {
        this._isPlaying = true;
    }

    /**
     * should be called right before the call to away3d-render.
     */
    public update(timeDelta:number)
    {
        //this.logHierarchy();
        // TODO: Implement proper elastic racetrack logic
        var frameMarker : number = 1000 / this._fps;

        // right now, just advance frame once time marker has been reached
        this._time += timeDelta;

        if (this._time > frameMarker) {
            this._time = 0;
            this.advanceFrame();
            this.advanceChildren();
            this.dispatchEvent(this._enterFrame);
            this.executePostConstructCommands();
        }
    }

    private _jumpToIndex()
    {
        var isPlaying = this._isPlaying;
        this._isPlaying = true;

        while (this._currentFrameIndex != this._jumpIndex) {
            // do not advance children, do not call post-constructs (scripts etc, only constructs are relevant)
            this.advanceFrame(true);
        }

        this._isPlaying = isPlaying;
        this._jumpIndex = -1;
    }

    /**
     * Add a new TimelineFrame.
     */
    public addFrame(newFrame:TimelineKeyFrame)
    {
        var endFrame = newFrame.lastFrame;
        if (this._numFrames < endFrame)
            this._numFrames = endFrame;
        this._keyFrames.push(newFrame);
        this._keyFrameActive.push(MovieClip.INACTIVE);
    }

    public getPotentialChildPrototype(id:number) : DisplayObject
    {
        return this._potentialPrototypes[id];
    }

    public getPotentialChildInstance(id:number) : DisplayObject
    {
        if (!this._potentialInstances[id]) {
            this._potentialInstances[id] = this._potentialPrototypes[id].clone();
        }

        return this._potentialInstances[id];
    }

    /**
     * Returns the child ID for this MovieClip
     */
    public registerPotentialChild(prototype:DisplayObject) : number
    {
        var id = this._potentialPrototypes.length;
        this._potentialPrototypes[id] = prototype;
        if (typeof this._potentialPrototypes[id] === "MovieClip")
            (<MovieClip>this._potentialPrototypes[id]).fps = this._fps;
        this._potentialInstances[id] = null;
        return id;
    }

    public activateChild(id:number)
    {
        this.addChild(this.getPotentialChildInstance(id));
    }

    public deactivateChild(id:number)
    {
        this.removeChild(this._potentialInstances[id]);
    }

    /**
     * This is called inside the TimelineFrame.execute() function.
     */
    private executeFrameScript(frameScript:string)
    {

    }

    /**
     * Stop playback of animation and hold current position
     */
    public stop()
    {
        this._isPlaying = false;
    }

    public clone() : DisplayObject
    {
        var clone:MovieClip = new MovieClip();
        var i;

        if (this._adapter) clone.adapter = this._adapter.clone(clone);
        clone._prototype = this._prototype;
        clone._keyFrames = this._keyFrames;
        clone._keyFrameActive = [];
        for (i = 0; i < this._keyFrames.length; ++i) {
            clone._keyFrameActive[i] = MovieClip.INACTIVE;
        }

        for (i = 0; i < this._potentialPrototypes.length; ++i) {
            clone._potentialPrototypes[i] = this._potentialPrototypes[i];
            clone._potentialInstances[i] = null;
        }

        clone._fps = this._fps;
        clone._loop = this._loop;
        clone._numFrames = this._numFrames;
        clone._iMaskID = this._iMaskID;
        clone._iMasks = this._iMasks? this._iMasks.concat() : null;
        clone.name = this.name;


        if (this.transform.matrix)
            clone.transform.matrix = this.transform.matrix.clone();

        clone.transform.matrix3D = this.transform.matrix3D;

        var ct = this.transform.colorTransform;
        if (ct) clone.transform.colorTransform = new ColorTransform(ct.redMultiplier, ct.greenMultiplier, ct.blueMultiplier, ct.alphaMultiplier, ct.redOffset, ct.greenOffset, ct.blueOffset, ct.alphaOffset);

        return clone;
    }

    private resetPlayHead()
    {
        this._time = 0;
        this._currentFrameIndex = 0;

        for (var i = this.numChildren - 1; i >= 0; --i)
            this.removeChildAt(i);

        /*
        for (var i = 0; i < this._keyFrames.length; ++i) {
            var keyFrame = this._keyFrames[i];

            //  deactivate any currently active keyframes first
            //  can not do it like this, because we can not keep track of active state for shared command-list
            //  either we deactivate all, or we deactivate nothing, or we make system for it
            //  if (keyFrame.isActive)
            //      keyFrame.deactivate(this);
        }
        */
    }

    private advanceFrame(skipChildren:boolean = false)
    {
        if (!skipChildren && this._jumpIndex !== -1) {
            this._jumpToIndex();
        }
        else {
            var oldFrameIndex = this._currentFrameIndex;
            var i;
            var advance = this._isPlaying;
            if (advance && this._currentFrameIndex == this._numFrames - 1 && !this._loop) {
                advance = false;
            }
            if (advance && this._currentFrameIndex <= 0 && this._numFrames == 1) {
                this._currentFrameIndex = 0;
                advance = false;
            }


            if (advance) {
                if (++this._currentFrameIndex == this._numFrames)
                    this.resetPlayHead();
            }

            if (oldFrameIndex != this._currentFrameIndex)
                this.updateKeyFrames(skipChildren);
        }
    }

    private advanceChildren()
    {
        var len = this.numChildren;
        for (var i = 0; i <  len; ++i) {
            var child = this.getChildAt(i);
            if (child instanceof MovieClip) {
                (<MovieClip>child).advanceFrame();
                (<MovieClip>child).advanceChildren();
            }
        }
    }

    private updateKeyFrames(skipFrames:boolean)
    {
        var frameIndex = this._currentFrameIndex;

        for (var i = 0; i < this._keyFrames.length; ++i) {
            var keyFrame = this._keyFrames[i];
            var isActive = this._keyFrameActive[i];
            if (frameIndex == keyFrame.firstFrame && isActive === MovieClip.INACTIVE) {
                keyFrame.construct(this);
                this._keyFrameActive[i] = MovieClip.CONSTRUCTED;
                isActive = MovieClip.CONSTRUCTED;
            }

            if (frameIndex >= keyFrame.lastFrame || frameIndex < keyFrame.firstFrame && isActive !== MovieClip.INACTIVE) {
                keyFrame.deconstruct(this);
                this._keyFrameActive[i] = MovieClip.INACTIVE;
                isActive = MovieClip.INACTIVE;
            }

            if (!skipFrames && isActive)
                keyFrame.update(this, this._currentFrameIndex);
        }
    }



// DEBUG CODE:
    logHierarchy(depth: number = 0):void
    {
        this.printHierarchyName(depth, this);

        var len = this.numChildren;
        for (var i = 0; i < len; i++) {
            var child = this.getChildAt(i);

            if (child instanceof MovieClip)
                (<MovieClip>child).logHierarchy(depth + 1);
            else
                this.printHierarchyName(depth + 1, child);
        }
    }

    printHierarchyName(depth:number, target:DisplayObject)
    {
        var str = "";
        for (var i = 0; i < depth; ++i)
            str += "--";

        str += " " + target.name;
        console.log(str);
    }

    executePostConstructCommands():void
    {
        var i;
        var time = this._currentFrameIndex;

        var len = this._keyFrames.length;
        for (i = 0; i < len; ++i) {
            if (this._keyFrameActive[i] === MovieClip.CONSTRUCTED) {
                this._keyFrames[i].postConstruct(this);
                this._keyFrameActive[i] = MovieClip.POST_CONSTRUCTED;
            }
        }

        len = this.numChildren;
        for (i = 0; i < len; ++i) {
            var child = this.getChildAt(i);
            if (child instanceof MovieClip)
                (<MovieClip>child).executePostConstructCommands();
        }
    }
}
export = MovieClip;
