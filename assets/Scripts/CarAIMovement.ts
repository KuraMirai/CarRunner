
import { _decorator, Component, Node, RigidBody2D, Vec2, Vec3, Collider, ICollisionEvent, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CarAIMovement')
export class CarAIMovement extends Component {
    @property(RigidBody2D)
    rigidbody!: RigidBody2D;
    @property
    private velocity_Max_X = 0;
    @property
    private velocity_Max_Y = 0;
    @property
    private speed = 0;

    lane = 0;

    Init(lane: number) {
        this.lane = lane;
    }      

    update(dt: number) {
        this.UpdateMove(dt);
    }

    UpdateMove(dt: number) {
        // if (this.node.position.x <= -2395 && this.node.position.y >= 1180) {
        //     let newPosition = new Vec3(2395, -1180);
        //     this.node.setPosition(newPosition)
        // }
        // if ((-this.rigidbody.linearVelocity.x < this.velocity_Max_X) || (this.rigidbody.linearVelocity.y < this.velocity_Max_Y)) {
            // this.rigidbody.applyForceToCenter(new Vec2(-2 * this.speed, this.speed), true);
            this.rigidbody.wakeUp();
            this.node.position = this.node.position.subtract(new Vec3(2 * this.speed, -this.speed, 0));

        // }
    }   
}

