import { Collider2D, IPhysics2DContact } from "cc";

export interface ICollidable {
    start(): void;
    onBEGIN_CONTACT(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void;
}
