import { Follower } from "./follower";
import { Influencer } from "./influencer";
export declare abstract class State {
    private _name;
    set name(name: string);
    get name(): string;
    abstract handle(influencer: Influencer, follower: Follower, trend: string, model: any): void;
}
