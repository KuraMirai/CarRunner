
import { _decorator, Component, Node, Quat, Vec3, Vec2, EventMouse, physics } from 'cc';
import { GameConstants } from './GameConstants';
const { ccclass } = _decorator;

@ccclass('CarMovement')
export class CarMovement extends Component {
    state = 0;
    lane = 0;

    onEnable () {
        // subscribe to the custom event on the observer node
        this.node.on('SwipedUp', this.MoveLeft, this);
        this.node.on('SwipedDown', this.MoveRight, this);
    }

    onDisable () {
        // unsubscribe from the custom event on the observer node to prevent memory leaks
        this.node.off('SwipedUp', this.MoveLeft, this);
        this.node.off('SwipedDown', this.MoveRight, this);
    }


    public Init(lane: number) {
        this.state = GameConstants.CAR_STATE_IDLE;
        this.lane = lane;
    }

    update(dt: number) {
        this.UpdateMove(dt);
        this.UpdateTurn(dt);
    }


    UpdateMove(dt: number) {
        switch (this.state) {
            case GameConstants.CAR_STATE_IDLE:
                break;
            case GameConstants.CAR_STATE_MOVE:
                break;
            case GameConstants.CAR_STATE_MOVE_LEFT:
                if (this.lane == GameConstants.ROAD_LANE_TOP) {
                    if (this.node.position.y < GameConstants.ROAD_TOP_POSITION.y) {

                        let posX = this.node.position.x;
                        posX += GameConstants.CAR_TURN_SPEED * 20 * dt;
                        let posY = this.node.position.y;
                        posY += GameConstants.CAR_TURN_SPEED * 10 * dt;
                        this.node.position = new Vec3(posX, posY);

                        if (this.node.position.y > GameConstants.ROAD_TOP_POSITION.y) {

                            this.node.position = new Vec3(GameConstants.ROAD_TOP_POSITION.x, GameConstants.ROAD_TOP_POSITION.y);
                            this.state = GameConstants.CAR_STATE_IDLE;
                        }
                    }
                }

                else if (this.lane == GameConstants.ROAD_LANE_MID) {
                    if (this.node.position.y < GameConstants.ROAD_MID_POSITION.y) {

                        let posX = this.node.position.x;
                        posX += GameConstants.CAR_TURN_SPEED * 20 * dt;
                        let posY = this.node.position.y;
                        posY += GameConstants.CAR_TURN_SPEED * 10 * dt;
                        this.node.position = new Vec3(posX, posY);

                        if (this.node.position.y > GameConstants.ROAD_MID_POSITION.y) {

                            this.node.position = new Vec3(GameConstants.ROAD_MID_POSITION.x, GameConstants.ROAD_MID_POSITION.y);
                            this.state = GameConstants.CAR_STATE_IDLE;
                        }
                    }
                }
                break;
            case GameConstants.CAR_STATE_MOVE_RIGHT:
                if (this.lane == GameConstants.ROAD_LANE_BOT) {
                    if (this.node.position.y > GameConstants.ROAD_BOT_POSITION.y) {

                        let posX = this.node.position.x;
                        posX -= GameConstants.CAR_TURN_SPEED * 20 * dt;
                        let posY = this.node.position.y;
                        posY -= GameConstants.CAR_TURN_SPEED * 10 * dt;
                        this.node.position = new Vec3(posX, posY);

                        if (this.node.position.y < GameConstants.ROAD_BOT_POSITION.y) {

                            this.node.position = new Vec3(GameConstants.ROAD_BOT_POSITION.x, GameConstants.ROAD_BOT_POSITION.y);
                            this.state = GameConstants.CAR_STATE_IDLE;
                        }
                    }
                }
                else if (this.lane == GameConstants.ROAD_LANE_MID) {
                    if (this.node.position.y > GameConstants.ROAD_MID_POSITION.y) {

                        let posX = this.node.position.x;
                        posX -= GameConstants.CAR_TURN_SPEED * 20 * dt;
                        let posY = this.node.position.y;
                        posY -= GameConstants.CAR_TURN_SPEED * 10 * dt;
                        this.node.position = new Vec3(posX, posY);

                        if (this.node.position.y < GameConstants.ROAD_MID_POSITION.y) {

                            this.node.position = new Vec3(GameConstants.ROAD_MID_POSITION.x, GameConstants.ROAD_MID_POSITION.y);
                            this.state = GameConstants.CAR_STATE_IDLE;
                        }
                    }
                }
                break;
        }
    }

    UpdateTurn(dt: number) {
        const newRotation = new Quat();
        if (this.state != GameConstants.CAR_STATE_MOVE_LEFT && this.state != GameConstants.CAR_STATE_MOVE_RIGHT) {
            this.node.setRotation(Quat.fromEuler(newRotation, 0, 0, 0));
            return;
        }

         if (this.state == GameConstants.CAR_STATE_MOVE_LEFT) {
            Quat.fromEuler(newRotation, 0, 0, GameConstants.CAR_TURN_ANGLE);
            this.node.setRotation(newRotation);
        }

        else if (this.state == GameConstants.CAR_STATE_MOVE_RIGHT) {
            Quat.fromEuler(newRotation, 0, 0, -GameConstants.CAR_TURN_ANGLE);
            this.node.setRotation(newRotation);
        }
    }

    MoveLeft() {
        if (this.lane == GameConstants.ROAD_LANE_TOP || this.state != GameConstants.CAR_STATE_IDLE) return;

        this.state = GameConstants.CAR_STATE_MOVE_LEFT;
        if (this.lane == GameConstants.ROAD_LANE_MID) {
            this.lane = GameConstants.ROAD_LANE_TOP;
        }
        else if (this.lane == GameConstants.ROAD_LANE_BOT) {
            this.lane = GameConstants.ROAD_LANE_MID;
        }
    }

    MoveRight() {
        if (this.lane == GameConstants.ROAD_LANE_BOT || this.state != GameConstants.CAR_STATE_IDLE) return;

        this.state = GameConstants.CAR_STATE_MOVE_RIGHT;
        if (this.lane == GameConstants.ROAD_LANE_MID) {
            this.lane = GameConstants.ROAD_LANE_BOT;
        }
        else if (this.lane == GameConstants.ROAD_LANE_TOP) {
            this.lane = GameConstants.ROAD_LANE_MID;
        }
        // if(!this.isHidden)
        // StateIngame.PlaySound(DataDefine.SFX_MOVE_01 + Math.floor(Math.random() * 2));
    }

}

