import IAsset = require("awayjs-core/lib/library/IAsset");
import AssetType = require("awayjs-core/lib/library/AssetType");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
import TimelineKeyFrame = require("awayjs-player/lib/fl/timeline/TimelineKeyFrame");

class MovieClip extends DisplayObjectContainer
{
    private _keyFrames:Array<TimelineKeyFrame>;
    private _time:number;// the current time inside the animation
    private _currentFrameIndex:number;// the current frame
    private _fps:number;// we use ms internally, but have fps, so user can set time by frame
    private _isPlaying:boolean;// false if paused or stopped
    private _loop:boolean = true;
    private _totalFrames:number = 0;

    // TODO: Figure out what these flags mean
    private _df:boolean;    // dirty flag?
    private _Td:boolean;

    private _adapter:MovieClipAdapter;

    constructor()
    {
        super();
        this._keyFrames = new Array<TimelineKeyFrame>();
        this._currentFrameIndex = 0;
        this._isPlaying = false;
        this._fps = 25;
        this._time = 0;
        this._totalFrames = 0;
        this._df = false;
        this._Td = false;
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
        return AssetType.TIMELINE;
    }

    public init()
    {
        // make sure first frame is reached in first test
        this._currentFrameIndex = -1;

        this._isPlaying = true;
        for (var i = this.numChildren - 1; i >= 0; --i) {
            var child = this.getChildAt(i);
            if (child instanceof MovieClip) {
                (<MovieClip>child).init();
            }
        }

        this.update(0);
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
        var endFrame = (newFrame.startTime + newFrame.duration) / 1000 * this._fps;
        if (this._totalFrames < endFrame)
            this._totalFrames = endFrame;
        this._keyFrames.push(newFrame);
    }

    /**
     * This is called inside the TimelineFrame.execute() function.
     */
    public executeFrameScript(frameScript:string)
    {

    }

    /**
     * Stop playback of animation and hold current position
     */
    public stop()
    {
        this._isPlaying = false;// no need to call any other stuff
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
        if (advance && this._currentFrameIndex == this._totalFrames - 1 && !this._loop) {
            advance = false;
        }
        if (advance && this._currentFrameIndex <= 0 && this._totalFrames == 1) {
            this._currentFrameIndex = 0;
            advance = false;
        }

        if (advance) {
            if (++this._currentFrameIndex == this._totalFrames)
                this.resetPlayHead();
        }

        this.updateKeyFrames(skipFrames);

        // advance children
        if (!skipFrames) {
            var len = this.numChildren;

            for (i = 0; i < len; i++) {
                var child = this.getChildAt(i);
                if (child instanceof MovieClip) {
                    (<MovieClip>child).advanceFrame(skipFrames);
                }
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
}
export = MovieClip;
