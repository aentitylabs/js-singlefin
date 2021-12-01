import { Component, EventDelegate } from "js-template-engine";
import { Singlefin } from "../../singlefin";
export declare class HtmlEventDelegate extends EventDelegate {
    private _singlefin;
    constructor(singlefin: Singlefin);
    on(state: string, component: Component): void;
}
