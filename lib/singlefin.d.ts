import { SinglefinSession } from "./singlefinsession";
export declare class Singlefin {
    private static _handlers;
    private static _model;
    private static _sources;
    private static _bridges;
    private static _states;
    static newSession(name: string, configuration: any): SinglefinSession;
    static set handlers(value: any);
    static set model(value: any);
    static set sources(value: any);
    static set bridges(value: any);
    static set states(value: any);
}
