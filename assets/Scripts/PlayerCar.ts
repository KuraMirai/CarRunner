
import { _decorator, Component, Node, Vec3, Sprite, UIOpacity } from 'cc';
import { CarMovement } from './CarMovement';
import { EventManager } from './EventManager';
import { GameConstants } from './GameConstants';
import { PlayerVfx } from './PlayerVfx';
const { ccclass, property } = _decorator;

@ccclass('PlayerCar')
export class PlayerCar extends Component {

    @property(CarMovement)
    carMovement!: CarMovement;
    @property(PlayerVfx)
    playerVfx!: PlayerVfx;

    isInvinciple = false;

    start() {
        EventManager.on("StartGame", this.StartGame, this)
        EventManager.on("Replay", this.StartGame, this)
        EventManager.on("SpeedUp", this.SpeedUp, this)
        EventManager.on("EndSpeedUp", this.EndSpeedUp, this)
    }

    StartGame() {
        this.carMovement.Init(GameConstants.ROAD_LANE_MID);
        this.node.setPosition(Vec3.ZERO);
        this.CancelInvinciple();
    }

    public Hit() {
        if (this.isInvinciple)
        return;

        this.MakeInvinciple();
        this.playerVfx.PlayHitAnimation();
        EventManager.dispatchEvent("RemoveFuel");
    }

    public SpeedUp()
    {
        this.isInvinciple = true;
        this.playerVfx.PlaySpeedUpAnimation();
    }

    public EndSpeedUp()
    {
        this.isInvinciple = false;
        this.playerVfx.StopSpeedUpAnimation();
    }

    public AddFuel() {
        this.playerVfx.PlayFuelAnimation();
        EventManager.dispatchEvent("AddFuel");
    }

    MakeInvinciple() {
        this.isInvinciple = true;
        this.playerVfx.MakeInvinciple();
        this.scheduleOnce(this.CancelInvinciple, GameConstants.PLAYER_INVINCIPLE_DURATION);
    }

    CancelInvinciple() {
        if (!this.isInvinciple)
            return;

        this.isInvinciple = false;
        this.playerVfx.CancelInvinciple();
        this.unschedule(this.CancelInvinciple);
    }
}

