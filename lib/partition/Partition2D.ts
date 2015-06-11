import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DisplayObject = require("awayjs-display/lib/containers/DisplayObjectContainer");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import Partition = require("awayjs-display/lib/partition/Partition");

import Entity2DNode					= require("awayjs-player/lib/partition/Entity2DNode");
import Partition2DNode = require("awayjs-player/lib/partition/Partition2DNode");
import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");


class Partition2D extends Partition
{
    private _entity2DNodePool:EntityNodePool;

    constructor(root:DisplayObject)
    {
        super(new Partition2DNode(root));

        this._entity2DNodePool = new EntityNodePool(Entity2DNode, this);
    }

    /**
     * @internal
     */
    public _iRegisterEntity(entity:IEntity)
    {
        this.iMarkForUpdate(this._entity2DNodePool.getItem(entity));
    }


    /**
     * @internal
     */
    public _iUnregisterEntity(entity:IEntity)
    {
        this.iRemoveEntity(this._entity2DNodePool.disposeItem(entity));
    }
}
export = Partition2D;