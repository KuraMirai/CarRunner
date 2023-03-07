
import { _decorator, Component, Node, Label } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
const { ccclass, property } = _decorator;

@ccclass('FuelInfo')
export class FuelInfo extends Component {
    
    @property(Label)
    infoLabel!:Label;
    static fuelCounter = 0;

    start () {
        EventManager.on("AddFuel", this.AddFuel,this);
        EventManager.on("RemoveFuel", this.RemoveFuel,this);
    }

    public StartGamePreview()
    {
        FuelInfo.fuelCounter = 0;
        this.infoLabel.string = FuelInfo.fuelCounter.toString();
    }

    AddFuel()
    {
        FuelInfo.fuelCounter += 10;
        FuelInfo.fuelCounter = Math.min(Math.max(FuelInfo.fuelCounter, 0), 300);
        this.infoLabel.string = FuelInfo.fuelCounter.toString();
    }

    RemoveFuel()
    {
        FuelInfo.fuelCounter -= 5;
        FuelInfo.fuelCounter = Math.min(Math.max(FuelInfo.fuelCounter, 0), 300);
        this.infoLabel.string = FuelInfo.fuelCounter.toString();
    }
}
