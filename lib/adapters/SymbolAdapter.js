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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL2FkYXB0ZXJzL1N5bWJvbEFkYXB0ZXIudHMiXSwibmFtZXMiOlsiU3ltYm9sQWRhcHRlciIsIlN5bWJvbEFkYXB0ZXIuY29uc3RydWN0b3IiLCJTeW1ib2xBZGFwdGVyLl9yb3RhdGlvbiIsIlN5bWJvbEFkYXB0ZXIuX3giLCJTeW1ib2xBZGFwdGVyLl95IiwiU3ltYm9sQWRhcHRlci5feHNjYWxlIiwiU3ltYm9sQWRhcHRlci5feXNjYWxlIiwiU3ltYm9sQWRhcHRlci5fcGFyZW50IiwiU3ltYm9sQWRhcHRlci5nZXREZXB0aCJdLCJtYXBwaW5ncyI6IkFBT0EsSUFBTSxhQUFhO0lBOENmQSxTQTlDRUEsYUFBYUEsQ0E4Q0hBLE9BQWdDQTtRQUV4Q0MsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRURELHNCQUFJQSxvQ0FBU0E7YUFBYkE7WUFFSUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDbENBLENBQUNBO2FBRURGLFVBQWNBLEtBQWNBO1lBRXhCRSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7OztPQUxBRjtJQU9EQSxzQkFBSUEsNkJBQUVBO2FBQU5BO1lBRUlHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO1FBQzFCQSxDQUFDQTthQUVESCxVQUFPQSxLQUFjQTtZQUVqQkcsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDM0JBLENBQUNBOzs7T0FMQUg7SUFPREEsc0JBQUlBLDZCQUFFQTthQUFOQTtZQUVJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREosVUFBT0EsS0FBY0E7WUFFakJJLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFKO0lBT0RBLHNCQUFJQSxrQ0FBT0E7YUFBWEE7WUFFSUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDL0JBLENBQUNBO2FBRURMLFVBQVlBLEtBQWNBO1lBRXRCSyxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7OztPQUxBTDtJQU9EQSxzQkFBSUEsa0NBQU9BO2FBS1hBO1lBRUlNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO1FBQy9CQSxDQUFDQTthQVJETixVQUFZQSxLQUFjQTtZQUV0Qk0sSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDaENBLENBQUNBOzs7T0FBQU47SUFPREEsc0JBQUlBLGtDQUFPQTthQUFYQTtZQUVJTyxJQUFJQSxRQUFRQSxHQUFjQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUM5Q0EsTUFBTUEsQ0FBbUJBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBO1FBQzlDQSxDQUFDQTs7O09BQUFQO0lBRURBLGdDQUFRQSxHQUFSQTtRQUVJUSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMxQkEsQ0FBQ0E7SUFDTFIsb0JBQUNBO0FBQURBLENBL0dBLEFBK0dDQSxJQUFBO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6ImZsL2FkYXB0ZXJzL1N5bWJvbEFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOltudWxsXX0=