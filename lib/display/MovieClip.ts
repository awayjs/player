import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
import IAsset = require("awayjs-core/lib/library/IAsset");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
import MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
import TimelineKeyFrame = require("awayjs-player/lib/timeline/TimelineKeyFrame");

class MovieClip extends DisplayObjectContainer
{
	public static assetType:string = "[asset MovieClip]";

    private _keyFrames:Array<TimelineKeyFrame>;
    private _time:number;// the current time inside the animation
    private _currentFrameIndex:number;// the current frame
    private _fps:number;// we use ms internally, but have fps, so user can set time by frame
    private _isPlaying:boolean;// false if paused or stopped
    private _loop:boolean = true;
    private _numFrames:number;
    // not sure if needed
    private _prototype:MovieClip;

    private _adapter:MovieClipAdapter;

    private _potentialChildren:Array<DisplayObject>;

    constructor()
    {
        super();
        this._prototype = this;
        this._keyFrames = new Array<TimelineKeyFrame>();
        this._potentialChildren = new Array<DisplayObject>();
        this._currentFrameIndex = -1;
        this._isPlaying = true; // auto-play
        this._fps = 25;
        this._time = 0;
        this._numFrames = 0;
    }

    public get numFrames() : number
    {
        return this._numFrames;
    }

    public jumpToLabel(label:string) : void
    {
        var index = -1;
        /*var len = this._keyFrames.length;

        for (var i = 0; i < len; ++i) {
            if (this._keyFrames[i].label) {
                index = Math.round(this._keyFrames[i].startTime * this._fps);
                break;
            }
        }*/
        console.log("Implement labels")

        if (index !== -1)
            this.currentFrameIndex = index;
    }

    public get currentFrameIndex() : number
    {
        return this._currentFrameIndex;
    }

    public set currentFrameIndex(value : number)
    {
        if (value < 0)
            value = 0;
        else if (value >= this._numFrames)
            value = this._numFrames - 1;

        this._time = 0;

        var isPlaying = this._isPlaying;
        this._isPlaying = true;

        while (this._currentFrameIndex != value)
            // skip frames
            this.advanceFrame(true);

        this._isPlaying = isPlaying;
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
        }
    }

    /**
     * Add a new TimelineFrame.
     */
    public addFrame(newFrame:TimelineKeyFrame)
    {
        var endFrame = Math.ceil((newFrame.startTime + newFrame.duration) / 1000 * this._fps);
        if (this._numFrames < endFrame)
            this._numFrames = endFrame;
        this._keyFrames.push(newFrame);
    }

    /**
     * Returns the child ID for this MovieClip
     */
    public getPotentialChild(id:number) : DisplayObject
    {
        return this._potentialChildren[id];
    }

    /**
     * Returns the child ID for this MovieClip
     */
    public registerPotentialChild(prototype:DisplayObject) : number
    {
        var id = this._potentialChildren.length;
        this._potentialChildren[id] = prototype.clone();
        return id;
    }

    public activateChild(id:number)
    {
        this.addChild(this._potentialChildren[id]);
    }

    public deactivateChild(id:number)
    {
        this.removeChild(this._potentialChildren[id]);
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
        this._isPlaying = false;// no need to call any other stuff
    }

    public clone() : DisplayObject
    {
        var clone:MovieClip = new MovieClip();

        if (this._adapter) clone.adapter = this._adapter.clone(clone);
        clone._prototype = this._prototype;
        clone._keyFrames = this._keyFrames;

        for (var i = 0; i < this._potentialChildren.length; ++i) {
            clone._potentialChildren[i] = this._potentialChildren[i].clone();
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

        for (var i = 0; i < this._keyFrames.length; ++i) {
            var keyFrame = this._keyFrames[i];

            // deactivate any currently active keyframes first
            if (keyFrame.isActive)
                keyFrame.deactivate(this);
        }
    }

    private advanceFrame(skipFrames:boolean = false)
    {
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

        this.updateKeyFrames(skipFrames);

        // advance children, last child first
        if (!skipFrames) {
            for (i = this.numChildren - 1; i >= 0; --i) {
                var child = this.getChildAt(i);
                if (child instanceof MovieClip)
                    (<MovieClip>child).advanceFrame(skipFrames);
            }

            // TODO: Not sure what deferred children are. Check w/ Claus.
            /*for (i = 0; i < this.childrenDeferred.length; i++) {
             if (this.childrenDeferred[i].displayObject instanceof MovieClip) {
             (<MovieClip>this.childrenDeferred[i].displayObject).advanceFrame(a);
             }
             }*/
        }
    }

    private updateKeyFrames(skipFrames:boolean)
    {
        // TODO: Switch to frames over time (so we can check with ==, instead of > and active)

        var time = this._currentFrameIndex / this._fps * 1000;

        for (var i = 0; i < this._keyFrames.length; ++i) {
            var keyFrame = this._keyFrames[i];

            if (time >= keyFrame.startTime && time <= keyFrame.endTime && !keyFrame.isActive)
                keyFrame.activate(this);

            if (time >= keyFrame.endTime && keyFrame.isActive)
                keyFrame.deactivate(this);

            if (!skipFrames && keyFrame.isActive)
                keyFrame.update(this, this._time);
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
}
export = MovieClip;
