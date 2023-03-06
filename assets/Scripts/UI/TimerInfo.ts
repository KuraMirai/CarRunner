
import { _decorator, Component, Node, Label } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
const { ccclass, property } = _decorator;

@ccclass('TimerInfo')
export class TimerInfo extends Component {

    @property(Label)
    infoLabel!: Label;
    gameTimer: number = -1;
    timerStarted = false;

    public StartGame() {
        this.StartTimer();
    }

    StartTimer() {
        if (this.timerStarted)
            this.unschedule(this.TimerTick);

        this.timerStarted = true;
        this.gameTimer = 0;
        this.infoLabel.string = "0";
        this.schedule(this.TimerTick, 1, GameConstants.GAME_DURATION, 0);
    }

    TimerTick() {
        this.gameTimer++;
        if (this.gameTimer == 20) {
            EventManager.dispatchEvent("GameOver");
        }
        this.infoLabel.string = this.gameTimer.toString();
    }
}


