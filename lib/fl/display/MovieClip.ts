import IAsset = require("awayjs-core/lib/library/IAsset");
import AssetType = require("awayjs-core/lib/library/AssetType");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");

import MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
import TimelineObject = require("awayjs-player/lib/fl/timeline/TimelineObject");
import TimelineFrame = require("awayjs-player/lib/fl/timeline/TimelineFrame");

class MovieClip extends DisplayObjectContainer
{
    // pool of available TimeLineObject-objects for this timeline.
    // Each TImeLineObject hold reference to a pre-instanced (cloned) IAsset,
    // so we do not have to do any cloning while playing.
    // If a IAsset is of a type that extends DisplayObject, it gets added as Child, with .visible=false
    // we need this list, and can not use the children-list directly,
    // because TimeLine needs to be able to control IAsset that to not extend DisplayObject.
    private _timelineObjs:Array<TimelineObject>;

    private _frames:Array<TimelineFrame>;
    private _time:number;// the current time inside the animation
    private _currentFrame:number;// the current frame
    private _speed:number;// the speed of animation. for now keep it positive, as reverse playing will need changes to the commands
    private _fps:number;// we use ms internally, but have fps, so user can set time by frame
    private _isplaying:boolean;// false if paused or stopped
    private _isInit:boolean;// false if paused or stopped
    private _playMode:number;// 0: normal, 1: loop, 2: pingpong
    private _duration:number = 0;

    private _adapter : MovieClipAdapter;

    constructor()
    {
        super();
        this._timelineObjs = new Array<TimelineObject>();
        this._frames = new Array<TimelineFrame>();
        this._currentFrame = 0;
        this._speed = 1.0;
        this._isplaying = false;
        this._fps = 25;
        this._time = 0;
        this._duration = 0;
        this._playMode = 1;
    }

    // adapter is used to provide MovieClip to scripts taken from different platforms
    // TODO: Perhaps adapters should be created dynamically whenever needed, rather than storing them
    public get adapter() : MovieClipAdapter
    {
        return this._adapter;
    }

    // setter typically managed by factor
    public set adapter(value : MovieClipAdapter)
    {
        this._adapter = value;
    }

    public get speed():number
    {
        return this._speed;
    }

    public set speed(newSpeed:number)
    {
        this._speed = newSpeed;
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

    /**
     * should be called right before the call to away3d-render.
     */
    public update(timeDelta:number, jumpingToFrame:boolean = false)
    {
        var tlo:number;
        // only update if playing, or if not init before, or if jumping to frame
        if ((this._isplaying) || (!this._isInit) || (jumpingToFrame)) {

            // multiply the timeDelta with the speed (can be negative)
            // update the this._time accordingly
            var timeDelta:number = timeDelta * this._speed;
            this._time += timeDelta;
            // take care that the _time is within bounds
            while (this._time > this._duration) {
                if (this._playMode == 0) {
                    this._time = this._duration;
                    this.stop();
                }
                else if (this._playMode == 1) {
                    this._time -= this._duration;
                }
            }
            while (this._time < 0) {
                if (this._playMode == 0) {
                    this._time = 0;
                    this.stop();
                }
                else if (this._playMode == 1) {
                    this._time += this._duration;
                }
            }


            // now we know the exact time of the animation that we want to display.
            // next we need to decide which Frame needs to be displayed. (index in Array)
            // this should always be currentFrame, or currentFrame++
            // each frame has startTime and EndTime, so we can easily decide
            var frameCnt:number = 0;
            var curFrame:TimelineFrame;
            var foundFrame:Boolean = false;
            // this while loop should only be executed 1-2 times
            while (frameCnt < this._frames.length) {
                curFrame = this._frames[this._currentFrame];
                //console.log("searchForFrame=="+this._time+" startTime= "+curFrame.startTime+" endTime = "+curFrame.endTime);

                if ((this._time >= curFrame.startTime) && (this._time <= curFrame.endTime)) {
                    foundFrame = true;
                    frameCnt = this._frames.length;
                }
                else {
                    curFrame.makeDirty();// make sure the frame gets executed next time it should show
                    if (this._speed < 0) {
                        this._currentFrame--;
                        if (this._currentFrame < 0) {
                            this._currentFrame = this._frames.length - 1;
                        }
                    }
                    else {
                        this._currentFrame++;
                        if (this._currentFrame >= this._frames.length) {
                            this._currentFrame = 0;
                        }
                    }
                }
                frameCnt++;
            }
            //console.log("foundframe="+foundFrame+" thistime= "+this._time+" frameIDX = "+this._currentFrame);

            // if foundFrame is true, curFrame is the frame to display.
            if (foundFrame) {
                //console.log("Frame dirty="+curFrame.isDirty);
                if (curFrame.isDirty) {
                    //console.log("Reset isOnStage value");
                    // reset the "isOnStage" state for all the objects

                    var commandSet:number = 1;// 1 = execute normal playback commands
                    if (this._speed < 0) {
                        commandSet = 2;//2 = execute reversed playback commands
                    }
                    // if we are jumping Frames, we need to hide all objects and fully init
                    //if(jumpingToFrame) {
                    commandSet = 0;//0 = execute full init frame commands
                    for (tlo = 0; tlo < this._timelineObjs.length; tlo++) {
                        if (this._timelineObjs[tlo].isActive) {
                            this._timelineObjs[tlo].deactivate();
                        }
                    }
                    // }
                    //todo: use the correct set of commands (for now we always use set 1)
                    curFrame.executeCommands(1, this._time, this._speed);

                    // now we have all objects on stage, we can execute the frame script for this frame
                    this.executeFrameScript(curFrame.script);

                }
                else {
                    // the frame has already been initiated.
                    // for now we do nothing
                    // later we might want to implement interpolation here
                }
            }
            this._isInit = true;
        }
        // update all the visible TimeLineObjects that are of type timeline
        for (tlo = 0; tlo < this._timelineObjs.length; tlo++) {
            if (this._timelineObjs[tlo].isActive) {
                if (this._timelineObjs[tlo].asset.assetType == AssetType.TIMELINE) {
                    (<MovieClip>this._timelineObjs[tlo].asset).update(timeDelta);
                }
            }
        }
    }


    /**
     * Add a new TimelineFrame.
     */
    public addFrame(newFrame:TimelineFrame)
    {
        this._duration += newFrame.duration;
        this._frames.push(newFrame);
    }

    public get duration():number
    {
        return this._duration;
    }

    public set duration(newDuration:number)
    {
        this._duration = newDuration;
    }

    /**
     * This is called inside the TimelineFrame.execute() function.
     */
    public executeFrameScript(frameScript:string)
    {

        // this function should interpret the framescript.
        // the timeline object offer functions getObjectByInstanceName(instanceName:string)
        // a nested movieClip like "mainWindow.clip1" could be accessed like this:
        // getObjectByInstanceName("mainWindow").getObjectByInstanceName("clip1")

        // the AssetLibrary can be used as equivalent for the flash-library.
        // it already has options to access library-assets by name, so i think we can work with that.

    }

    /**
     * Starts playback of animation from current position
     */
    public start()
    {
        this._isplaying = true;
        this.update(0);
    }

    /**
     * Stop playback of animation and hold current position
     */
    public stop()
    {
        this._isplaying = false;// no need to call any other stuff
    }

    /**
     * Classic gotoAndPlay like as3 api - set frame by frame-number.
     */
    public gotoAndPlay(frameNumber:number)
    {
        this._time = frameNumber * (1000 / this._fps);
        this._isplaying = true;
        this.update(0, true);
    }

    /**
     * Classic gotoAndStop as3 api - set frame by frame-number.
     */
    public gotoAndStop(frameNumber:number)
    {
        this._time = frameNumber * (1000 / this._fps);
        this.update(0, true);
        this._isplaying = false;//stop playback again
    }

    /**
     * gotoAndPlay - set frame by frame-label.
     */
    public gotoAndPlayLabel(frameLabel:string)
    {
        var frameNumber:number = -1;
        for (var i:number = 0; i < this._frames.length; i++) {
            for (var fl:number = 0; fl < this._frames[i].framelabels.length; fl++) {
                if (this._frames[i].framelabels[fl] == frameLabel) {
                    fl = this._frames[i].framelabels.length;
                    frameNumber = i;
                    i = this._frames.length;
                }
            }
        }
        if (frameNumber >= 0) {
            this._time = frameNumber * (1000 / this._fps);
            this._isplaying = true;
            this.update(0, true);
        }
    }

    /**
     * gotoAndStop - set frame by frame-label.
     */
    public gotoAndStopLabel(frameLabel:string)
    {
        var frameNumber:number = -1;
        for (var i:number = 0; i < this._frames.length; i++) {
            for (var fl:number = 0; fl < this._frames[i].framelabels.length; fl++) {
                if (this._frames[i].framelabels[fl] == frameLabel) {
                    fl = this._frames[i].framelabels.length;
                    frameNumber = i;
                    i = this._frames.length;
                }
            }
        }
        if (frameNumber >= 0) {
            this._time = frameNumber * (1000 / this._fps);
            this.update(0, true);
            this._isplaying = false;
        }
    }

    /**
     * gotoAndPlay - set time in ms.
     */
    public gotoAndPlayTime(time:number)
    {
        this._time = time;
        this._isplaying = true;
        this.update(0, true);
    }

    /**
     * gotoAndStop - set time in ms.
     */
    public gotoAndStopTime(time:number)
    {
        this._time = time;
        this.update(0, true);
        this._isplaying = false;//stop playback again
    }

    public addTimelineObject(newTlObj:TimelineObject, isDisplayObj:boolean = true)
    {
        if (isDisplayObj) {
            this.addChild(<DisplayObjectContainer>newTlObj.asset);
        }
        newTlObj.deactivate();
        this._timelineObjs.push(newTlObj);
    }

    public getTimelineObjectByID(objID:number):TimelineObject
    {
        for (var tlo:number = 0; tlo < this._timelineObjs.length; tlo++) {
            if (this._timelineObjs[tlo].objID == objID) {
                return this._timelineObjs[tlo];
            }
        }
        return undefined;
    }

    public getObjectByInstanceName(instanceName:string):IAsset
    {
        for (var tlo:number = 0; tlo < this._timelineObjs.length; tlo++) {
            if (this._timelineObjs[tlo].asset.name == instanceName) {
                return this._timelineObjs[tlo].asset;
            }
        }
    }
}
export = MovieClip;
