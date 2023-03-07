
import { _decorator, Component, Node, UIOpacity, Animation, Sprite, AnimationManager } from 'cc';
import { GameConstants } from './GameConstants';
const { ccclass, property } = _decorator;

@ccclass('PlayerVfx')
export class PlayerVfx extends Component {
    @property(Sprite)
    carSprite!: Sprite;
    @property(Sprite)
    hitVfxSprite!: Sprite;
    @property(Sprite)
    fuelVfxSprite!: Sprite;
    @property(Sprite)
    speedUpVfxSprite!: Sprite;
    @property(Animation)
    hitAnimation!: Animation;
    @property(Animation)
    fuelAnimation!: Animation;
    @property(Animation)
    speedUpAnimation!: Animation;

    start() {
        this.hitAnimation.on(Animation.EventType.PLAY, this.onHitAnimatonPlay, this);
        this.hitAnimation.on(Animation.EventType.STOP, this.onHitAnimatonStop, this);
        this.fuelAnimation.on(Animation.EventType.PLAY, this.onFuelAnimatonPlay, this);
        this.fuelAnimation.on(Animation.EventType.STOP, this.onFuelAnimatonStop, this);
        this.speedUpAnimation.on(Animation.EventType.PLAY, this.onSpeedUpAnimatonPlay, this);
        this.speedUpAnimation.on(Animation.EventType.STOP, this.onSpeedUpAnimatonStop, this);
    }

    public PlayHitAnimation() {
        this.hitAnimation.play();
    }

    public PlayFuelAnimation() {
        this.fuelAnimation.play();
    }

    public PlaySpeedUpAnimation() {
        this.speedUpAnimation.play();
    }

    public StopSpeedUpAnimation()
    {
        this.speedUpAnimation.stop();
    }

    public MakeInvinciple() {
        this.schedule(this.ToggleBlink, GameConstants.PLAYER_INVINCIPLE_BLAZE_INTERVAL, GameConstants.PLAYER_INVINCIPLE_DURATION / GameConstants.PLAYER_INVINCIPLE_BLAZE_INTERVAL + 1);
    }

    CancelInvinciple() {
        //this.unschedule(this.ToggleBlink);
    }  
    
    ToggleBlink() {
        this.carSprite.enabled = !this.carSprite.enabled;
    }

    onHitAnimatonPlay()
    {
        this.hitVfxSprite.enabled  = true;
    }

    onHitAnimatonStop()
    {
        this.hitVfxSprite.enabled = false;
    }

    onFuelAnimatonPlay()
    {
        this.fuelVfxSprite.enabled = true;
    }

    onFuelAnimatonStop()
    {
        this.fuelVfxSprite.enabled = false;
    }

    onSpeedUpAnimatonPlay()
    {
        this.speedUpVfxSprite.enabled = true;
    }

    onSpeedUpAnimatonStop()
    {
        this.speedUpVfxSprite.enabled = false;
    }
}

