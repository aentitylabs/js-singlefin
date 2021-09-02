import { Entity } from "../../../js-entity-store/src/entity";
import { Influencer } from "./influencer";
export declare abstract class State {
    private _influencer;
    constructor(influencer: Influencer);
    abstract handle(trend: string, model: Entity): void;
}
