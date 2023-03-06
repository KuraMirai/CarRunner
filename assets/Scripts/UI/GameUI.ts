
import { _decorator, Component, Node } from 'cc';
import { EventManager } from '../EventManager';
import { GameOverMenu } from './GameOverMenu';
import { InGameMenu } from './InGameMenu';
import { StartGameMenu } from './StartGameMenu';
import { TimerInfo } from './TimerInfo';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
    @property(StartGameMenu)
    startGameMenu!: StartGameMenu;
    @property(InGameMenu)
    inGameMenu!: InGameMenu;
    @property(GameOverMenu)
    gameOverMenu!: GameOverMenu;

    start () {            
        //this.startGameMenu.Show();
        EventManager.on("StartGame", this.StartGame, this)
        EventManager.on("Replay", this.Replay, this)
        EventManager.on("GameOver", this.GameOver, this)
    }
    
    StartGame()
    {
        this.startGameMenu.Hide();
        this.inGameMenu.Show();  
    }

    GameOver()
    {
        this.gameOverMenu.Show();
        this.inGameMenu.Hide();
    }

    Replay()
    {
        this.gameOverMenu.Hide();
        this.inGameMenu.Show();
    }
}

