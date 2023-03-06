import { _decorator, Component, Node, UITransform } from 'cc';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('GameStatesControll')
export class GameStatesControll extends Component {
    @property(UITransform)
    gameView!: UITransform;

    start() {

        EventManager.on("StartGame", this.StartGame, this)
        EventManager.on("Replay", this.StartGame, this)
        EventManager.on("GameOver", this.GameOver, this)
    }

    private StartGame() {
        this.gameView.node.active = true;
    }

    private GameOver()
    {
        this.gameView.node.active = false;
    }
}
