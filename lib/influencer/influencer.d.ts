import { Follower } from "./follower";
export declare class Influencer {
    protected _followers: any;
    protected _trends: any;
    subscribe(follower: Follower): void;
    init(trends: any): void;
    follow(trend: string, follower: string): void;
    newTrend(trend: string, model: any): void;
    serialize(): any;
}
