import Matrix3D                        = require("awayjs-core/lib/geom/Matrix3D");
import Matrix                        = require("awayjs-core/lib/geom/Matrix");
import SubGeometryBase                = require("awayjs-core/lib/data/SubGeometryBase");
import SubGeometry                    = require("awayjs-core/lib/data/TriangleSubGeometry");
import Geometry                        = require("awayjs-core/lib/data/Geometry");
import GeometryEvent                = require("awayjs-core/lib/events/GeometryEvent");

import IAnimator                    = require("awayjs-display/lib/animators/IAnimator");
import ISubMesh                        = require("awayjs-display/lib/base/ISubMesh");
import ISubMeshClass                = require("awayjs-display/lib/base/ISubMeshClass");
import MaterialBase                    = require("awayjs-display/lib/materials/MaterialBase");
import EntityNode                    = require("awayjs-display/lib/partition/EntityNode");
import IRenderer                    = require("awayjs-display/lib/render/IRenderer");
import DisplayObjectContainer        = require("awayjs-display/lib/containers/DisplayObjectContainer");
import Mesh                            = require("awayjs-display/lib/entities/Mesh");
import MovieClip                    = require("awayjs-player/lib/display/MovieClip");
import FrameCommand                 = require("awayjs-player/lib/timeline/commands/FrameCommand");


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
class TimelineKeyFrame
{
    private _startTime:number;
    private _endTime:number;
    private _duration:number;
    private _frameCommands:Array<FrameCommand>;
    private _frameConstructCommands:Array<FrameCommand>;
    private _frameDestructCommands:Array<FrameCommand>;
    private _isActive:boolean;

    constructor()
    {
        this._duration = 1;//use millisecs for duration ? or frames ?
        this._frameCommands = new Array<FrameCommand>();
        this._frameConstructCommands = new Array<FrameCommand>();
        this._frameDestructCommands = new Array<FrameCommand>();
        this._isActive = false;
    }

    public addCommand(command:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameCommands.push(command);
    }

    public addConstructCommand(command:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameConstructCommands.push(command);
    }

    public addDestructCommand(command:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameDestructCommands.push(command);
    }

    public get startTime():number
    {
        return this._startTime;
    }

    public get duration():number
    {
        return this._duration;
    }

    public get endTime():number
    {
        return this._endTime;
    }

    public get isActive():boolean
    {
        return this._isActive;
    }

    public setFrameTime(startTime:number, duration:number)
    {
        this._startTime = startTime;
        this._duration = duration;
        this._endTime = startTime + duration;
    }

    public activate(sourceMovieClip:MovieClip)
    {
        this._isActive = true;
        var len = this._frameConstructCommands.length;
        // rather pointless to pass time info here
        for (var i = 0; i < len; i++)
            this._frameConstructCommands[i].execute(sourceMovieClip, this._startTime);
    }

    public deactivate(sourceMovieClip:MovieClip)
    {
        this._isActive = false;
        var len = this._frameDestructCommands.length;
        var endTime = this._duration + this._startTime;
        // rather pointless to pass time info here
        for (var i = 0; i < len; i++)
            this._frameDestructCommands[i].execute(sourceMovieClip, endTime);
    }

    public update(sourceMovieClip:MovieClip, time:number)
    {
        var len = this._frameCommands.length;

        for (var i = 0; i < len; i++)
            this._frameCommands[i].execute(sourceMovieClip, time);
    }
}

export = TimelineKeyFrame;
