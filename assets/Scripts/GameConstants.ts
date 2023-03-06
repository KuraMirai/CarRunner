import { Vec2 } from "cc";

export class GameConstants 
{
        static ROAD_MID_POSITION		    = new Vec2(0, 0);    
        static ROAD_TOP_POSITION			= new Vec2(220, 110);
        static ROAD_BOT_POSITION			= new Vec2(-220, -110);

        static OSTACLE_SPAWN_DISTANCE       = new Vec2(1140,-560);

		static ROAD_LANE_TOP				= 1;
		static ROAD_LANE_MID				= 0;
		static ROAD_LANE_BOT				= -1;

        static CAR_STATE_IDLE				= 0;
		static CAR_STATE_MOVE				= 1;
		static CAR_STATE_MOVE_LEFT			= 2;
		static CAR_STATE_MOVE_RIGHT			= 3;

        static CAR_TURN_SPEED				= 20;
        static CAR_TURN_ANGLE				= 5;

        static ROAD_MIN_LENGTH_OFFSET       = 1180;
        static ROAD_MAX_LENGTH_OFFSET       = 3400;

        static ENEMY_CAR_SPAWN_SAFE_DISTANCE    = 1300;
        static OBSTACLE_SPAWN_SAFE_DISTANCE     = 700;
        static COIN_SPAWN_SAFE_DISTANCE         = 100;

        static GAME_DURATION                    = 20;
        static PLAYER_INVINCIPLE_DURATION       = 2;
}


