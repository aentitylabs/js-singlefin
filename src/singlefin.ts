import { Influencer } from "./influencer/influencer";
import { EntityStore } from "js-entity-store"
import { EntityFactory } from "js-entity-store";
import { Source } from "js-entity-store";
import { Bridge } from "js-entity-store";
import { SinglefinSource } from "./singlefinsource";
import { ModelLoader } from "./modelloader";
import { HttpRoutingEngine } from "js-http-routing-engine";


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
                },
                "trends": {
                    "value": {}
                }
            }
        });

        this._entityStore.addSource("Singlefin", new SinglefinSource());
    }

    public loadModel(modelLoader: ModelLoader) {
        return new Promise<void>((resolve, reject) => {
            modelLoader.load((model: any) => {
                this._model = EntityFactory.newEntity(this._entityStore, model);

                resolve();
            });
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

    public run() {
        const httpRoutingEngine = new HttpRoutingEngine();

        httpRoutingEngine.render({}, undefined, this._model);
    }

    public inform(trend: string) {
        const followers = this._trends[trend];

        this._currentTrend.trend = trend;
        this._currentTrend.trends[trend] = this.serializeFollowers(followers);

        this._entityStore.sync();

        this.newTrend(trend, this._model);

        this._entityStore.sync();
    }

    public informTo(bridge: Bridge, trend: string) {
        const followers = this._trends[trend];

        this._currentTrend.trend = trend;
        this._currentTrend.trends[trend] = this.serializeFollowers(followers);

        return this._entityStore.syncTo(bridge).then(() => {
            this.init(this._currentTrend.trends);

            this.newTrend(this._currentTrend.trend, this._model);

            return this._entityStore.syncTo(bridge);
        });
    }

    public informFrom(bridge: Bridge, actions: any) {
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
