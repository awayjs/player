var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var NodeBase = require("awayjs-display/lib/partition/NodeBase");
var Partition2DNode = (function (_super) {
    __extends(Partition2DNode, _super);
    function Partition2DNode(root) {
        _super.call(this);
        this._root = root;
    }
    Partition2DNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this)) {
            this.traverseSceneGraph(this._root, traverser);
        }
    };
    // pass any so we can convert to IEntity. Sigh, TypeScript.
    Partition2DNode.prototype.traverseSceneGraph = function (displayObject, traverser) {
        // typechecking is nasty, but we have little choice:
        if (displayObject instanceof DisplayObjectContainer)
            this.traverseChildren(displayObject, traverser);
        // (typechecking an interface doesn't work, ie "displayObject instanceof IEntity" is impossible)
        if (displayObject._iCollectRenderables) {
            var entity = (displayObject);
            entity["node2D"].acceptTraverser(traverser);
        }
    };
    Partition2DNode.prototype.traverseChildren = function (container, traverser) {
        var len = container.numChildren;
        for (var i = 0; i < len; ++i)
            this.traverseSceneGraph(container.getChildAt(i), traverser);
    };
    Partition2DNode.prototype.iAddNode = function (node) {
        _super.prototype.iAddNode.call(this, node);
        // HORRIBLE:
        var entityNode = (node);
        entityNode.entity["node2D"] = node;
    };
    return Partition2DNode;
})(NodeBase);
module.exports = Partition2DNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1wbGF5ZXIvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb24yRE5vZGUudHMiXSwibmFtZXMiOlsiUGFydGl0aW9uMkROb2RlIiwiUGFydGl0aW9uMkROb2RlLmNvbnN0cnVjdG9yIiwiUGFydGl0aW9uMkROb2RlLmFjY2VwdFRyYXZlcnNlciIsIlBhcnRpdGlvbjJETm9kZS50cmF2ZXJzZVNjZW5lR3JhcGgiLCJQYXJ0aXRpb24yRE5vZGUudHJhdmVyc2VDaGlsZHJlbiIsIlBhcnRpdGlvbjJETm9kZS5pQWRkTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxzQkFBc0IsV0FBVyxzREFBc0QsQ0FBQyxDQUFDO0FBQ2hHLElBQU8sUUFBUSxXQUFXLHVDQUF1QyxDQUFDLENBQUM7QUFHbkUsSUFBTSxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUFpQkE7SUFJbENBLFNBSkVBLGVBQWVBLENBSUxBLElBQWtCQTtRQUUxQkMsaUJBQU9BLENBQUNBO1FBQ1JBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVNRCx5Q0FBZUEsR0FBdEJBLFVBQXVCQSxTQUF1QkE7UUFFMUNFLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1FBQ25EQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUVERiwyREFBMkRBO0lBQ3BEQSw0Q0FBa0JBLEdBQXpCQSxVQUEwQkEsYUFBaUJBLEVBQUVBLFNBQXVCQTtRQUVoRUcsQUFDQUEsb0RBRG9EQTtRQUNwREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsWUFBWUEsc0JBQXNCQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUF5QkEsYUFBYUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFNUVBLEFBQ0FBLGdHQURnR0E7UUFDaEdBLEVBQUVBLENBQUNBLENBQUNBLGFBQWFBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLElBQUlBLE1BQU1BLEdBQVlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3RDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxlQUFlQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUNoREEsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFFT0gsMENBQWdCQSxHQUF4QkEsVUFBeUJBLFNBQWdDQSxFQUFFQSxTQUF1QkE7UUFFOUVJLElBQUlBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBO1FBRWhDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUNwRUEsQ0FBQ0E7SUFFTUosa0NBQVFBLEdBQWZBLFVBQWdCQSxJQUFhQTtRQUV6QkssZ0JBQUtBLENBQUNBLFFBQVFBLFlBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3JCQSxBQUNBQSxZQURZQTtZQUNSQSxVQUFVQSxHQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNwQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBQ0xMLHNCQUFDQTtBQUFEQSxDQTlDQSxBQThDQ0EsRUE5QzZCLFFBQVEsRUE4Q3JDO0FBQ0QsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJmbC9wYXJ0aXRpb24vUGFydGl0aW9uMkROb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF19