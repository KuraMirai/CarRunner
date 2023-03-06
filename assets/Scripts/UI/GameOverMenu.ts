
import { _decorator, Component, Node, Label } from 'cc';
import { EventManager } from '../EventManager';
import { FuelInfo } from './FuelInfo';
import { IWindow } from './IWindow';
const { ccclass, property } = _decorator;

@ccclass('GameOverMenu')
export class GameOverMenu extends Component implements IWindow{

    @property(Label)
    scoreLabel!: Label;
    start () {

    }

    public Show(): void {
        this.node.active = true;
        this.scoreLabel.string = FuelInfo.fuelCounter.toString();
    }

    public Hide(): void {
        this.node.active = false;
    }

    public Replay()
    {
        EventManager.dispatchEvent("Replay");
    }
}
