export class Modules {
    private static _handlers: any = {};
    private static _sources: any = {};
    private static _states: any = {};
    private static _bridges: any = {};


    public static set handlers(value: any) {
        Modules._handlers[value.name] = value;
    }

    public static get handlers() {
        return Modules._handlers;
    }

    public static set sources(value: any) {
        Modules._sources[value.name] = value;
    }

    public static get sources() {
        return Modules._sources;
    }

    public static set states(value: any) {
        Modules._states[value.name] = value;
    }

    public static get states() {
        return Modules._states;
    }

    public static set bridges(value: any) {
        Modules._bridges[value.name] = value;
    }

    public static get bridges() {
        return Modules._bridges;
    }
}
