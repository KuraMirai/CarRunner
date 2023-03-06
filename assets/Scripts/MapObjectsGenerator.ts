import { _decorator, Component, Node, Prefab, instantiate, math, Vec2, Vec3 } from 'cc';
import { CarAI } from './CarAI';
import { EventManager } from './EventManager';
import { FuelCoin } from './FuelCoin';
import { GameConstants } from './GameConstants';
import { Obstacle } from './Obstacle';
const { ccclass, property } = _decorator;

@ccclass('MapObjectsGenerator')
export class MapObjectsGenerator extends Component {
    @property(Node)
    carAIParentNode!: Node;
    @property(Node)
    obstaclesParentNode!: Node;
    @property(Prefab)
    carAiPrefab!: Prefab;
    @property(Prefab)
    obstacle!: Prefab;
    @property(Prefab)
    fuelCoin!: Prefab;

    obstaclesCounter = 0;
    enemies: CarAI[] = [];

    lanesObjects: { [key: number]: any[] } = {
        [GameConstants.ROAD_LANE_BOT]: [],
        [GameConstants.ROAD_LANE_MID]: [],
        [GameConstants.ROAD_LANE_TOP]: [],
    };


    start() {
        EventManager.on("StartGame", this.StartGame, this)
        EventManager.on("Replay", this.StartGame, this)
    }

    StartGame() {
        this.obstaclesCounter = 0;
        this.ClearAllGenerated();
        this.Generate();
    }

    ClearAllGenerated() {
        for (const node of this.enemies) {
            node.node.destroy();
        }
        this.enemies = [];

        for (const lane in this.lanesObjects) {
            for (const object of this.lanesObjects[lane]) {
                object.node.destroy();
            }
        }
        this.lanesObjects[GameConstants.ROAD_LANE_BOT] = [];
        this.lanesObjects[GameConstants.ROAD_LANE_MID] = [];
        this.lanesObjects[GameConstants.ROAD_LANE_TOP] = [];
    }

    StartGenerating()
    {
        this.schedule(this.Generate, 2, 10, 0);
    }

    Generate() {          

        for (let i = 0; i < 5; i++) {
            let obs = instantiate(this.carAiPrefab);
            obs.setParent(this.carAIParentNode);
            let car = obs.getComponent('CarAI') as CarAI;
            this.enemies.push(car);
            let lane = Math.floor(math.randomRange(GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_TOP + 1));
            let offsetX = GameConstants.ROAD_MIN_LENGTH_OFFSET + this.enemies.indexOf(car) * GameConstants.ENEMY_CAR_SPAWN_SAFE_DISTANCE;
            let offset = new Vec3(offsetX, -offsetX / 2);
            car.Spawn(offset, lane);
        }

        for (let i = 0; i < 20; i++) {
            let ostacle = instantiate(this.obstacle);
            ostacle.setParent(this.obstaclesParentNode);
            let obs = ostacle.getComponent('Obstacle') as Obstacle;
            let lane = Math.floor(math.randomRange(GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_TOP + 1));
            this.lanesObjects[lane].push(obs);
            this.obstaclesCounter++;
            let offsetX = GameConstants.ROAD_MIN_LENGTH_OFFSET + (this.lanesObjects[lane].indexOf(obs) + this.obstaclesCounter) * GameConstants.OBSTACLE_SPAWN_SAFE_DISTANCE;
            let offset = new Vec3(offsetX, -offsetX / 2);
            obs.Spawn(offset, lane);
        }

        for (let i = 0; i < 20; i++) {
            let coinObj = instantiate(this.fuelCoin);
            coinObj.setParent(this.obstaclesParentNode);
            let coin = coinObj.getComponent('FuelCoin') as FuelCoin;
            let lane = Math.floor(math.randomRange(GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_TOP + 1));
            this.lanesObjects[lane].push(coin);
            let offsetX = GameConstants.ROAD_MIN_LENGTH_OFFSET + this.lanesObjects[lane].indexOf(coin) * (GameConstants.COIN_SPAWN_SAFE_DISTANCE + GameConstants.OBSTACLE_SPAWN_SAFE_DISTANCE);
            let offset = new Vec3(offsetX, -offsetX / 2);
            coin.Spawn(offset, lane);
        }
    }

    CreateOneObstacle()
    {

    }

    CreateOneObstacleAndCoin()
    {

    }

    GenerateTwoObstacleAndCoin()
    {

    }

    GenerateCoin()
    {

    }

    GenerateTwoCoins()
    {

    }

    GenerateCoinsStack()
    {

    }
}


