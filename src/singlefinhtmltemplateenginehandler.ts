import { HtmlTemplateEngineHandler } from "js-html-template-engine";


export class SinglefinHtmlTemplateEngineHandler implements HtmlTemplateEngineHandler {
    private _callback: any;


    public constructor(callback: any) {
        this._callback = callback;
    }

    public onChangeState(state: string): void {
        if(!this._callback) {
            return;
        }

        this._callback(state);
    }
}