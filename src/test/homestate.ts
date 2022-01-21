import { Influencer } from "../influencer/influencer";
import { State } from "../influencer/state";
import { Follower } from "../main";

export class HomeState extends State {
    public handle(influencer: Influencer, follower: Follower, trend: string, model: any): void {
        if(model.user.id === "") {
            follower.changeState("is showing login form");
        }
    }
    
}