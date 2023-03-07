
import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Vec2, Vec3, UIOpacity } from 'cc';
import { CarAIMovement } from './CarAIMovement';
import { EventManager } from './EventManager';
import { GameConstants } from './GameConstants';
import { ICollidable } from './ICollidable';
import { PlayerCar } from './PlayerCar';
import { SpeedUpBar } from './UI/SpeedUpBar';
const { ccclass, property } = _decorator;

@ccclass('CarAI')
export class CarAI extends Component implements ICollidable {
    @property(CarAIMovement)
    carMovement!: CarAIMovement;
    @property(UIOpacity)
    carOpacity!: UIOpacity;
    @property(Collider2D)
    collider!: Collider2D;

    start() {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBEGIN_CONTACT, this);
        EventManager.on("SpeedUp", this.SpeedUp, this)
        EventManager.on("EndSpeedUp", this.EndSpeedUp, this)
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
            this.carMovement.SpeedUp();
        }
    }

    onBEGIN_CONTACT(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let nodeEnemy = otherCollider.node;

        let playerCar = nodeEnemy.getComponent('PlayerCar') as PlayerCar;
        if (playerCar) {
            playerCar.Hit();
        }
    }

    public SpeedUp() {
        this.carOpacity.opacity = 128;
    }

    public EndSpeedUp() {
        this.carOpacity.opacity = 255;
    }

}



