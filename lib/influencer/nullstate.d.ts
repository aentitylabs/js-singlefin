import { Follower } from "./follower";
import { Influencer } from "./influencer";
import { State } from "./state";
export declare class NullState extends State {
    handle(influencer: Influencer, follower: Follower, trend: string, model: any): void;
}
