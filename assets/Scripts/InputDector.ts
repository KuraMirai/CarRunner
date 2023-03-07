import { _decorator, Component, Node, Vec2, Canvas } from 'cc';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('InputDector')
export class InputDector extends Component {

  @property(Node)
  carMovement!: Node;
  @property(Node)
  tutorialNode!: Node;

  MIN_SWIPE_DISTANCE = 5; // Minimum distance to be considered a swipe
  touchStartPos: Vec2 = new Vec2;
  touchEndPos: Vec2 = new Vec2;


  // Register touch event listeners
  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  onTouchStart(event: { getLocation: () => Vec2; }) {
    this.touchStartPos = event.getLocation();
  }

  onTouchEnd(event: { getLocation: () => Vec2; }) {
    // Calculate the distance moved between the start and end touch positions
    this.touchEndPos = event.getLocation();
    let distance = this.touchEndPos.subtract(this.touchStartPos).length();

    // Determine if a swipe occurred and in which direction
    if (distance >= this.MIN_SWIPE_DISTANCE) {
      const direction = this.touchEndPos.normalize();
      if (direction.y > 0) {
        this.carMovement.emit('SwipedUp');
        this.tutorialNode.emit('SwipedUp');        
      }

      else {
        this.carMovement.emit('SwipedDown');
        this.tutorialNode.emit('SwipedDown'); 
      }
    }
  }
}

