import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DisplayObject = require("awayjs-display/lib/containers/DisplayObjectContainer");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import Partition = require("awayjs-display/lib/partition/Partition");
import Partition2DNode = require("awayjs-player/lib/partition/Partition2DNode");


class Partition2D extends Partition
{
    constructor(root:DisplayObject)
    {
        super(new Partition2DNode(root));
    }
}
export = Partition2D;