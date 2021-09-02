import { Entity } from "../../../js-entity-store/src/entity";
import { Follower } from "./follower";
export declare class Influencer {
    protected _followers: any;
    follow(trend: string, follower: Follower): void;
    newTrend(trend: string, model: Entity): void;
    serialize(): any;
    deserialize(influencer: any): void;
}
