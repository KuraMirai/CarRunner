
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
    isSpeedUpInvinciple = false;

    start() {       
        EventManager.on(GameConstants.START_GAME, this.StartGame, this)
        EventManager.on(GameConstants.SPEED_UP, this.SpeedUp, this)
        EventManager.on(GameConstants.END_SPEED_UP, this.EndSpeedUp, this)
        EventManager.on(GameConstants.END_GAME, this.EndGame, this)
    }

    onEnable()
    {
        this.StartGamePreview();
    }
    
    StartGamePreview()
    {
        this.carMovement.StartGamePreview();
    }

    StartGame() {
        this.CancelInvinciple();
    }

    EndGame()
    {
        this.carMovement.EndGamePreview();
        this.CancelInvinciple();
        this.isInvinciple = true;
    }

    public Hit() {
        if (this.isInvinciple || this.isSpeedUpInvinciple)
        return;

        this.MakeInvinciple();
        this.playerVfx.PlayHitAnimation();
        EventManager.dispatchEvent(GameConstants.REMOVE_FUEL);
    }

    public SpeedUp()
    {
        this.isSpeedUpInvinciple = true;
        this.playerVfx.PlaySpeedUpAnimation();
    }

    public EndSpeedUp()
    {
        this.isSpeedUpInvinciple = false;
        this.playerVfx.StopSpeedUpAnimation();
    }

    public AddFuel() {
        this.playerVfx.PlayFuelAnimation();
        EventManager.dispatchEvent(GameConstants.ADD_FUEL);
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

