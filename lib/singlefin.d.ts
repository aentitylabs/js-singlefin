import { Influencer } from "./influencer/influencer";
import { Source } from "js-entity-store";
import { Bridge } from "js-entity-store";
import { ModelLoader } from "./modelloader";
export declare class Singlefin extends Influencer {
    private _entityStore;
    private _model;
    private _currentTrend;
    constructor();
    loadModel(modelLoader: ModelLoader): Promise<void>;
    setModel(model: any): void;
    get model(): any;
    addSource(entityName: string, source: Source): void;
    inform(trend: string): void;
    informTo(bridge: Bridge, trend: string): Promise<void>;
    informFrom(bridge: Bridge, actions: any): void;
    private serializeFollowers;
}
