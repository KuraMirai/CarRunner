
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FinishLine')
export class FinishLine extends Component {
    @property
    private speed = 0;

    update(deltaTime: number) {
            this.node.position = this.node.position.subtract(new Vec3(2 * this.speed, -this.speed, 0));
    }
}


