import { Bridge, EntityFactory, EntityStore, Source } from "js-entity-store";
import { HtmlTemplateEngine } from "js-html-template-engine";
import { Influencer } from "./influencer/influencer";
import { SinglefinHtmlTemplateEngineHandler } from "./singlefinhtmltemplateenginehandler";
import { SinglefinSource } from "./singlefinsource";

export class SinglefinSession extends Influencer {
    private _entityStore: EntityStore = new EntityStore();
    private _pages: any;
    private _pagesComponents: any;
    private _handlers: any;
    private _model: any;
    private _currentTrend: any;
    private _data: any;

    public constructor(pages?: any, pagesComponents?: any, handlers?: any) {
        super();

        this._pages = pages;
        this._pagesComponents = pagesComponents;
        this._handlers = handlers;

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

    public inform(trend: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const followers = this._trends[trend];

            this._currentTrend.trend = trend;
            this._currentTrend.trends[trend] = this.serializeFollowers(followers);

            this._entityStore.sync(() => {
                this.newTrend(trend, this._model);

                this._entityStore.sync(() => {
                    resolve();
                });
            });
        });
    }

    public informTo(bridge: string, trend: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const followers = this._trends[trend];

            this._currentTrend.trend = trend;

            if(!followers) {
                this._currentTrend.trends[trend] = this.serializeFollowers(followers);   
            }
    
            this._entityStore.syncTo(bridge, () => {
                this.init(this._currentTrend.trends);
    
                this.newTrend(this._currentTrend.trend, this._model);
    
                this._entityStore.syncTo(bridge, () => {
                    resolve();
                });
            });
        });
    }

    public informFrom(bridge: string, actions: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this._entityStore.syncFrom(bridge, actions, () => {
                this.init(this._currentTrend.trends);

                this.newTrend(this._currentTrend.trend, this._model);

                const followers = this._trends[this._currentTrend.trend];

                this._currentTrend.trends[this._currentTrend.trend] = this.serializeFollowers(followers);
            });
        });
    }

    public render(windowObject: any, page: string, layout?: string, bridge?: string) {
        const htmlTemplateEngine = new HtmlTemplateEngine(windowObject);
    
        htmlTemplateEngine.htmlTemplateEngineHandler = new SinglefinHtmlTemplateEngineHandler((layout: string, data: any) => {
            if(bridge && data && data.trend) {
                this.informTo(bridge, data.trend).then(() => {
                
                }).catch((errorStatus: any) => {
                    console.log("inform error: " + errorStatus)
                });
            }
        });

        for(const handler in this._handlers) {
            htmlTemplateEngine.addComponentHandler(handler.toLowerCase(), this._handlers[handler]);
        }
    
        for(const component in this._pagesComponents) {
            htmlTemplateEngine.addComponent(component, this._pagesComponents[component]);
        }
    
        htmlTemplateEngine.render(this._pages[page], layout, this.model);
    }

    private serializeFollowers(followers: any[]) {
        const serializedFollowers = [];

        for(let i=0; i<followers.length; i++) {
            serializedFollowers.push(followers[i].serialize());
        }

        return serializedFollowers;
    }
}