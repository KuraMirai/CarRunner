
import { _decorator, Component, Node } from 'cc';
import { FuelInfo } from './FuelInfo';
import { IWindow } from './IWindow';
import { TimerInfo } from './TimerInfo';
const { ccclass, property } = _decorator;

@ccclass('InGameMenu')
export class InGameMenu extends Component implements IWindow {

    @property(TimerInfo)
    timerInfo!: TimerInfo;
     @property(FuelInfo)
    fuelInfo!: FuelInfo;

    public Show(): void {
        this.node.active = true;
        this.timerInfo.StartGame();
        this.fuelInfo.StartGame();
    }

    public Hide(): void {
        this.node.active = false;
    }
}

