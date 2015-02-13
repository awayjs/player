var AS2SymbolAdapter = (function () {
    function AS2SymbolAdapter(adaptee) {
        this._adaptee = adaptee;
    }
    Object.defineProperty(AS2SymbolAdapter.prototype, "adaptee", {
        get: function () {
            return this._adaptee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_rotation", {
        get: function () {
            return this._adaptee.rotationZ;
        },
        set: function (value) {
            this._adaptee.rotationZ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_x", {
        get: function () {
            return this._adaptee.x;
        },
        set: function (value) {
            this._adaptee.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_y", {
        get: function () {
            return this._adaptee.y;
        },
        set: function (value) {
            this._adaptee.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_xscale", {
        get: function () {
            return this._adaptee.scaleX;
        },
        set: function (value) {
            this._adaptee.scaleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_yscale", {
        get: function () {
            return this._adaptee.scaleY;
        },
        set: function (value) {
            this._adaptee.scaleY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AS2SymbolAdapter.prototype, "_parent", {
        get: function () {
            var parentMC = this._adaptee.parent;
            return parentMC.adapter;
        },
        enumerable: true,
        configurable: true
    });
    AS2SymbolAdapter.prototype.getDepth = function () {
        return this._adaptee.z;
    };
    return AS2SymbolAdapter;
})();
module.exports = AS2SymbolAdapter;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL2FkYXB0ZXJzL0FTMlN5bWJvbEFkYXB0ZXIudHMiXSwibmFtZXMiOlsiQVMyU3ltYm9sQWRhcHRlciIsIkFTMlN5bWJvbEFkYXB0ZXIuY29uc3RydWN0b3IiLCJBUzJTeW1ib2xBZGFwdGVyLmFkYXB0ZWUiLCJBUzJTeW1ib2xBZGFwdGVyLl9yb3RhdGlvbiIsIkFTMlN5bWJvbEFkYXB0ZXIuX3giLCJBUzJTeW1ib2xBZGFwdGVyLl95IiwiQVMyU3ltYm9sQWRhcHRlci5feHNjYWxlIiwiQVMyU3ltYm9sQWRhcHRlci5feXNjYWxlIiwiQVMyU3ltYm9sQWRhcHRlci5fcGFyZW50IiwiQVMyU3ltYm9sQWRhcHRlci5nZXREZXB0aCJdLCJtYXBwaW5ncyI6IkFBT0EsSUFBTSxnQkFBZ0I7SUE4Q2xCQSxTQTlDRUEsZ0JBQWdCQSxDQThDTkEsT0FBZ0NBO1FBRXhDQyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxPQUFPQSxDQUFDQTtJQUM1QkEsQ0FBQ0E7SUFFREQsc0JBQUlBLHFDQUFPQTthQUFYQTtZQUVJRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBRjtJQUVEQSxzQkFBSUEsdUNBQVNBO2FBQWJBO1lBRUlHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBO1FBQ25DQSxDQUFDQTthQUVESCxVQUFjQSxLQUFjQTtZQUV4QkcsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDcENBLENBQUNBOzs7T0FMQUg7SUFPREEsc0JBQUlBLGdDQUFFQTthQUFOQTtZQUVJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7YUFFREosVUFBT0EsS0FBY0E7WUFFakJJLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzVCQSxDQUFDQTs7O09BTEFKO0lBT0RBLHNCQUFJQSxnQ0FBRUE7YUFBTkE7WUFFSUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLENBQUNBO2FBRURMLFVBQU9BLEtBQWNBO1lBRWpCSyxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUxBTDtJQU9EQSxzQkFBSUEscUNBQU9BO2FBQVhBO1lBRUlNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO1FBQ2hDQSxDQUFDQTthQUVETixVQUFZQSxLQUFjQTtZQUV0Qk0sSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDakNBLENBQUNBOzs7T0FMQU47SUFPREEsc0JBQUlBLHFDQUFPQTthQUtYQTtZQUVJTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7YUFSRFAsVUFBWUEsS0FBY0E7WUFFdEJPLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBLENBQUNBO1FBQ2pDQSxDQUFDQTs7O09BQUFQO0lBT0RBLHNCQUFJQSxxQ0FBT0E7YUFBWEE7WUFFSVEsSUFBSUEsUUFBUUEsR0FBY0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDL0NBLE1BQU1BLENBQXNCQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNqREEsQ0FBQ0E7OztPQUFBUjtJQUVEQSxtQ0FBUUEsR0FBUkE7UUFFSVMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBQ0xULHVCQUFDQTtBQUFEQSxDQXBIQSxBQW9IQ0EsSUFBQTtBQUVELEFBQTBCLGlCQUFqQixnQkFBZ0IsQ0FBQyIsImZpbGUiOiJmbC9hZGFwdGVycy9BUzJTeW1ib2xBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF19