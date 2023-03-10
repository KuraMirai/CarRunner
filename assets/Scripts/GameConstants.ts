import { Vec2, Vec3 } from "cc";

export class GameConstants 
{
        static ROAD_MID_POSITION		        = new Vec2(0, 0);    
        static ROAD_TOP_POSITION			    = new Vec2(220, 110);
        static ROAD_BOT_POSITION			    = new Vec2(-220, -110);   
        static CAR_START_PREVIEW_POSITION	    = new Vec3(-1170, 590);   
        static CAR_END_PREVIEW_POSITION	        = new Vec3(1170, -590);   

		static ROAD_LANE_TOP				    = 1;
		static ROAD_LANE_MID				    = 0;
		static ROAD_LANE_BOT				    = -1;

        static CAR_STATE_PREVIEW				= -1;
        static CAR_STATE_IDLE				    = 0;
		static CAR_STATE_MOVE				    = 1;
		static CAR_STATE_MOVE_LEFT			    = 2;
		static CAR_STATE_MOVE_RIGHT			    = 3;
        static CAR_STATE_END_PREVIEW	        = 4;

        static CAR_TURN_SPEED				    = 20;
        static CAR_TURN_ANGLE				    = 5;

        static OBSTACLE_SPAWN_SAFE_DISTANCE     = 1440;
        static COIN_SPAWN_SAFE_DISTANCE         = 400;
        static COIN_OFFSET_SAFE_DISTANCE        = 200;

        static GAME_DURATION                    = 30;
        static PLAYER_INVINCIPLE_DURATION       = 2;
        static PLAYER_INVINCIPLE_BLAZE_INTERVAL = 0.2;
        static SPEED_UP_DURATION                = 8;
        static LOADING_DURATION                 = 2;

        static SPEED_UP_MULTIPLIER              = 2;

        static OBSTACLE_GENERATION_INTERVAL     = 3;

        static START_GAME_PREVIEW               =  "StartGamePreview"
        static START_GAME                       =  "StartGame"
        static SHOW_LAODING_SCREEN              =  "ShowLoadingScreen"
        static SHOW_TUTORIAL                    =  "ShowTutorial"
        static START_STARTUP_TEXT               =  "StartStartupText"
        static END_GAME                         =  "EndGame"
        static GAME_OVER                        =  "GameOver"
        static REPLAY                           =  "Replay"
        static ADD_FUEL                         =  "AddFuel"
        static REMOVE_FUEL                      =  "RemoveFuel"
        static SPEED_UP                         =  "SpeedUp"
        static END_SPEED_UP                     =  "EndSpeedUp"
        static SWIPED_UP                        =  "SwipedUp"
        static SWIPED_DOWN                      =  "SwipedDown"
        
}


