import { Bridge, EntityFactory, EntityStore, Source } from "js-entity-store";
import { Influencer } from "./influencer/influencer";
import { SinglefinSource } from "./singlefinsource";

export class SinglefinSession extends Influencer {
    private _entityStore: EntityStore = new EntityStore();
    private _model: any;
    private _currentTrend: any;
    private _data: any;

    public constructor() {
        super();

        this._currentTrend = EntityFactory.newEntity(this._entityStore, {
            "entity": "Singlefin",
            "ref": false,
            "properties": {
                "trend": {
                    "value": ""
                },
                "trends": {
                    "value": {}
                }
            }
        });

        this._entityStore.addSource("Singlefin", new SinglefinSource());
    }

    public set data(value: any) {
        this._data = value;
    }

    public get data() {
        return this._data;
    }

    public loadModel(model: any) {
        this._model = EntityFactory.newEntity(this._entityStore, model);
    }

    public get model(): any {
        return this._model;
    }

    public addBridge(bridgeName: string, bridge: Bridge) {
        this._entityStore.addBridge(bridgeName, bridge);
    }

    public addSource(entityName: string, source: Source) {
        this._entityStore.addSource(entityName, source);
    }

    public inform(trend: string) {
        const followers = this._trends[trend];

        this._currentTrend.trend = trend;
        this._currentTrend.trends[trend] = this.serializeFollowers(followers);

        this._entityStore.sync();

        this.newTrend(trend, this._model);

        this._entityStore.sync();
    }

    public informTo(bridge: string, trend: string) {
        const followers = this._trends[trend];

        this._currentTrend.trend = trend;
        this._currentTrend.trends[trend] = this.serializeFollowers(followers);

        return this._entityStore.syncTo(bridge).then(() => {
            this.init(this._currentTrend.trends);

            this.newTrend(this._currentTrend.trend, this._model);

            return this._entityStore.syncTo(bridge);
        });
    }

    public informFrom(bridge: string, actions: any) {
        this._entityStore.syncFrom(bridge, actions, () => {
            this.init(this._currentTrend.trends);

            this.newTrend(this._currentTrend.trend, this._model);

            const followers = this._trends[this._currentTrend.trend];

            this._currentTrend.trends[this._currentTrend.trend] = this.serializeFollowers(followers);
        });
    }

    private serializeFollowers(followers: any[]) {
        const serializedFollowers = [];

        for(let i=0; i<followers.length; i++) {
            serializedFollowers.push(followers[i].serialize());
        }

        return serializedFollowers;
    }
}