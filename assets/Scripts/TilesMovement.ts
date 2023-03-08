import { CCFloat, Component, game, RigidBody2D, Sprite, UIOpacity, UITransform, Vec2, Vec3, _decorator } from "cc";
import { EventManager } from "./EventManager";
import { GameConstants } from "./GameConstants";

const { ccclass, property } = _decorator;

@ccclass('TilesMovement')
export class TilesMovement extends Component {

    // @property(RigidBody2D)
    // rigidBody2D: any;
    @property(RigidBody2D)
    roadTiles: RigidBody2D[] = [];
    @property
    private velocity_Max_X = 0;
    @property
    private velocity_Max_Y = 0;
    @property
    private velocity_speedUp_Max_X = 0;
    @property
    private velocity_speedUp_Max_Y = 0;
    @property
    private speed = 0;
    
    speedMultiplier = 1;

    start() {
        EventManager.on(GameConstants.SPEED_UP, this.SpeedUp, this)
        EventManager.on(GameConstants.END_SPEED_UP, this.EndSpeedUp, this)        
    }
    
    update(deltaTime: number) {
        for (let i = 0; i < this.roadTiles.length; i++) {
            if (this.roadTiles[i].node.position.x <= -2370 && this.roadTiles[i].node.position.y >= 1185) {
                let newPosition = new Vec3(2370, -1176);
                this.roadTiles[i].node.setPosition(newPosition)
            }
            if ((-this.roadTiles[i].linearVelocity.x < this.velocity_Max_X) || (this.roadTiles[i].linearVelocity.y < this.velocity_Max_Y)) {
                //this.roadTiles[i].applyForceToCenter(new Vec2(-2 * this.speed, this.speed), true);
                 this.roadTiles[i].node.position = this.roadTiles[i].node.position.subtract(new Vec3(2 * this.speed * this.speedMultiplier, -this.speed * this.speedMultiplier, 0));  
            }   
        }    
    }

    public SpeedUp()
    {
        this.speedMultiplier = GameConstants.SPEED_UP_MULTIPLIER;
    }

    public EndSpeedUp()
    {
        this.speedMultiplier = 1;
    }
}
