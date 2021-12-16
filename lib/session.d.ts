import { Bridge, Source } from "js-entity-store";
import { Influencer } from "./influencer/influencer";
export declare class Session extends Influencer {
    private _entityStore;
    private _model;
    private _currentTrend;
    constructor();
    setModel(model: any): void;
    get model(): any;
    addSource(entityName: string, source: Source): void;
    inform(trend: string): void;
    informTo(bridge: Bridge, trend: string): Promise<void>;
    informFrom(bridge: Bridge, actions: any): void;
    private serializeFollowers;
}
