
import { _decorator, Component, Node } from 'cc';
import { FuelInfo } from './FuelInfo';
import { IWindow } from './IWindow';
import { SpeedUpBar } from './SpeedUpBar';
import { TimerInfo } from './TimerInfo';
const { ccclass, property } = _decorator;

@ccclass('InGameMenu')
export class InGameMenu extends Component implements IWindow {

    @property(TimerInfo)
    timerInfo!: TimerInfo;
     @property(FuelInfo)
    fuelInfo!: FuelInfo;
    @property(SpeedUpBar)
    speedUpBar!: SpeedUpBar;

    public Show(): void {
        this.node.active = true;
        this.timerInfo.StartGame();
        this.fuelInfo.StartGame();
        this.speedUpBar.StartGame();
    }

    public Hide(): void {
        this.node.active = false;
    }
}

