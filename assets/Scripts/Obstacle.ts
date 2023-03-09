import { _decorator, Component, Node, Collider2D, IPhysics2DContact, Contact2DType, Vec2, Vec3, RigidBody2D, UIOpacity } from 'cc';
import { EventManager } from './EventManager';
import { GameConstants } from './GameConstants';
import { ICollidable } from './ICollidable';
import { PlayerCar, PlayerHitType } from './PlayerCar';
import { SpeedUpBar } from './UI/SpeedUpBar';
const { ccclass, property } = _decorator;

@ccclass('Obstacle')
export class Obstacle extends Component implements ICollidable {
    @property(Collider2D)
    collider!: Collider2D;
    @property(RigidBody2D)
    rb!: RigidBody2D;
    @property(UIOpacity)
    obstacleOpacity!: UIOpacity;
    @property
    private velocity_Max_X = 0;
    @property
    private velocity_Max_Y = 0;
    @property
    private speed = 0;

    speedMultiplier = 1;

    start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBEGIN_CONTACT, this);
        EventManager.on(GameConstants.SPEED_UP, this.SpeedUp, this)
        EventManager.on(GameConstants.END_SPEED_UP, this.EndSpeedUp, this)
    }

    update(deltaTime: number) {
        // if ((-this.rb.linearVelocity.x < this.velocity_Max_X) || (this.rb.linearVelocity.y < this.velocity_Max_Y)) {
        //this.rb.applyForceToCenter(new Vec2(-2 * this.speed, this.speed), true);
        // }
        this.rb.wakeUp();
        this.node.position = this.node.position.subtract(new Vec3(2 * this.speed * this.speedMultiplier, -this.speed * this.speedMultiplier, 0));
    }

    public SpeedUp() {
        this.speedMultiplier = GameConstants.SPEED_UP_MULTIPLIER;
        if (this.obstacleOpacity != null)
            this.obstacleOpacity.opacity = 128;
    }

    public EndSpeedUp() {
        this.speedMultiplier = 1;
        if (this.obstacleOpacity != null)
            this.obstacleOpacity.opacity = 255;
    }

    public Spawn(offset: Vec3, lane: number) {

        switch (lane) {
            case 0:
                this.node.setPosition(offset.add(new Vec3(GameConstants.ROAD_MID_POSITION.x, GameConstants.ROAD_MID_POSITION.y)))
                break;
            case 1:
                this.node.setPosition(offset.add(new Vec3(GameConstants.ROAD_TOP_POSITION.x, GameConstants.ROAD_TOP_POSITION.y)))
                break;
            case -1:
                this.node.setPosition(offset.add(new Vec3(GameConstants.ROAD_BOT_POSITION.x, GameConstants.ROAD_BOT_POSITION.y)))
                break;
        }
        if (SpeedUpBar.isSpeedUp) {
            this.SpeedUp()
        }
    }

    onBEGIN_CONTACT(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        let nodeEnemy = otherCollider.node;

        let playerCar = nodeEnemy.getComponent('PlayerCar') as PlayerCar;
        if (playerCar) {
            playerCar.Hit(PlayerHitType.Obstacle);
        }
    }
}
