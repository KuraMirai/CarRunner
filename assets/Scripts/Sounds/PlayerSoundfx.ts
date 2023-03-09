
import { _decorator, Component, Node, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

export enum PlayerSound {
    Move,
    HitCar,
    HitObject,
    FuelCollect,
    SpeedUp
}

@ccclass('PlayerSoundfx')
export class PlayerSoundfx extends Component {
    @property(AudioSource)
    moveAudioSource!: AudioSource;
    @property(AudioSource)
    hitCarAudioSource!: AudioSource;
    @property(AudioSource)
    hitObjectAudioSource!: AudioSource;
    @property(AudioSource)
    coinAudioSource!: AudioSource;
    @property(AudioSource)
    speedUpAudioSource!: AudioSource;

    PlaySound(sound: PlayerSound) {
        switch (sound) {
            case PlayerSound.Move:
                this.moveAudioSource.play();
                break;
            case PlayerSound.HitCar:
                this.hitCarAudioSource.play();
                break;
            case PlayerSound.HitObject:
                this.hitObjectAudioSource.play();
                break;
            case PlayerSound.FuelCollect:
                this.coinAudioSource.play();
                break;
            case PlayerSound.SpeedUp:
                this.speedUpAudioSource.play();
                break;
        }
    }

}
