import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { AxisAlignedBoundingBox } from "@awayjs/display/lib/bounds/AxisAlignedBoundingBox";
import { IEntity } from "@awayjs/display/lib/display/IEntity";
/**
 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
 * This is useful for most meshes.
 */
export declare class AxisAlignedBoundingBox2D extends AxisAlignedBoundingBox {
    /**
     * Creates a new <code>AxisAlignedBoundingBox</code> object.
     */
    constructor(entity: IEntity);
    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
}
