import { Bridge, Source } from "js-entity-store";
import { Influencer } from "./influencer/influencer";
export declare class SinglefinSession extends Influencer {
    private _entityStore;
    private _pages;
    private _pagesComponents;
    private _handlers;
    private _model;
    private _data;
    constructor(pages?: any, pagesComponents?: any, handlers?: any);
    set data(value: any);
    get data(): any;
    loadModel(model: any): void;
    get model(): any;
    addBridge(bridgeName: string, bridge: Bridge): void;
    addSource(entityName: string, source: Source): void;
    inform(trend: string): Promise<void>;
    informTo(bridge: string, trend: string): Promise<void>;
    informFrom(bridge: string, actions: any): Promise<void>;
    render(windowObject: any, layout?: string, bridge?: string, trend?: string): void;
    private renderPage;
    private serializeFollowers;
}
