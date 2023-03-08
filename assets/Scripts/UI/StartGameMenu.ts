
import { _decorator, Component, Node } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
import { IWindow } from './IWindow';
const { ccclass, property } = _decorator;

@ccclass('StartGameMenu')
export class StartGameMenu extends Component implements IWindow {

    public Show(): void {
        this.node.active = true;
    }
    public Hide(): void {
        this.node.active = false;
    }
    
    public StartGamePreview()
    {
        EventManager.dispatchEvent(GameConstants.START_GAME_PREVIEW);
    }

}


