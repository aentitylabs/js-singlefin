import { Bridge, Source } from "js-entity-store";
import { Influencer } from "./influencer/influencer";
export declare class SinglefinSession extends Influencer {
    private _entityStore;
    private _model;
    private _currentTrend;
    private _data;
    constructor();
    set data(value: any);
    get data(): any;
    loadModel(model: any): void;
    get model(): any;
    addBridge(bridgeName: string, bridge: Bridge): void;
    addSource(entityName: string, source: Source): void;
    inform(trend: string): void;
    informTo(bridge: string, trend: string): Promise<void>;
    informFrom(bridge: string, actions: any): void;
    private serializeFollowers;
}
