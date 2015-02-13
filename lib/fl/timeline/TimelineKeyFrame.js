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
var TimelineKeyFrame = (function () {
    function TimelineKeyFrame() {
        this._duration = 1; //use millisecs for duration ? or frames ?
        this._frameCommands = new Array();
        this._frameConstructCommands = new Array();
        this._frameDestructCommands = new Array();
        this._isActive = false;
    }
    TimelineKeyFrame.prototype.addCommand = function (command) {
        // make the timeline available for the commands
        this._frameCommands.push(command);
    };
    TimelineKeyFrame.prototype.addConstructCommand = function (command) {
        // make the timeline available for the commands
        this._frameConstructCommands.push(command);
    };
    TimelineKeyFrame.prototype.addDestructCommand = function (command) {
        // make the timeline available for the commands
        this._frameDestructCommands.push(command);
    };
    Object.defineProperty(TimelineKeyFrame.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineKeyFrame.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineKeyFrame.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimelineKeyFrame.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        enumerable: true,
        configurable: true
    });
    TimelineKeyFrame.prototype.setFrameTime = function (startTime, duration) {
        this._startTime = startTime;
        this._duration = duration;
        this._endTime = startTime + duration;
    };
    TimelineKeyFrame.prototype.activate = function (sourceMovieClip) {
        this._isActive = true;
        var len = this._frameConstructCommands.length;
        for (var i = 0; i < len; i++)
            this._frameConstructCommands[i].execute(sourceMovieClip, this._startTime);
    };
    TimelineKeyFrame.prototype.deactivate = function (sourceMovieClip) {
        this._isActive = false;
        var len = this._frameDestructCommands.length;
        var endTime = this._duration + this._startTime;
        for (var i = 0; i < len; i++)
            this._frameDestructCommands[i].execute(sourceMovieClip, endTime);
    };
    TimelineKeyFrame.prototype.update = function (sourceMovieClip, time) {
        var len = this._frameCommands.length;
        for (var i = 0; i < len; i++)
            this._frameCommands[i].execute(sourceMovieClip, time);
    };
    return TimelineKeyFrame;
})();
module.exports = TimelineKeyFrame;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL3RpbWVsaW5lL1RpbWVsaW5lS2V5RnJhbWUudHMiXSwibmFtZXMiOlsiVGltZWxpbmVLZXlGcmFtZSIsIlRpbWVsaW5lS2V5RnJhbWUuY29uc3RydWN0b3IiLCJUaW1lbGluZUtleUZyYW1lLmFkZENvbW1hbmQiLCJUaW1lbGluZUtleUZyYW1lLmFkZENvbnN0cnVjdENvbW1hbmQiLCJUaW1lbGluZUtleUZyYW1lLmFkZERlc3RydWN0Q29tbWFuZCIsIlRpbWVsaW5lS2V5RnJhbWUuc3RhcnRUaW1lIiwiVGltZWxpbmVLZXlGcmFtZS5kdXJhdGlvbiIsIlRpbWVsaW5lS2V5RnJhbWUuZW5kVGltZSIsIlRpbWVsaW5lS2V5RnJhbWUuaXNBY3RpdmUiLCJUaW1lbGluZUtleUZyYW1lLnNldEZyYW1lVGltZSIsIlRpbWVsaW5lS2V5RnJhbWUuYWN0aXZhdGUiLCJUaW1lbGluZUtleUZyYW1lLmRlYWN0aXZhdGUiLCJUaW1lbGluZUtleUZyYW1lLnVwZGF0ZSJdLCJtYXBwaW5ncyI6IkFBcUJBLEFBWUE7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxnQkFBZ0I7SUFVbEJBLFNBVkVBLGdCQUFnQkE7UUFZZEMsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsQ0FBQ0EsRUFBQ0EsMENBQTBDQTtRQUM3REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsS0FBS0EsRUFBZ0JBLENBQUNBO1FBQ2hEQSxJQUFJQSxDQUFDQSx1QkFBdUJBLEdBQUdBLElBQUlBLEtBQUtBLEVBQWdCQSxDQUFDQTtRQUN6REEsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFnQkEsQ0FBQ0E7UUFDeERBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO0lBQzNCQSxDQUFDQTtJQUVNRCxxQ0FBVUEsR0FBakJBLFVBQWtCQSxPQUFvQkE7UUFFbENFLEFBQ0FBLCtDQUQrQ0E7UUFDL0NBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUVNRiw4Q0FBbUJBLEdBQTFCQSxVQUEyQkEsT0FBb0JBO1FBRTNDRyxBQUNBQSwrQ0FEK0NBO1FBQy9DQSxJQUFJQSxDQUFDQSx1QkFBdUJBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQy9DQSxDQUFDQTtJQUVNSCw2Q0FBa0JBLEdBQXpCQSxVQUEwQkEsT0FBb0JBO1FBRTFDSSxBQUNBQSwrQ0FEK0NBO1FBQy9DQSxJQUFJQSxDQUFDQSxzQkFBc0JBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTtJQUVESixzQkFBV0EsdUNBQVNBO2FBQXBCQTtZQUVJSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBTDtJQUVEQSxzQkFBV0Esc0NBQVFBO2FBQW5CQTtZQUVJTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBTjtJQUVEQSxzQkFBV0EscUNBQU9BO2FBQWxCQTtZQUVJTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBUDtJQUVEQSxzQkFBV0Esc0NBQVFBO2FBQW5CQTtZQUVJUSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBUjtJQUVNQSx1Q0FBWUEsR0FBbkJBLFVBQW9CQSxTQUFnQkEsRUFBRUEsUUFBZUE7UUFFakRTLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFNBQVNBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxRQUFRQSxDQUFDQTtRQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsU0FBU0EsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDekNBLENBQUNBO0lBRU1ULG1DQUFRQSxHQUFmQSxVQUFnQkEsZUFBeUJBO1FBRXJDVSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN0QkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUU5Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDeEJBLElBQUlBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZUFBZUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7SUFDbEZBLENBQUNBO0lBRU1WLHFDQUFVQSxHQUFqQkEsVUFBa0JBLGVBQXlCQTtRQUV2Q1csSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDdkJBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDN0NBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBRS9DQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtZQUN4QkEsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxlQUFlQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtJQUN6RUEsQ0FBQ0E7SUFFTVgsaUNBQU1BLEdBQWJBLFVBQWNBLGVBQXlCQSxFQUFFQSxJQUFXQTtRQUVoRFksSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFFckNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ3hCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxlQUFlQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUM5REEsQ0FBQ0E7SUFDTFosdUJBQUNBO0FBQURBLENBMUZBLEFBMEZDQSxJQUFBO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6ImZsL3RpbWVsaW5lL1RpbWVsaW5lS2V5RnJhbWUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOltudWxsXX0=