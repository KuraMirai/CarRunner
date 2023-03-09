
import { _decorator, Component, Node } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
const { ccclass, property } = _decorator;

@ccclass('LoadingScreenMenu')
export class LoadingScreenMenu extends Component {

    isCompleted = false;

    public Show(): void {
        if (this.isCompleted) {
            EventManager.dispatchEvent(GameConstants.START_GAME_PREVIEW)
            return;
        }
        this.node.active = true;
        this.schedule(() => {
            EventManager.dispatchEvent(GameConstants.START_GAME_PREVIEW);
            this.Hide()
        }, GameConstants.LOADING_DURATION, 1, 0);
    }

    public Hide(): void {
        this.node.active = false;
    }
}

