import MovieClip                    = require("awayjs-player/lib/display/MovieClip");
import FrameCommand                 = require("awayjs-player/lib/timeline/commands/FrameCommand");
import DisplayObject                    = require("awayjs-display/lib/base/DisplayObject");
import ColorTransform					= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D							= require("awayjs-core/lib/geom/Matrix3D");


class TimelineKeyFrame
{
  public firstFrame:number;
  public duration:number;
  public lastFrame:number;

  public label:string;

  public removeDepth:Array<number> = [];// for each child we store depth
  public addCommands:Array<number> = [];// for each child we store 3 numbers: childID, sessionID, depth

  public updateChildIDs:Array<number> = [];
  public updateChildProperties:Array<Object> = [];

  public registerChilds:Array<number> = [];
  public registerNames:Array<string> = [];

  public frameConstructCommands:Array<FrameCommand> = [];
  public frameUpdatePropertiesCommands:Array<FrameCommand> = [];
  public framePostConstructCommands:Array<FrameCommand> = [];

  constructor(firstFrame:number, duration:number)
  {
    this.firstFrame = firstFrame;
    this.duration = duration;
    this.lastFrame = firstFrame + duration;
  }
  /*
   *   used when jumping between frames
   */
  public construct_childs(sourceMovieClip:MovieClip)
  {
    // remove objects by depth
    var i:number;
    var c:number;
    var len = this.removeDepth.length;
    var childrenArray = sourceMovieClip["_children"];
    for(i=0; i<len;i++){
      for(c=0; c<childrenArray.length;c++){
        if(childrenArray[c].__AS2Depth==this.removeDepth[i]){
          sourceMovieClip.removeChild(childrenArray[c]);
          break;
        }
      }
    }
    // add new objects
    len = this.addCommands.length;
    for(i=0; i<len;i+=3){
      var target = sourceMovieClip.getPotentialChildInstance(this.addCommands[i]);
      target["__sessionID"] = this.addCommands[i+1];
      target["__AS2Depth"]  = this.addCommands[i+2];
      sourceMovieClip.addChild(target);
    }
  }

  /*
   *   used when playing continously
   */
  public construct(sourceMovieClip:MovieClip)
  {
    // remove objects by depth
    var i:number;
    var c:number;
    var len = this.removeDepth.length;
    var childrenArray = sourceMovieClip["_children"];
    for(i=0; i<len;i++){
      for(c=0; c<childrenArray.length;c++){
        if(childrenArray[c].__AS2Depth==this.removeDepth[i]){
          var child_to_remove:DisplayObject=childrenArray[c];
          sourceMovieClip.removeChild(child_to_remove);
          sourceMovieClip.adapter.unregisterScriptObject(child_to_remove);
          if(child_to_remove.isAsset(MovieClip))
            (<MovieClip>child_to_remove).adapter.freeFromScript();
          break;
        }
      }
    }
    // add new objects
    len = this.addCommands.length;
    for(i=0; i<len;i+=3){
      var target = sourceMovieClip.getPotentialChildInstance(this.addCommands[i]);
      target["__sessionID"] = this.addCommands[i+1];
      target["__AS2Depth"]  = this.addCommands[i+2];
      sourceMovieClip.addChild(target);
      var doit=true;
      if(target.isAsset(MovieClip)) {
        if ((<MovieClip>target).adapter.isBlockedByScript()) {
          doit = false;
        }
      }
      if(doit) {
        target.visible = true;
        target["_iMatrix3D"] = new Matrix3D();
        target["colorTransform"] = new ColorTransform();
      }
      if(target.isAsset(MovieClip))
        (<MovieClip>target).reset();
      //todo: i think all movieclips that was newly added, should be resetted to frame 1
      //todo: but for some reason, it makes things worse than better
    }
    if(len>0) {
      sourceMovieClip.adapter.updateDepths();
    }
  }
  public updateProperties(sourceMovieClip:MovieClip)
  {
    var i:number;
    var doit:boolean;
    var len = this.updateChildIDs.length;
    for(i=0; i<len;i++) {
      var target = sourceMovieClip.getPotentialChildInstance(this.updateChildIDs[i]);
      if (target.parent == sourceMovieClip) {
        doit = true;
        if (target.isAsset(MovieClip)) {
          if ((<MovieClip>target).adapter.isBlockedByScript()) {
            doit = false;
          }
        }
        if (doit) {
          var this_obj:Object = this.updateChildProperties[i];
          for (var key in this_obj) {
            target[key] = this_obj[key];
          }
        }
      }
    }
    this.registerObjects(sourceMovieClip);

    // mask + setButton are still used as sepperate commands
    len = this.frameUpdatePropertiesCommands.length;
    for (i = 0; i < len; i++)
      this.frameUpdatePropertiesCommands[i].execute(sourceMovieClip);
  }

  public registerObjects(sourceMovieClip:MovieClip)
  {

    var i:number;
    var len = this.registerChilds.length;
    var doit:boolean;
    for(i=0; i<len;i++){
      var target = sourceMovieClip.getPotentialChildInstance(this.registerChilds[i]);
      if (target.parent == sourceMovieClip) {
        target.name = this.registerNames[i];
        sourceMovieClip.adapter.registerScriptObject(target);
      }
    }
  }
  // needs to be called after children have been constructed
  public postConstruct(sourceMovieClip:MovieClip)
  {
    var len = this.framePostConstructCommands.length;

    for (var i:number = 0; i < len; i++)
      this.framePostConstructCommands[i].execute(sourceMovieClip);
  }
}

export = TimelineKeyFrame;