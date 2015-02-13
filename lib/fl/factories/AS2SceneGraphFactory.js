var AS2MovieClipAdapter = require("awayjs-player/lib/fl/adapters/AS2MovieClipAdapter");
var MovieClip = require("awayjs-player/lib/fl/display/MovieClip");
var AS2SceneGraphFactory = (function () {
    function AS2SceneGraphFactory() {
    }
    AS2SceneGraphFactory.prototype.createMovieClip = function () {
        var mc = new MovieClip();
        mc.adapter = new AS2MovieClipAdapter(mc);
        return mc;
    };
    return AS2SceneGraphFactory;
})();
module.exports = AS2SceneGraphFactory;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL2ZhY3Rvcmllcy9BUzJTY2VuZUdyYXBoRmFjdG9yeS50cyJdLCJuYW1lcyI6WyJBUzJTY2VuZUdyYXBoRmFjdG9yeSIsIkFTMlNjZW5lR3JhcGhGYWN0b3J5LmNvbnN0cnVjdG9yIiwiQVMyU2NlbmVHcmFwaEZhY3RvcnkuY3JlYXRlTW92aWVDbGlwIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLG1CQUFtQixXQUFXLG1EQUFtRCxDQUFDLENBQUM7QUFDMUYsSUFBTyxTQUFTLFdBQVcsd0NBQXdDLENBQUMsQ0FBQztBQUdyRSxJQUFNLG9CQUFvQjtJQUExQkEsU0FBTUEsb0JBQW9CQTtJQVExQkMsQ0FBQ0E7SUFOR0QsOENBQWVBLEdBQWZBO1FBRUlFLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBQ3pCQSxFQUFFQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxtQkFBbUJBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1FBQ3pDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUNMRiwyQkFBQ0E7QUFBREEsQ0FSQSxBQVFDQSxJQUFBO0FBQ0QsQUFBOEIsaUJBQXJCLG9CQUFvQixDQUFDIiwiZmlsZSI6ImZsL2ZhY3Rvcmllcy9BUzJTY2VuZUdyYXBoRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6W251bGxdfQ==