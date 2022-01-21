import { HtmlTemplateEngineHandler } from "js-html-template-engine";
import { Component } from "js-template-engine";
export declare class SinglefinHtmlTemplateEngineHandler implements HtmlTemplateEngineHandler {
    private _callback;
    constructor(callback: any);
    onChangeLayout(layout: string, component: Component, data?: any): void;
}
