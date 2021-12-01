import { HtmlTemplateEngine } from "js-html-template-engine";
import { EventDelegate } from "js-template-engine";
import { Follower } from "../../main";
import { Singlefin } from "../../singlefin";
import { HtmlEventDelegate } from "./htmleventdelegate";

export class HtmlDeployer {
    private _htmlEventDelegate: HtmlEventDelegate;
    private _htmlFollower: Follower;
    private _templateEngine: HtmlTemplateEngine;


    public constructor(singlefin: Singlefin) {
        this._htmlEventDelegate = new HtmlEventDelegate(singlefin);
        this._htmlFollower = new Follower("html");
        this._templateEngine = new HtmlTemplateEngine(true);

        this._htmlFollower.subscribe(singlefin);
    }

    public loadComponents() {
    }

    public loadStates() {

    }

    public loadTrendStateMap() {
        
    }

    public deploy(page: any, state?: string, data?: any): string {
        return this._templateEngine.serialize(page, state, data, this._htmlEventDelegate);
    }
}