import { Follower } from "./follower";
import { Influencer } from "./influencer";
import { State } from "./state";

export class NullState extends State {
    public handle(influencer: Influencer, follower: Follower, trend: string, model: any): void {
        
    }
}