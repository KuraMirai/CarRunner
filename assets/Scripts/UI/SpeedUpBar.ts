
import { _decorator, Component, Node, Color, Gradient, eventManager, ProgressBar } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
const { ccclass, property } = _decorator;

@ccclass('SpeedUpBar')
export class SpeedUpBar extends Component {
    @property(ProgressBar)
    fuelProgressBar!: ProgressBar;

    static isSpeedUp = false;

    start() {
        EventManager.on("AddFuel", this.onAddFuel, this)
    }

    public StartGame() {
        this.fuelProgressBar.progress = 0;
        this.unschedule(this.ProgressTick);
    }

    onAddFuel() {
        if (SpeedUpBar.isSpeedUp)
            return;

        this.fuelProgressBar.progress += 0.1;
        if (this.fuelProgressBar.progress >= 0.98)
            this.SpeedUp();
    }

    SpeedUp() {
        SpeedUpBar.isSpeedUp = true;
        EventManager.dispatchEvent("SpeedUp");
        this.schedule(this.ProgressTick, 0.5, GameConstants.SPEED_UP_DURATION * 2, 0);
    }

    ProgressTick() {
        this.fuelProgressBar.progress -= 0.0625;
        if (this.fuelProgressBar.progress  <= 0) {
            SpeedUpBar.isSpeedUp = false;
            EventManager.dispatchEvent("EndSpeedUp");
        }
    }
}

