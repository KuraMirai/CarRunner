
import { _decorator, Component, Node, Animation } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
const { ccclass, property } = _decorator;

@ccclass('TutorialMenu')
export class TutorialMenu extends Component {
    @property(Animation)
    tutorialAnimation!: Animation;

    isCompleted = false;

    onEnable () {
        // subscribe to the custom event on the observer node
        this.node.on(GameConstants.SWIPED_UP, this.StartGame, this);
        this.node.on(GameConstants.SWIPED_DOWN, this.StartGame, this);
    }

    onDisable () {
        // unsubscribe from the custom event on the observer node to prevent memory leaks
        this.node.off(GameConstants.SWIPED_UP, this.StartGame, this);
        this.node.off(GameConstants.SWIPED_DOWN, this.StartGame, this);
    }

    StartGame()
    {
        this.isCompleted = true;
        EventManager.dispatchEvent(GameConstants.START_STARTUP_TEXT);
        EventManager.dispatchEvent(GameConstants.START_GAME);
        this.Hide();
    }

    public Show(): void {
        if(this.isCompleted)
        {
            EventManager.dispatchEvent(GameConstants.START_STARTUP_TEXT);
            EventManager.dispatchEvent(GameConstants.START_GAME);
            return;
        }
        this.node.active = true;
        this.tutorialAnimation.play();
    }

    public Hide(): void {
        this.node.active = false;
    }
}

