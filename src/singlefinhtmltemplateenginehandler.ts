import { HtmlTemplateEngineHandler } from "js-html-template-engine";
import { Component } from "js-template-engine";


export class SinglefinHtmlTemplateEngineHandler implements HtmlTemplateEngineHandler {
    private _callback: any;


    public constructor(callback: any) {
        this._callback = callback;
    }

    public onChangeLayout(layout: string, component: Component, data?: any): void {
        if(!this._callback) {
            return;
        }

        this._callback(layout, component, data);
    }
}