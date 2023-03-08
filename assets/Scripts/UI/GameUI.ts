
import { _decorator, Component, Node } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
import { GameOverMenu } from './GameOverMenu';
import { InGameMenu } from './InGameMenu';
import { StartGameMenu } from './StartGameMenu';
import { TimerInfo } from './TimerInfo';
import { TutorialMenu } from './TutorialMenu';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
    @property(StartGameMenu)
    startGameMenu!: StartGameMenu;
    @property(InGameMenu)
    inGameMenu!: InGameMenu;
    @property(GameOverMenu)
    gameOverMenu!: GameOverMenu;
    @property(TutorialMenu)
    tutorialMenu!: TutorialMenu;

    start () {            
        EventManager.on(GameConstants.START_GAME_PREVIEW, this.StartGamePreview, this)
        EventManager.on(GameConstants.REPLAY, this.Replay, this)
        EventManager.on(GameConstants.GAME_OVER, this.GameOver, this)
        EventManager.on(GameConstants.SHOW_TUTORIAL, this.ShowTutorial, this)
    }
    
    ShowTutorial()
    {
        this.tutorialMenu.Show();
    }

    StartGamePreview()
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

