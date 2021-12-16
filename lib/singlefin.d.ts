import { Session } from "./session";
export declare class Singlefin {
    private static _handlers;
    private static _sources;
    private static _bridges;
    private static _states;
    newSession(name: string, configuration: any): Session;
    static set handlers(value: any);
    static set sources(value: any);
    static set bridges(value: any);
    static set states(value: any);
}
