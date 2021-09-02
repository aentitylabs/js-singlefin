import { Influencer } from "./influencer/influencer";
import { Source } from "../../js-entity-store/src/source";
import { Bridge } from "../../js-entity-store/src/bridge";
export declare class Singlefin extends Influencer {
    private _entityStore;
    private _model;
    private _bridge;
    constructor(followers: any, model: any, bridge?: Bridge);
    addSource(entityName: string, source: Source): void;
    sync(trend: string): void;
}
