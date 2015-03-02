import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import NodeBase = require("awayjs-display/lib/partition/NodeBase");
import EntityNode = require("awayjs-display/lib/partition/EntityNode");

class Partition2DNode extends NodeBase
{
    private _root : DisplayObject;

    constructor(root:DisplayObject)
    {
        super();
        this._root = root;
    }

    public acceptTraverser(traverser:CollectorBase)
    {
        if (traverser.enterNode(this)) {
            this.traverseSceneGraph(this._root, traverser);
        }
    }

    // pass any so we can convert to IEntity. Sigh, TypeScript.
    public traverseSceneGraph(displayObject:any, traverser:CollectorBase)
    {
        // typechecking is nasty, but we have little choice:
        if (displayObject instanceof DisplayObjectContainer)
            this.traverseChildren(<DisplayObjectContainer>displayObject, traverser);

        // (typechecking an interface doesn't work, ie "displayObject instanceof IEntity" is impossible)
        if (displayObject._iCollectRenderables) {
            var entity = <IEntity>(displayObject);
            entity["node2D"].acceptTraverser(traverser);
        }
    }

    private traverseChildren(container:DisplayObjectContainer, traverser:CollectorBase)
    {
        var len = container.numChildren;

        for (var i = 0; i < len; ++i)
            this.traverseSceneGraph(container.getChildAt(i), traverser);
    }

    public iAddNode(node:NodeBase)
    {
        super.iAddNode(node);
        // HORRIBLE:
        var entityNode = <EntityNode>(node);
        entityNode.entity["node2D"] = node;
    }
}
export = Partition2DNode;