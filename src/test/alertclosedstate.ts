import { Influencer } from "../influencer/influencer";
import { State } from "../influencer/state";
import { Follower } from "../main";

export class AlertClosedState extends State {
    public handle(influencer: Influencer, follower: Follower, trend: string, model: any): void {
        if(trend === "login") {
            follower.changeState("is showing wait alert");
        }
    }
    
}