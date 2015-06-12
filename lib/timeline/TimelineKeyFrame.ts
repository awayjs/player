import MovieClip                    = require("awayjs-player/lib/display/MovieClip");
import FrameCommand                 = require("awayjs-player/lib/timeline/commands/FrameCommand");


class TimelineKeyFrame
{
    public firstFrame:number;
    public duration:number;
    public lastFrame:number;

    public label:string;
    public frameConstructCommands:Array<FrameCommand> = [];
    public framePostConstructCommands:Array<FrameCommand> = [];

    constructor(firstFrame:number, duration:number)
    {
        this.firstFrame = firstFrame;
        this.duration = duration;
        this.lastFrame = firstFrame + duration;
    }


    public construct(sourceMovieClip:MovieClip)
    {
        var len = this.frameConstructCommands.length;

        // rather pointless to pass time info here
        for (var i:number = 0; i < len; i++)
            this.frameConstructCommands[i].execute(sourceMovieClip, this.firstFrame);
    }

    // needs to be called after children have been constructed
    public postConstruct(sourceMovieClip:MovieClip)
    {
        var len = this.framePostConstructCommands.length;

        // rather pointless to pass time info here
        for (var i:number = 0; i < len; i++)
            this.framePostConstructCommands[i].execute(sourceMovieClip, this.firstFrame);
    }
}

export = TimelineKeyFrame;
