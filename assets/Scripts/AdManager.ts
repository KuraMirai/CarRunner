
import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AdManager')
export class AdManager extends Component {
    
    public AdButtonClick()
    {
        sys.openURL("https://ingameads.gameloft.com/ads/adserver/ad_targeting_info.php?lang=en&data");
    }
}

