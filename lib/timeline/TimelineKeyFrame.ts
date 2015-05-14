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
import DisplayObjectContainer        = require("awayjs-display/lib/containers/DisplayObjectContainer");
import Mesh                            = require("awayjs-display/lib/entities/Mesh");
import MovieClip                    = require("awayjs-player/lib/display/MovieClip");
import FrameCommand                 = require("awayjs-player/lib/timeline/commands/FrameCommand");


class TimelineKeyFrame
{
    private _firstFrame:number;
    private _lastFrame:number;
    private _duration:number;
    private _label:string;
    private _frameCommands:Array<FrameCommand>;
    private _frameConstructCommands:Array<FrameCommand>;
    private _framePostConstructCommands:Array<FrameCommand>;
    private _frameDestructCommands:Array<FrameCommand>;

    constructor()
    {
        this._duration = 1;//use millisecs for duration ? or frames ?
        this._frameCommands = [];
        this._frameConstructCommands = [];
        this._framePostConstructCommands = [];
        this._frameDestructCommands = [];
    }

    public get label()
    {
        return this._label;
    }

    public set label(value:string)
    {
        this._label = value;
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

    public addPostConstructCommand(command:FrameCommand)
    {
        // make the timeline available for the commands
        this._framePostConstructCommands.push(command);
    }

    public addDestructCommand(command:FrameCommand)
    {
        // make the timeline available for the commands
        this._frameDestructCommands.push(command);
    }

    public get firstFrame():number
    {
        return this._firstFrame;
    }

    public get duration():number
    {
        return this._duration;
    }

    public get lastFrame():number
    {
        return this._lastFrame;
    }

    public setFrameTime(startTime:number, duration:number)
    {
        this._firstFrame = startTime;
        this._duration = duration;
        this._lastFrame = startTime + duration;
    }

    public construct(sourceMovieClip:MovieClip)
    {
        var len = this._frameConstructCommands.length;

        // rather pointless to pass time info here
        for (var i = 0; i < len; i++)
            this._frameConstructCommands[i].execute(sourceMovieClip, this._firstFrame);
    }

    // needs to be called after children have been constructed
    public postConstruct(sourceMovieClip:MovieClip)
    {
        var len = this._framePostConstructCommands.length;

        // rather pointless to pass time info here
        for (var i = 0; i < len; i++)
            this._framePostConstructCommands[i].execute(sourceMovieClip, this._firstFrame);
    }

    public deconstruct(sourceMovieClip:MovieClip)
    {
        var len = this._frameDestructCommands.length;
        // rather pointless to pass time info here
        for (var i = 0; i < len; i++)
            this._frameDestructCommands[i].execute(sourceMovieClip, this._lastFrame + 1);
    }

    public update(sourceMovieClip:MovieClip, frame:number)
    {
        var len = this._frameCommands.length;

        for (var i = 0; i < len; i++)
            this._frameCommands[i].execute(sourceMovieClip, frame);
    }
}

export = TimelineKeyFrame;
