import { Vec2 } from "cc";

export class GameConstants 
{
        static ROAD_MID_POSITION		        = new Vec2(0, 0);    
        static ROAD_TOP_POSITION			    = new Vec2(220, 110);
        static ROAD_BOT_POSITION			    = new Vec2(-220, -110);      

		static ROAD_LANE_TOP				    = 1;
		static ROAD_LANE_MID				    = 0;
		static ROAD_LANE_BOT				    = -1;

        static CAR_STATE_IDLE				    = 0;
		static CAR_STATE_MOVE				    = 1;
		static CAR_STATE_MOVE_LEFT			    = 2;
		static CAR_STATE_MOVE_RIGHT			    = 3;

        static CAR_TURN_SPEED				    = 20;
        static CAR_TURN_ANGLE				    = 5;

        static OBSTACLE_SPAWN_SAFE_DISTANCE     = 1140;
        // static COIN_SPAWN_SAFE_DISTANCE         = 400;
        static COIN_OFFSET_SAFE_DISTANCE        = 200;

        static GAME_DURATION                    = 20;
        static PLAYER_INVINCIPLE_DURATION       = 2;

        static OBSTACLE_GENERATION_INTERVAL     = 2;
        static OBSTACLE_GENERATION_COUNT        = 10;
}


