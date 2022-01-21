import { Influencer } from "../influencer/influencer";
import { State } from "../influencer/state";
import { Follower } from "../main";

export class AlertWaitState extends State {
    public handle(influencer: Influencer, follower: Follower, trend: string, model: any): void {
        if(trend === "access to homepage") {
            follower.changeState("is closed");
        }
    }
    
}