import { Entity } from "../../../js-entity-store/src/entity";
import { Influencer } from "./influencer";
import { State } from "./state";
export declare class Follower {
    private _name;
    private _state;
    private _influencer;
    constructor(name: string, influencer: Influencer);
    handle(trend: string, model: Entity): void;
    onTrendChange(trend: string, model: Entity): void;
    set state(state: State);
    serialize(): any;
    deserialize(follower: any): void;
}
