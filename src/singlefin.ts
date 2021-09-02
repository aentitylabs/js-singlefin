import { Influencer } from "./influencer/influencer";
import { EntityStore } from "../../js-entity-store/src/entitystore"
import { Entity } from "../../js-entity-store/src/entity";
import { EntityFactory } from "../../js-entity-store/src/entityfactory";
import { Source } from "../../js-entity-store/src/source";
import { Bridge } from "../../js-entity-store/src/bridge";


export class Singlefin extends Influencer {
    private _entityStore: EntityStore = new EntityStore();
    private _model: any;
    private _currentTrend: any;

    public constructor() {
        super();

        this._currentTrend = EntityFactory.newEntity(this._entityStore, {
            "entity": "Singlefin",
            "ref": false,
            "properties": {
                "trend": {
                    "value": ""
                }
            }
        });
    }

    public setModel(model: any) {
        this._model = EntityFactory.newEntity(this._entityStore, model);
    }

    public get model(): any {
        return this._model;
    }

    public addSource(entityName: string, source: Source) {
        this._entityStore.addSource(entityName, source);
    }

    public inform(trend: string) {
        this._currentTrend.trend = trend;

        this._entityStore.sync();

        this.newTrend(trend, this._model);

        this._entityStore.sync();
    }

    public informTo(bridge: Bridge, trend: string) {
        this._currentTrend.trend = trend;

        this._entityStore.syncTo(bridge);

        this.newTrend(trend, this._model);

        this._entityStore.syncTo(bridge);
    }

    public informFrom(bridge: Bridge, actions: any) {
        this._entityStore.syncFrom(bridge, actions);

        this.newTrend(this._currentTrend.trend, this._model);

        this._entityStore.sync();
    }
}
