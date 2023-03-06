
import { _decorator, Component, Node, Vec3, Sprite, UIOpacity } from 'cc';
import { CarMovement } from './CarMovement';
import { EventManager } from './EventManager';
import { GameConstants } from './GameConstants';
const { ccclass, property } = _decorator;

@ccclass('PlayerCar')
export class PlayerCar extends Component {

    @property(CarMovement)
    carMovement!: CarMovement;
    @property(UIOpacity)
    carOpacity!: UIOpacity;

    isInvinciple = false;

    start() {
        EventManager.on("StartGame", this.StartGame, this)
        EventManager.on("Replay", this.StartGame, this)
    }

    StartGame() {
        this.carMovement.Init(GameConstants.ROAD_LANE_MID);
        this.node.setPosition(Vec3.ZERO);
        this.CancelInvinciple();
        this.unschedule(this.CancelInvinciple);
    }

    public Hit() {
        this.SetInvinciple();
    }

    SetInvinciple() {
        if (this.isInvinciple)
            return;
        this.MakeInvinciple();
    }

    MakeInvinciple() {
        this.isInvinciple = true;
        this.carOpacity.opacity = 128;

        this.scheduleOnce(this.CancelInvinciple, GameConstants.PLAYER_INVINCIPLE_DURATION);
    }

    CancelInvinciple() {
        if (!this.isInvinciple)
            return;

        this.isInvinciple = false;
        this.carOpacity.opacity = 255;
    }
}

