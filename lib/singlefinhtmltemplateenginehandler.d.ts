import { HtmlTemplateEngineHandler } from "js-html-template-engine";
export declare class SinglefinHtmlTemplateEngineHandler implements HtmlTemplateEngineHandler {
    private _callback;
    constructor(callback: any);
    onChangeState(state: string): void;
}
