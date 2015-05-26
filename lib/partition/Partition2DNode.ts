import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import NodeBase = require("awayjs-display/lib/partition/NodeBase");
import EntityNode = require("awayjs-display/lib/partition/EntityNode");

// Warning: contains horrible hacks
class Partition2DNode extends NodeBase
{
    private _root : DisplayObject;
    private _maskConfigID : number;
    private _index : number;

    constructor(root:DisplayObject)
    {
        super();
        this._root = root;
    }

    public acceptTraverser(traverser:CollectorBase)
    {
        this._maskConfigID = 0;
        this._index = 0;
        if (traverser.enterNode(this)) {
            this.traverseSceneGraph(this._root, traverser);
        }
    }

    // pass any so we can convert to IEntity. Sigh, TypeScript.
    public traverseSceneGraph(displayObject:any, traverser:CollectorBase, maskID:number = -1, appliedMasks:DisplayObject[] = null)
    {
        //console.log(displayObject.name);
        if (displayObject._iMaskID !== -1) {
            if (maskID !== -1) throw "masks within masker currently not supported";
            maskID = displayObject._iMaskID;

            // TODO: this could be implemented similar to implicit mouse enabled, partition, and other parent-child-propagated properties
            // just not sure if we want to keep it like this
        }
        else {
            //console.log(displayObject._iMasks);
            if (displayObject._iMasks) {
                appliedMasks = appliedMasks? appliedMasks.concat(displayObject._iMasks) : displayObject._iMasks;
                // signify that applied masks have changed
                ++this._maskConfigID;
            }
        }

        displayObject["hierarchicalMaskID"] = maskID;
        displayObject["hierarchicalMasks"] = appliedMasks;
        displayObject["maskConfigID"] = appliedMasks? this._maskConfigID : 0;

        // moving back up the tree, mask will change again
        if (displayObject._iMasks)
            ++this._maskConfigID;

        // typechecking is nasty, but we have little choice:
        if (displayObject instanceof DisplayObjectContainer)
            this.traverseChildren(<DisplayObjectContainer>displayObject, traverser, maskID, appliedMasks);

        if (displayObject.isEntity) {
            var entity : IEntity = <IEntity>displayObject;
            entity.zOffset = ++this._index;
            entity["node2D"].acceptTraverser(traverser);
        }
    }

    private traverseChildren(container:DisplayObjectContainer, traverser:CollectorBase, maskID:number, appliedMasks:DisplayObject[])
    {
        var len = container.numChildren;

        for (var i = 0; i < len; ++i)
            this.traverseSceneGraph(container.getChildAt(i), traverser, maskID, appliedMasks);
    }

    public iAddNode(node:NodeBase)
    {
        super.iAddNode(node);
        var entityNode = <EntityNode>(node);
        entityNode.entity["node2D"] = node;
    }
}
export = Partition2DNode;