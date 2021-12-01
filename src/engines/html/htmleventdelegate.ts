import { Component, EventDelegate } from "js-template-engine";
import { Singlefin } from "../../singlefin";


export class HtmlEventDelegate extends EventDelegate {
    private _singlefin: Singlefin;


    public constructor(singlefin: Singlefin) {
        super();

        this._singlefin = singlefin;
    }

    public on(state: string, component: Component): void {
        this._singlefin.inform(state);
    }
}