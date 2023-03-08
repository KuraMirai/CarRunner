
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

    
    onEnable() {
        EventManager.on(GameConstants.START_STARTUP_TEXT, this.ShowText, this);
    }

    onDisable() {
        EventManager.off(GameConstants.START_STARTUP_TEXT, this.ShowText, this);
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

    ShowText()
    {
        this.rideText.node.active = true;
    }
}

