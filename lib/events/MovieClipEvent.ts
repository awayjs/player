import Event					= require("awayjs-core/lib/events/Event");

import DisplayObject			= require("awayjs-display/lib/base/DisplayObject");
import MovieClip			= require("awayjs-player/lib/display/MovieClip");

class MovieClipEvent extends Event
{
	public static NAME_CHANGED:string = "nameChanged";
	public static CHILD_ADDED:string = "childAdded";
	public static CHILD_REMOVED:string = "childRemoved";

    public displayObject:DisplayObject;

    constructor(type:string, displayObject:DisplayObject)
	{
		super(type);
		this.displayObject = displayObject;
	}
}

export = MovieClipEvent;