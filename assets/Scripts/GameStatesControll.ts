import { _decorator, Component, Node, UITransform } from 'cc';
import { EventManager } from './EventManager';
import { GameConstants } from './GameConstants';
const { ccclass, property } = _decorator;

@ccclass('GameStatesControll')
export class GameStatesControll extends Component {
    @property(UITransform)
    gameView!: UITransform;

    start() {

        EventManager.on(GameConstants.START_GAME_PREVIEW, this.StartGame, this)
        EventManager.on(GameConstants.REPLAY, this.StartGame, this)
        EventManager.on(GameConstants.GAME_OVER, this.GameOver, this)
    }

    private StartGame() {
        this.gameView.node.active = true;
    }

    private GameOver()
    {
        this.gameView.node.active = false;
    }
}
