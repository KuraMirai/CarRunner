import { _decorator, Component, Node, Prefab, instantiate, math, Vec2, Vec3 } from 'cc';
import { CarAI } from './CarAI';
import { EventManager } from './EventManager';
import { FinishLine } from './FinishLine';
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
    @property(Prefab)
    finishLine!: Prefab;

    enemies: CarAI[] = [];

    lanesObjects: { [key: number]: any[] } = {
        [GameConstants.ROAD_LANE_BOT]: [],
        [GameConstants.ROAD_LANE_MID]: [],
        [GameConstants.ROAD_LANE_TOP]: [],
    };

    start() {
        EventManager.on(GameConstants.START_GAME_PREVIEW, this.StartGamePreview, this)
        EventManager.on(GameConstants.START_GAME, this.StartGame, this)
        EventManager.on(GameConstants.REPLAY, this.StartGamePreview, this)
        EventManager.on(GameConstants.END_GAME, this.EndGamePreview, this)
    }

    StartGamePreview()
    { 
        this.ClearAllGenerated();
        this.unschedule(this.Generate);
    }

    StartGame() {
       
        this.StartGenerating();
    }

    EndGamePreview()
    {
        this.GenerateFinishLine();
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

    StartGenerating() {
        this.schedule(this.Generate, GameConstants.OBSTACLE_GENERATION_INTERVAL, GameConstants.GAME_DURATION / GameConstants.OBSTACLE_GENERATION_INTERVAL - 2, 0);
    }

    Generate() {
        this.GenerateObstacles();
        this.GenerateCoins();
    }

    GenerateObstacles() {
        let rand = Math.floor(math.randomRange(1, 2));
        switch (rand) {
            case 0:
                this.GenerateOneObstacle(Math.floor(math.randomRange(GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_TOP + 1)));
                break;
            case 1:
                this.GenerateObstacleAndCoin();
                break;
            case 2:
                this.GenerateTwoObstacleAndCoin();
                break;
        }
    }

    GenerateCoins() {
        let rand = Math.floor(math.randomRange(0, 1));
        switch (rand) {
            case 0:
                this.GenerateCoin(Math.floor(math.randomRange(GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_TOP + 1)), GameConstants.COIN_SPAWN_SAFE_DISTANCE);
                break;
            case 1:
                this.GenerateTwoCoins();
                break;
            case 2:
                this.GenerateCoinsStack();
                break;
        }
    }

    GenerateFinishLine()
    {
        let ostacle = instantiate(this.finishLine);
        ostacle.setParent(this.obstaclesParentNode);
        let obs = ostacle.getComponent('FinishLine') as FinishLine;
        this.lanesObjects[GameConstants.ROAD_LANE_MID].push(obs);
        let offsetX = GameConstants.OBSTACLE_SPAWN_SAFE_DISTANCE;
        let offset = new Vec3(offsetX, -offsetX / 2);
        ostacle.setPosition(offset);
    }

    GetShuffledArray(): number[] {
        let values: number[] = [GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_MID, GameConstants.ROAD_LANE_TOP];
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }

        return values.slice(0, 3);
    }

    GenerateOneObstacle(lane: number) {
        let rand = Math.floor(math.randomRange(0, 2));
        switch (rand) {
            case 0:
                this.CreateCar(lane);
                break;
            case 1:
                this.CreateObstacle(lane);
                break;
        }
    }

    GenerateObstacleAndCoin() {
        let randArray = this.GetShuffledArray();
        this.GenerateOneObstacle(randArray[0]);
        this.GenerateCoin(randArray[1]);
    }

    GenerateTwoObstacleAndCoin() {
        let randArray = this.GetShuffledArray();
        this.GenerateOneObstacle(randArray[0]);
        this.GenerateOneObstacle(randArray[1]);
        this.GenerateCoin(randArray[2]);
    }

    CreateCar(lane: number) {
        let obs = instantiate(this.carAiPrefab);
        obs.setParent(this.carAIParentNode);
        let car = obs.getComponent('CarAI') as CarAI;
        this.enemies.push(car);
        let offsetX = GameConstants.OBSTACLE_SPAWN_SAFE_DISTANCE;
        let offset = new Vec3(offsetX, -offsetX / 2);
        car.Spawn(offset, lane);
    }

    CreateObstacle(lane: number) {
        let ostacle = instantiate(this.obstacle);
        ostacle.setParent(this.obstaclesParentNode);
        let obs = ostacle.getComponent('Obstacle') as Obstacle;
        this.lanesObjects[lane].push(obs);
        let offsetX = GameConstants.OBSTACLE_SPAWN_SAFE_DISTANCE;
        let offset = new Vec3(offsetX, -offsetX / 2);
        obs.Spawn(offset, lane);
    }

    GenerateCoin(lane: number, positionOffset: number = 0) {
        let coinObj = instantiate(this.fuelCoin);
        coinObj.setParent(this.obstaclesParentNode);
        let coin = coinObj.getComponent('FuelCoin') as FuelCoin;
        this.lanesObjects[lane].push(coin);
        let offsetX = GameConstants.OBSTACLE_SPAWN_SAFE_DISTANCE + positionOffset;
        let offset = new Vec3(offsetX, -offsetX / 2);
        coin.Spawn(offset, lane);
    }

    GenerateTwoCoins() {
        let randArray = this.GetShuffledArray();
        this.GenerateCoin(randArray[0], GameConstants.COIN_SPAWN_SAFE_DISTANCE);
        this.GenerateCoin(randArray[1], GameConstants.COIN_SPAWN_SAFE_DISTANCE);
    }

    GenerateCoinsStack() {
        let rand = Math.floor(math.randomRange(2, 4));
        let lane = Math.floor(math.randomRange(GameConstants.ROAD_LANE_BOT, GameConstants.ROAD_LANE_TOP + 1));
        for (let i = 0; i < rand; i++) {
            this.GenerateCoin(lane, GameConstants.COIN_SPAWN_SAFE_DISTANCE + GameConstants.COIN_OFFSET_SAFE_DISTANCE * i);
        }
    }
}


