require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"awayjs-player\\lib\\fl\\adapters\\MovieClipAdapter":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SymbolAdapter = require("awayjs-player/lib/fl/adapters/SymbolAdapter");
/**
 * MovieClip
 */
var MovieClipAdapter = (function (_super) {
    __extends(MovieClipAdapter, _super);
    // translate to scripts:
    /*public onData: Function;
    public onEnterFrame: Function;
    public onLoad: Function;
    public onMouseDown: Function;
    public onMouseMove: Function;
    public onMouseUp: Function;
    public onUnload: Function;*/
    function MovieClipAdapter(adaptee) {
        _super.call(this, adaptee);
        this.currentFrameIndex = -1;
    }
    return MovieClipAdapter;
})(SymbolAdapter);
module.exports = MovieClipAdapter;


},{"awayjs-player/lib/fl/adapters/SymbolAdapter":undefined}],"awayjs-player\\lib\\fl\\adapters\\SymbolAdapter":[function(require,module,exports){
var SymbolAdapter = (function () {
    function SymbolAdapter(adaptee) {
        this.adaptee = adaptee;
    }
    Object.defineProperty(SymbolAdapter.prototype, "_rotation", {
        get: function () {
            return this.adaptee.rotationZ;
        },
        set: function (value) {
            this.adaptee.rotationZ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_x", {
        get: function () {
            return this.adaptee.x;
        },
        set: function (value) {
            this.adaptee.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_y", {
        get: function () {
            return this.adaptee.y;
        },
        set: function (value) {
            this.adaptee.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_xscale", {
        get: function () {
            return this.adaptee.scaleX;
        },
        set: function (value) {
            this.adaptee.scaleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_yscale", {
        get: function () {
            return this.adaptee.scaleY;
        },
        set: function (value) {
            this.adaptee.scaleY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymbolAdapter.prototype, "_parent", {
        get: function () {
            var parentMC = this.adaptee.parent;
            return parentMC.adapter;
        },
        enumerable: true,
        configurable: true
    });
    SymbolAdapter.prototype.getDepth = function () {
        return this.adaptee.z;
    };
    return SymbolAdapter;
})();
module.exports = SymbolAdapter;


},{}],"awayjs-player\\lib\\fl\\display\\MovieClip":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var Symbol = require("awayjs-player/lib/fl/display/Symbol");
var MovieClipAdapter = require("awayjs-player/lib/fl/adapters/MovieClipAdapter");
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        _super.call(this);
        this._duration = 0;
        this._timelineObjs = new Array();
        this._frames = new Array();
        this._currentFrame = 0;
        this._speed = 1.0;
        this._isplaying = false;
        this._fps = 25;
        this._time = 0;
        this._duration = 0;
        this._playMode = 1;
    }
    MovieClip.prototype.createAdapter = function () {
        return new MovieClipAdapter(this);
    };
    Object.defineProperty(MovieClip.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (newSpeed) {
            this._speed = newSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        set: function (newFps) {
            this._fps = newFps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "assetType", {
        get: function () {
            return AssetType.TIMELINE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * should be called right before the call to away3d-render.
     */
    MovieClip.prototype.update = function (timeDelta, jumpingToFrame) {
        if (jumpingToFrame === void 0) { jumpingToFrame = false; }
        var tlo;
        // only update if playing, or if not init before, or if jumping to frame
        if ((this._isplaying) || (!this._isInit) || (jumpingToFrame)) {
            // multiply the timeDelta with the speed (can be negative)
            // update the this._time accordingly
            var timeDelta = timeDelta * this._speed;
            this._time += timeDelta;
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
            var frameCnt = 0;
            var curFrame;
            var foundFrame = false;
            while (frameCnt < this._frames.length) {
                curFrame = this._frames[this._currentFrame];
                //console.log("searchForFrame=="+this._time+" startTime= "+curFrame.startTime+" endTime = "+curFrame.endTime);
                if ((this._time >= curFrame.startTime) && (this._time <= curFrame.endTime)) {
                    foundFrame = true;
                    frameCnt = this._frames.length;
                }
                else {
                    curFrame.makeDirty(); // make sure the frame gets executed next time it should show
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
                    var commandSet = 1; // 1 = execute normal playback commands
                    if (this._speed < 0) {
                        commandSet = 2; //2 = execute reversed playback commands
                    }
                    // if we are jumping Frames, we need to hide all objects and fully init
                    //if(jumpingToFrame) {
                    commandSet = 0; //0 = execute full init frame commands
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
                }
            }
            this._isInit = true;
        }
        for (tlo = 0; tlo < this._timelineObjs.length; tlo++) {
            if (this._timelineObjs[tlo].isActive) {
                if (this._timelineObjs[tlo].asset.assetType == AssetType.TIMELINE) {
                    this._timelineObjs[tlo].asset.update(timeDelta);
                }
            }
        }
    };
    /**
     * Add a new TimelineFrame.
     */
    MovieClip.prototype.addFrame = function (newFrame) {
        this._duration += newFrame.duration;
        this._frames.push(newFrame);
    };
    Object.defineProperty(MovieClip.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (newDuration) {
            this._duration = newDuration;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This is called inside the TimelineFrame.execute() function.
     */
    MovieClip.prototype.executeFrameScript = function (frameScript) {
        // this function should interpret the framescript.
        // the timeline object offer functions getObjectByInstanceName(instanceName:string)
        // a nested movieClip like "mainWindow.clip1" could be accessed like this:
        // getObjectByInstanceName("mainWindow").getObjectByInstanceName("clip1")
        // the AssetLibrary can be used as equivalent for the flash-library.
        // it already has options to access library-assets by name, so i think we can work with that.
    };
    /**
     * Starts playback of animation from current position
     */
    MovieClip.prototype.start = function () {
        this._isplaying = true;
        this.update(0);
    };
    /**
     * Stop playback of animation and hold current position
     */
    MovieClip.prototype.stop = function () {
        this._isplaying = false; // no need to call any other stuff
    };
    /**
     * Classic gotoAndPlay like as3 api - set frame by frame-number.
     */
    MovieClip.prototype.gotoAndPlay = function (frameNumber) {
        this._time = frameNumber * (1000 / this._fps);
        this._isplaying = true;
        this.update(0, true);
    };
    /**
     * Classic gotoAndStop as3 api - set frame by frame-number.
     */
    MovieClip.prototype.gotoAndStop = function (frameNumber) {
        this._time = frameNumber * (1000 / this._fps);
        this.update(0, true);
        this._isplaying = false; //stop playback again
    };
    /**
     * gotoAndPlay - set frame by frame-label.
     */
    MovieClip.prototype.gotoAndPlayLabel = function (frameLabel) {
        var frameNumber = -1;
        for (var i = 0; i < this._frames.length; i++) {
            for (var fl = 0; fl < this._frames[i].framelabels.length; fl++) {
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
    };
    /**
     * gotoAndStop - set frame by frame-label.
     */
    MovieClip.prototype.gotoAndStopLabel = function (frameLabel) {
        var frameNumber = -1;
        for (var i = 0; i < this._frames.length; i++) {
            for (var fl = 0; fl < this._frames[i].framelabels.length; fl++) {
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
    };
    /**
     * gotoAndPlay - set time in ms.
     */
    MovieClip.prototype.gotoAndPlayTime = function (time) {
        this._time = time;
        this._isplaying = true;
        this.update(0, true);
    };
    /**
     * gotoAndStop - set time in ms.
     */
    MovieClip.prototype.gotoAndStopTime = function (time) {
        this._time = time;
        this.update(0, true);
        this._isplaying = false; //stop playback again
    };
    MovieClip.prototype.addTimelineObject = function (newTlObj, isDisplayObj) {
        if (isDisplayObj === void 0) { isDisplayObj = true; }
        if (isDisplayObj) {
            this.addChild(newTlObj.asset);
        }
        newTlObj.deactivate();
        this._timelineObjs.push(newTlObj);
    };
    MovieClip.prototype.getTimelineObjectByID = function (objID) {
        for (var tlo = 0; tlo < this._timelineObjs.length; tlo++) {
            if (this._timelineObjs[tlo].objID == objID) {
                return this._timelineObjs[tlo];
            }
        }
        return undefined;
    };
    MovieClip.prototype.getObjectByInstanceName = function (instanceName) {
        for (var tlo = 0; tlo < this._timelineObjs.length; tlo++) {
            if (this._timelineObjs[tlo].asset.name == instanceName) {
                return this._timelineObjs[tlo].asset;
            }
        }
    };
    return MovieClip;
})(Symbol);
module.exports = MovieClip;


},{"awayjs-core/lib/library/AssetType":undefined,"awayjs-player/lib/fl/adapters/MovieClipAdapter":undefined,"awayjs-player/lib/fl/display/Symbol":undefined}],"awayjs-player\\lib\\fl\\display\\Symbol":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
/**
 * Base class for anything containing a AS2 Flash object (MovieClip or Button)
 */
var Symbol = (function (_super) {
    __extends(Symbol, _super);
    function Symbol() {
        _super.call(this);
        this._adapter = this.createAdapter();
    }
    Symbol.prototype.createAdapter = function () {
        throw new Error('This method is abstract');
    };
    Object.defineProperty(Symbol.prototype, "adapter", {
        get: function () {
            return this._adapter;
        },
        enumerable: true,
        configurable: true
    });
    return Symbol;
})(DisplayObjectContainer);
module.exports = Symbol;


},{"awayjs-display/lib/containers/DisplayObjectContainer":undefined}],"awayjs-player\\lib\\fl\\timeline\\CommandPropsBase":[function(require,module,exports){
/**
 * BaseClass for CommandProperties. Should not be instantiated directly.
 */
var CommandPropsBase = (function () {
    function CommandPropsBase() {
    }
    CommandPropsBase.prototype.deactivate = function (thisObj) {
        // should be overwritten
    };
    CommandPropsBase.prototype.apply = function (thisObj, time, speed) {
        // should be overwritten
    };
    return CommandPropsBase;
})();
module.exports = CommandPropsBase;


},{}],"awayjs-player\\lib\\fl\\timeline\\CommandPropsDisplayObject":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CommandPropsBase = require("awayjs-display/lib/entities/timelinedata/CommandPropsBase");
var CommandPropsDisplayObject = (function (_super) {
    __extends(CommandPropsDisplayObject, _super);
    function CommandPropsDisplayObject() {
        _super.call(this);
        this._doDisplaymatrix = 0;
        this._doColorTransform = 0;
        this._doInstanceName = false;
        this._doDepth = false;
        this._doFilters = false;
        this._doDepthClip = false;
        this._doBlendMode = false;
    }
    CommandPropsDisplayObject.prototype.setBlendMode = function (blendMode) {
        this._blendMode = blendMode;
        this._doBlendMode = true;
    };
    CommandPropsDisplayObject.prototype.setClipDepth = function (clipDepth) {
        this._depthClip = clipDepth;
        this._doDepthClip = true;
    };
    //todo:handle filters
    CommandPropsDisplayObject.prototype.setFilter = function (filter) {
        this._filter = filter;
        this._doFilters = true;
    };
    CommandPropsDisplayObject.prototype.setDepth = function (depth) {
        this._depth = depth;
        this._doDepth = true;
    };
    CommandPropsDisplayObject.prototype.setDisplaymatrixInterpolate = function (interpolate) {
        this._displayMatrixInterpolate = interpolate;
        this._doDisplaymatrix = 2;
    };
    CommandPropsDisplayObject.prototype.setDisplaymatrix = function (displayMatrix) {
        this._displayMatrix = displayMatrix;
        this._doDisplaymatrix = 1;
    };
    CommandPropsDisplayObject.prototype.setColorTransform = function (colorTransform) {
        this._colorTransform = colorTransform;
        this._doColorTransform = 1;
    };
    CommandPropsDisplayObject.prototype.setColorTranformInterpolate = function (interpolate) {
        this._colorTransformInterpolate = interpolate;
        this._doColorTransform = 2;
    };
    CommandPropsDisplayObject.prototype.setInstancename = function (instanceName) {
        this._instanceName = instanceName;
        this._doInstanceName = true;
    };
    CommandPropsDisplayObject.prototype.deactivate = function (thisObj) {
        thisObj.visible = false;
    };
    CommandPropsDisplayObject.prototype.apply = function (thisObj, time, speed) {
        thisObj.visible = true;
        if (this._doDisplaymatrix == 1) {
            thisObj.transform.matrix3D = this._displayMatrix;
        }
        else if (this._doDisplaymatrix == 2) {
        }
        //todo: check how to apply colortransform (i guess this will be materials of meshes)
        //maybe we must give displayobjectcontainer the functions to pass ColorTransform to children
        if (this._doColorTransform == 1) {
        }
        else if (this._doColorTransform == 2) {
        }
        if (this._doInstanceName) {
            thisObj.name = this._instanceName;
        }
        if (this._doDepth) {
        }
        if (this._doBlendMode) {
        }
        if (this._doDepthClip) {
        }
        if (this._doFilters) {
        }
    };
    return CommandPropsDisplayObject;
})(CommandPropsBase);
module.exports = CommandPropsDisplayObject;


},{"awayjs-display/lib/entities/timelinedata/CommandPropsBase":undefined}],"awayjs-player\\lib\\fl\\timeline\\FrameCommand":[function(require,module,exports){
/**
 * FrameCommand associates a TimeLineobject with CommandProps.
 * CommandProps can be of different class, depending on the type of Asset that the TimeLineObject references to.
 */
var FrameCommand = (function () {
    function FrameCommand(tlObj) {
        this._tlObj = tlObj;
        this.commandProps = null;
        this._activate = true;
    }
    Object.defineProperty(FrameCommand.prototype, "activateObj", {
        get: function () {
            return this._activate;
        },
        set: function (newActve) {
            this._activate = newActve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameCommand.prototype, "commandProps", {
        get: function () {
            return this._commandProps;
        },
        set: function (newProps) {
            this._commandProps = newProps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameCommand.prototype, "tlObj", {
        get: function () {
            return this._tlObj;
        },
        set: function (newtlObj) {
            this._tlObj = newtlObj;
        },
        enumerable: true,
        configurable: true
    });
    FrameCommand.prototype.execute = function (time, speed) {
        if (this.commandProps == undefined)
            return; //commandProps must always be defined
        // if this is a activate command, we call the apply function of the CommandProps
        if (this._activate) {
            this.tlObj.isActive = true;
            this.commandProps.apply(this.tlObj.asset, time, speed);
        }
        else {
            this.tlObj.isActive = false;
            this.commandProps.deactivate(this.tlObj.asset);
        }
    };
    return FrameCommand;
})();
module.exports = FrameCommand;


},{}],"awayjs-player\\lib\\fl\\timeline\\InterpolationObject":[function(require,module,exports){
/**
 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
 *  A TimeLineObject basically consists of an objID, and an IAsset.
 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets

 */
var InterpolationObject = (function () {
    function InterpolationObject(type, startValue, endValue, startTime, endTime) {
        this._type = type;
        this._startValue = startValue;
        this._startTime = startTime;
        this._endValue = endValue;
        this._duration = endTime - startTime;
    }
    InterpolationObject.prototype.getState = function (time, speed) {
        // todo: handle reverse playback
        if (time < this._startTime * speed) {
            return;
        }
        if (time > this._endTime * speed) {
            return;
        }
        if (this._type == 0) {
            //interpolate number
            return (this._startValue + (((time - this._startTime) * (this._duration * speed)) * (this._endValue - this._startValue)));
        }
        if (this._type == 1) {
        }
        if (this._type == 2) {
        }
        if (this._type == 3) {
        }
        return;
    };
    return InterpolationObject;
})();
module.exports = InterpolationObject;


},{}],"awayjs-player\\lib\\fl\\timeline\\TimelineFrame":[function(require,module,exports){
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
var TimelineFrame = (function () {
    function TimelineFrame() {
        this._isDirty = true;
        this._script = "";
        this._duration = 1; //use millisecs for duration ? or frames ?
        this._frameCommands = new Array();
        this._frameCommandsReverse = new Array();
        this._frameCommandsInit = new Array();
        this._framelabels = new Array();
        this._labelTypes = new Array();
    }
    TimelineFrame.prototype.addCommand = function (newCommand) {
        // make the timeline available for the commands
        this._frameCommands.push(newCommand);
    };
    TimelineFrame.prototype.addCommandReverse = function (newCommand) {
        // make the timeline available for the commands
        this._frameCommandsReverse.push(newCommand);
    };
    TimelineFrame.prototype.addCommandInit = function (newCommand) {
        // make the timeline available for the commands
        this._frameCommandsInit.push(newCommand);
    };
    TimelineFrame.prototype.addLabel = function (label, type) {
        this._framelabels.push(label);
        this._labelTypes.push(type);
    };
    Object.defineProperty(TimelineFrame.prototype, "framelabels", {
        get: function () {
            return this._framelabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineFrame.prototype, "labelTypes", {
        get: function () {
            return this._labelTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineFrame.prototype, "script", {
        get: function () {
            return this._script;
        },
        enumerable: true,
        configurable: true
    });
    TimelineFrame.prototype.addToScript = function (newscript) {
        this._script += newscript;
    };
    Object.defineProperty(TimelineFrame.prototype, "isDirty", {
        get: function () {
            return this._isDirty;
        },
        enumerable: true,
        configurable: true
    });
    TimelineFrame.prototype.makeDirty = function () {
        this._isDirty = true;
    };
    Object.defineProperty(TimelineFrame.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineFrame.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineFrame.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        enumerable: true,
        configurable: true
    });
    TimelineFrame.prototype.setFrameTime = function (startTime, duration) {
        this._startTime = startTime;
        this._duration = duration;
        this._endTime = startTime + duration;
    };
    /**
     * executes the set of Commands for this Frame.
     * Each Frame has 3 sets of commands:
     *  0 = init frame commands = the frame must be init as if previous frame was not played
     *  1 = play frame commands = the previous frame was played
     *  2 = playReverse Commands = the next frame was played
     */
    TimelineFrame.prototype.executeCommands = function (commandSet, time, speed) {
        // execute all the  frame commands for this frame
        if (commandSet == 0) {
            for (var i = 0; i < this._frameCommandsInit.length; i++) {
                this._frameCommandsInit[i].execute(time, speed);
            }
        }
        else if (commandSet == 1) {
            for (var i = 0; i < this._frameCommands.length; i++) {
                this._frameCommands[i].execute(time, speed);
            }
        }
        else if (commandSet == 2) {
            for (var i = 0; i < this._frameCommandsReverse.length; i++) {
                this._frameCommandsReverse[i].execute(time, speed);
            }
        }
        // mark this frame as not dirty, so it will not get executed again, unless Timeline makes it dirty again.
        // whenever a Frame is entered, the Timeline should mark the previous frame as dirty.
        this._isDirty = false;
    };
    return TimelineFrame;
})();
module.exports = TimelineFrame;


},{}],"awayjs-player\\lib\\fl\\timeline\\TimelineObject":[function(require,module,exports){
/**
 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
 *  A TimeLineObject basically consists of an objID, and an IAsset.
 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets

 */
var TimeLineObject = (function () {
    function TimeLineObject(asset, objID, deactiveCommandProps) {
        this._asset = asset;
        this._objID = objID;
        this._is2D = true;
        this._isActive = false;
        this._deactivateCommandProps = deactiveCommandProps;
        this._deactivateCommandProps.deactivate(this._asset);
    }
    Object.defineProperty(TimeLineObject.prototype, "deactivateCommandProps", {
        set: function (newCommandprops) {
            this._deactivateCommandProps = newCommandprops;
        },
        enumerable: true,
        configurable: true
    });
    TimeLineObject.prototype.deactivate = function () {
        //if(this._deactivateCommandProps==undefined)
        //    return;
        this._deactivateCommandProps.deactivate(this._asset);
        this._isActive = false;
    };
    Object.defineProperty(TimeLineObject.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        set: function (newAsset) {
            this._asset = newAsset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeLineObject.prototype, "objID", {
        get: function () {
            return this._objID;
        },
        set: function (newobjID) {
            this._objID = newobjID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeLineObject.prototype, "is2D", {
        get: function () {
            return this._is2D;
        },
        set: function (newis2D) {
            this._is2D = newis2D;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeLineObject.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (newisActive) {
            this._isActive = newisActive;
        },
        enumerable: true,
        configurable: true
    });
    return TimeLineObject;
})();
module.exports = TimeLineObject;


},{}]},{},[])


//# sourceMappingURL=awayjs-player.js.map