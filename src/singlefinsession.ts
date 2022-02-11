import { Bridge, EntityFactory, EntityStore, Source } from "js-entity-store";
import { HtmlTemplateEngine } from "js-html-template-engine";
import { Component } from "js-template-engine";
import { SinglefinHtmlTemplateEngineHandler } from "./singlefinhtmltemplateenginehandler";
import { SinglefinSource } from "./singlefinsource";
import { Scenario } from "./scenario/scenario";

export class SinglefinSession/* extends Influencer*/ {
    private _entityStore: EntityStore = new EntityStore();
    private _pages: any;
    private _pagesComponents: any;
    private _handlers: any;
    private _model: any;
    private _data: any;

    private _session: any;
    private _scenarios: any = {};
    private _contextStatesInstances: any = {};

    public constructor(pages?: any, pagesComponents?: any, handlers?: any) {
        this._pages = pages;
        this._pagesComponents = pagesComponents;
        this._handlers = handlers;

        this._session = EntityFactory.newEntity(this._entityStore, {
            "entity": "Singlefin",
            "ref": false,
            "properties": {
                "scenario": {
                    "value": ""
                },
                "scenarios": {
                    "value": {}
                },
                "page": {
                    "value": ""
                },
                "layout": {
                    "value": ""
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

    public addScenario(scenario: any) {
        this._scenarios[scenario.name] = scenario;
    }

    public addContextStatesInstances(context: string, states: any) {
        this._contextStatesInstances[context] = states;
    }

    public sync(scenario: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.resolveScenario(scenario, () => {
                resolve();
            }, () => {
                reject();
            });
        });
    }

    public syncTo(bridge: string, scenario: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.resolveScenario(scenario, () => {
                this._entityStore.syncTo(bridge, () => {
                    this.resolveScenario(this._session.scenario, () => {
                        resolve();
                    }, () => {
                        console.log("an error occurred during sync to");
        
                        reject();
                    });
                });
            }, () => {
                console.log("an error occurred during sync to");

                reject();
            });
        });
    }

    public syncFrom(bridge: string, actions: any): Promise<void> {
        return new Promise((resolve, reject) => {
            let hasError: boolean = false;

            this._entityStore.syncFrom(bridge, actions, () => {
                this.resolveScenario(this._session.scenario, () => {
                    
                }, (errorStatus: any) => {
                    hasError = true;

                    console.log("an error occurred during sync from: " + errorStatus);
                });
            }, () => {
                if(hasError === true) {
                    return reject();
                }
                
                resolve();
            });
        });
    }

    public render(windowObject: any, layout?: string, bridge?: string) {
        let pageLayout: string = this._session.layout;

        if(layout) {
            pageLayout = layout;
        }

        this.renderPage(windowObject, this._session.page, pageLayout, bridge);
    }

    private renderPage(windowObject: any, page: string, layout?: string, bridge?: string) {
        const htmlTemplateEngine = new HtmlTemplateEngine(windowObject);

        htmlTemplateEngine.htmlTemplateEngineHandler = new SinglefinHtmlTemplateEngineHandler((layout: string, component: Component, data: any) => {
            if(bridge && data && data.scenario) {
                this.syncTo(bridge, data.scenario).then(() => {
                    component.changeLayout(this._session.layout);
                }).catch((errorStatus: any) => {
                    console.log("an error occurred during change layout: " + errorStatus);
                });
            }
            else if(data && data.scenario){
                this.resolveScenario(this._session.scenario, () => {
                    component.changeLayout(this._session.layout);
                }, () => {
                    console.log("an error occurred during change layout");
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

    private resolveScenario(scenarioName: string, resolve: any, reject: any) {
        if(!this._scenarios.hasOwnProperty(scenarioName)) {
            console.log("an error occurred during resolve scenario: " + scenarioName + " not exist");

            return reject();
        }

        let currentScenario: any = this._scenarios[scenarioName];

        if(this._session.scenarios.hasOwnProperty(scenarioName)) {
            currentScenario = this._session.scenarios[scenarioName];
        }

        this._session.scenario = scenarioName;
        
        const scenario: Scenario = new Scenario(scenarioName);
        
        scenario.deserialize(currentScenario, this._contextStatesInstances);

        scenario.resolve(this._model, () => {
            this._session.scenarios[scenarioName] = scenario.serialize();
            
            return resolve();
        });
    }
}