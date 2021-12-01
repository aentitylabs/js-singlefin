import { Singlefin } from "../../singlefin";
export declare class HtmlDeployer {
    private _htmlEventDelegate;
    private _htmlFollower;
    private _templateEngine;
    constructor(singlefin: Singlefin);
    loadComponents(): void;
    loadStates(): void;
    loadTrendStateMap(): void;
    deploy(page: any, state?: string, data?: any): string;
}
