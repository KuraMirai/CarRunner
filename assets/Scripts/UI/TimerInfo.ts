
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

    onEnable() {
        EventManager.on(GameConstants.START_GAME, this.StartGame, this)
    }

    onDisable() {
        EventManager.off(GameConstants.START_GAME, this.StartGame, this)
    }

    public StartGamePreview() {
        if (this.timerStarted)
            this.unschedule(this.TimerTick);
        this.gameTimer = 0;
        this.infoLabel.string = "0";
    }

    public StartGame() {
        this.StartTimer();
    }

    StartTimer() {
        this.timerStarted = true;
        this.schedule(this.TimerTick, 1, GameConstants.GAME_DURATION, 0);
    }

    TimerTick() {
        this.gameTimer++;
        if (this.gameTimer == GameConstants.GAME_DURATION) {
            EventManager.dispatchEvent(GameConstants.END_GAME);
            this.timerStarted = false;
        }
        this.infoLabel.string = this.gameTimer.toString();
    }
}


