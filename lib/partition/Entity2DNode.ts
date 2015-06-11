import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");

import AxisAlignedBoundingBox2D		= require("awayjs-player/lib/bounds/AxisAlignedBoundingBox2D");

/**
 * @class away.partition.EntityNode
 */
class Entity2DNode extends EntityNode
{
	public static id:string = "entity2DNode";

	/**
	 * @inheritDoc
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		if (!this._entity._iIsVisible())
			return false;

		var pickingCollisionVO:PickingCollisionVO = this._entity._iPickingCollisionVO;
		pickingCollisionVO.localRayPosition = this._entity.inverseSceneTransform.transformVector(rayPosition);
		pickingCollisionVO.localRayDirection = this._entity.inverseSceneTransform.deltaTransformVector(rayDirection);

		if (!pickingCollisionVO.localNormal)
			pickingCollisionVO.localNormal = new Vector3D();

		var rayEntryDistance:number = this._bounds.rayIntersection(pickingCollisionVO.localRayPosition, pickingCollisionVO.localRayDirection, pickingCollisionVO.localNormal);

		if (rayEntryDistance < 0)
			return false;

		pickingCollisionVO.rayEntryDistance = rayEntryDistance - this._entity.zOffset;
		pickingCollisionVO.rayPosition = rayPosition;
		pickingCollisionVO.rayDirection = rayDirection;
		pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;

		return true;
	}


	public updateBounds()
	{
		//hardcode to AxisAlignedBoundingBox2D for the intersection
		this._bounds = new AxisAlignedBoundingBox2D(this._entity);

		this.updateDebugEntity();
	}
}

export = Entity2DNode;