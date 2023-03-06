
import { _decorator, Component, Node, misc } from 'cc';
import { GameConstants } from './GameConstants';
const { ccclass, property } = _decorator;

@ccclass('CameraMovement')
export class CameraMovement extends Component {

    @property(Node)
    Player_Node : any;    

    update (deltaTime: number) {

        // let target_position = this.Player_Node.getPosition();
        // let current_position = this.node.getPosition();

        // current_position.lerp( target_position , 0.1);

        // this.node.setPosition(current_position);
    }
}

