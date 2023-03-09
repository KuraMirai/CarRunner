
import { _decorator, Component, Node, AudioSource, AudioClip } from 'cc';
import { EventManager } from '../EventManager';
import { GameConstants } from '../GameConstants';
const { ccclass, property } = _decorator;

@ccclass('MainSoundsManager')
export class MainSoundsManager extends Component {
    @property(AudioSource)
    mainAudioSource!:AudioSource;
    @property(AudioClip)
    bgMusic!: AudioClip;
    @property(AudioClip)
    endGameMusic!: AudioClip;

    start () {
       EventManager.on(GameConstants.START_GAME_PREVIEW, this.PlayBgMusic, this)
       EventManager.on(GameConstants.REPLAY, this.PlayBgMusic, this)
       EventManager.on(GameConstants.END_GAME, this.PlayEndGameMusic, this)
    }

    PlaySound(clip:AudioClip)
    {
        this.mainAudioSource.stop();
        this.mainAudioSource.clip = clip;
        this.mainAudioSource.play();
    }
    
    PlayBgMusic()
    {
        this.PlaySound(this.bgMusic);
    }

    PlayEndGameMusic()
    {
        this.PlaySound(this.endGameMusic);
    }
}

