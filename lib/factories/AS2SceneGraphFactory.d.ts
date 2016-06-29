import { TextField } from "@awayjs/display/lib/display/TextField";
import { Timeline } from "@awayjs/display/lib/base/Timeline";
import { MovieClip } from "@awayjs/display/lib/display/MovieClip";
import { ITimelineSceneGraphFactory } from "@awayjs/display/lib/factories/ITimelineSceneGraphFactory";
import { View } from "@awayjs/display/lib/View";
export declare class AS2SceneGraphFactory implements ITimelineSceneGraphFactory {
    private _view;
    constructor(view: View);
    createMovieClip(timeline: Timeline): MovieClip;
    createTextField(): TextField;
}
