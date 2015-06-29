import MovieClip                    = require("awayjs-player/lib/display/MovieClip");
import FrameCommand                 = require("awayjs-player/lib/timeline/commands/FrameCommand");
import TimelineKeyFrame             = require("awayjs-player/lib/timeline/TimelineKeyFrame");
import ByteArray						= require("awayjs-core/lib/utils/ByteArray");
import DisplayObject                    = require("awayjs-display/lib/base/DisplayObject");
import ColorTransform					= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D							= require("awayjs-core/lib/geom/Matrix3D");


class Timeline
{

	public _keyframe_indices:Array<number>;     //stores 1 keyframeindex per frameindex
	public _labels:Object;                      // dictionary to store label => frameindex

	private _keyFrames:Array<TimelineKeyFrame>;

	private _potentialPrototypes:Array<DisplayObject>;


	constructor()
	{
		this._potentialPrototypes=[];
		this._keyframe_indices=[];
		this._labels={};
		this._keyFrames=[];
	}

	public numFrames():number
	{
		return this._keyframe_indices.length;
	}
	public numKeyFrames():number
	{
		return this._keyFrames.length;
	}
	/**
	 * Add a new TimelineFrame.
	 */
	public addFrame(newFrame:TimelineKeyFrame)
	{
		var i:number;
		for(i=0;i<newFrame.duration;i++)
			this._keyframe_indices.push(this._keyFrames.length);

		this._keyFrames.push(newFrame);
	}

	public getPotentialChildPrototype(id:number):DisplayObject
	{
		return this._potentialPrototypes[id];

	}
	public getKeyframeIndexForFrameIndex(frame_index:number) : number
	{
		return this._keyframe_indices[frame_index];
	}
	public getKeyframeForFrameIndex(frame_index:number) : TimelineKeyFrame
	{
		return this._keyFrames[this._keyframe_indices[frame_index]];
	}
	public getPotentialChilds() : Array<DisplayObject>
	{
		return this._potentialPrototypes;
	}
	public getPotentialChildInstance(id:number) : DisplayObject
	{
		return this._potentialPrototypes[id].clone();
	}

	public registerPotentialChild(prototype:DisplayObject) : void
	{
		var id = this._potentialPrototypes.length;
		this._potentialPrototypes[id] = prototype;
	}

	public jumpToLabel(target_mc:MovieClip, label:string) : void
	{
		var key_frame_index:number = this._labels[label];
		if(key_frame_index>=0){
			var target_keyframe:TimelineKeyFrame = this._keyFrames[key_frame_index];
			target_mc.currentFrameIndex=target_keyframe.firstFrame;
		}

	}

	/* moves the playhead of the targetmovieclip to the given frameindex
	 */
	public gotoFrame(target_mc:MovieClip, value : number)
	{
		var k:number;
		var i:number;
		var start_index_pass1:number;
		var start_index_pass2:number;
		var frameIndex:number = target_mc.currentFrameIndex;
		var last_keyframeIndex:number = target_mc.constructedKeyFrameIndex;
		var target_keyframeIndex:number = this._keyframe_indices[value];

		if(frameIndex==value){
			if(target_mc.forceFirstScript){
				if(this._keyFrames[target_keyframeIndex].firstFrame==value)
					target_mc.addFrameForScriptExecution(this._keyFrames[target_keyframeIndex]);
			}
			target_mc.forceFirstScript=false;
			return;
		}
		target_mc.forceFirstScript=false;

		if(this._keyFrames[target_keyframeIndex].firstFrame==value)
			target_mc.addFrameForScriptExecution(this._keyFrames[target_keyframeIndex]);

		if((frameIndex+1)==value){
			// this is continous playback. advance 1 frame (force advance)
			//target_mc.advanceFrame(false, true);
			//return;
		}

		if(target_keyframeIndex==last_keyframeIndex) {
			return;
		}


		var previous_sessions:Array<number> = [];
		var target_sessions:Array<number> = [];
		var previous_script_childs:Array<MovieClip> = [];
		var session_cnt:number=0;
		var prev_script_cnt:number=0;
		if(target_keyframeIndex>last_keyframeIndex){
			start_index_pass1=last_keyframeIndex+1;
		}
		else{
			start_index_pass1=0;
		}

		for (i=target_mc.numChildren-1; i>=0; i--) {
			var child:DisplayObject = target_mc.getChildAt(i);
			if(target_keyframeIndex>last_keyframeIndex) {
				if(child.isAsset(MovieClip)){
					previous_script_childs[prev_script_cnt++] = <MovieClip>child;
				}
				previous_sessions[session_cnt++] = child["__sessionID"];
			}
			else{
				if(child.isAsset(MovieClip)){
					var mc:MovieClip = <MovieClip>child;
					previous_script_childs[prev_script_cnt++] = mc;
					//if(mc.adapter.isBlockedByScript())
					previous_sessions[session_cnt++] = child["__sessionID"];
				}
				target_mc.removeChildAt(i);
			}
		}
		start_index_pass2=start_index_pass1;

		//  pass1: only apply add/remove commands.
		for(k=start_index_pass1; k<=target_keyframeIndex; k++){
			this._keyFrames[k].construct_childs(target_mc);
			//  check number of childs. if number of childs = 0; we can start pass2 at this frame
			if(target_mc.numChildren==0){
				start_index_pass2=k;
			}
		}
		if(target_mc.numChildren>0)
			target_mc.adapter.updateDepths();
		session_cnt=0;
		// between passes:
		// if a child has a sessionID that was not present in previous frame, it must be reset
		for (i=0; i<target_mc.numChildren; ++i) {
			var child:DisplayObject = target_mc.getChildAt(i);
			target_sessions[session_cnt++]=child["__sessionID"];
			if(previous_sessions.indexOf(child["__sessionID"])==-1){
				child.visible=true;
				child["_iMatrix3D"]= new Matrix3D();
				child["colorTransform"]= new ColorTransform();
				if(child.isAsset(MovieClip))
					(<MovieClip>child).reset();
				//todo: i think all movieclips that was newly added, should be resetted to frame 1
				//todo: but for some reason, it makes things worse than better

			}
		}
		// all mc that was present on previous frame, but not on current need to be unregistered
		for (i=0; i<previous_script_childs.length; ++i) {
			if(target_sessions.indexOf(previous_script_childs[i]["__sessionID"])==-1){
				previous_script_childs[i].adapter.freeFromScript();
				target_mc.adapter.unregisterScriptObject(previous_script_childs[i]);
			}
		}
		//  pass2: apply update commands for objects on stage (only if they are not blocked by script)
		for(k=start_index_pass2; k<=target_keyframeIndex; k++){
			this._keyFrames[k].updateProperties(target_mc);
		}
		target_mc.constructedKeyFrameIndex=target_keyframeIndex;

	}


	public constructNextFrame(target_mc:MovieClip)
	{
		var frameIndex:number = target_mc.currentFrameIndex;
		var constructed_keyFrameIndex:number = target_mc.constructedKeyFrameIndex;
		var new_keyFrameIndex:number = this._keyframe_indices[frameIndex];
		var current_keyframe:TimelineKeyFrame = this._keyFrames[new_keyFrameIndex];
		if(constructed_keyFrameIndex!=new_keyFrameIndex){
			target_mc.constructedKeyFrameIndex=new_keyFrameIndex;
			current_keyframe.construct(target_mc);
			current_keyframe.updateProperties(target_mc);
			if(current_keyframe.firstFrame==frameIndex)
				target_mc.addFrameForScriptExecution(current_keyframe);
		}
	}
}

export = Timeline;