
import { _decorator, Component, Node, Animation } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
import { FuelInfo } from './FuelInfo';
import { IWindow } from './IWindow';
import { SpeedUpBar } from './SpeedUpBar';
import { TimerInfo } from './TimerInfo';
const { ccclass, property } = _decorator;

@ccclass('InGameMenu')
export class InGameMenu extends Component implements IWindow {

    @property(FuelInfo)
    fuelInfo!: FuelInfo;
    @property(SpeedUpBar)
    speedUpBar!: SpeedUpBar;
    @property(TimerInfo)
    timerInfo!: TimerInfo;
    @property(Animation)
    rideText!: Animation;
    @property(Animation)
    timeEndedText!: Animation;

    
    onEnable() {
        EventManager.on(GameConstants.START_STARTUP_TEXT, this.ShowRideText, this);
        EventManager.on(GameConstants.END_GAME, this.ShowTimeEndedText, this);
        this.rideText.on(Animation.EventType.STOP, this.HideRideText, this);
        this.timeEndedText.on(Animation.EventType.STOP, this.HideTimeEndedText, this);
    }

    onDisable() {
        EventManager.off(GameConstants.START_STARTUP_TEXT,  this.ShowRideText, this);
        EventManager.off(GameConstants.END_GAME, this.ShowTimeEndedText, this);
        this.rideText.off(Animation.EventType.STOP, this.HideRideText, this);
        this.timeEndedText.off(Animation.EventType.STOP, this.HideTimeEndedText, this);
    }

    public Show(): void {
        this.node.active = true;
        this.fuelInfo.StartGamePreview();
        this.speedUpBar.StartGamePreview();
        this.timerInfo.StartGamePreview();
    }

    public Hide(): void {
        this.node.active = false;
    }

    ShowRideText()
    {
        this.rideText.node.active = true;
        this.rideText.play();
    }

    HideRideText()
    {
        this.rideText.node.active = false;
    }

    ShowTimeEndedText()
    {
        this.timeEndedText.node.active = true;
        this.timeEndedText.play();
    }

    HideTimeEndedText()
    {
        this.timeEndedText.node.active = false;
    }
}

