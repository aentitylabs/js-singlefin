import { Influencer } from "../influencer/influencer";
import { State } from "../influencer/state";
import { Follower } from "../main";
export declare class HomeState extends State {
    handle(influencer: Influencer, follower: Follower, trend: string, model: any): void;
}
