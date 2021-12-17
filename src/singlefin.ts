import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./main";

declare const SINGLEFIN_MODEL: any;


export class Singlefin {
    private static _handlers: any = {};
    private static _model: any = SINGLEFIN_MODEL;
    private static _sources: any = {};
    private static _bridges: any = {};
    private static _states: any = {};


    public static newSession(name: string, configuration: any) {
        const session = new SinglefinSession();

        session.loadModel(Singlefin._model);

        for(const source in Singlefin._sources) {
            session.addSource(Singlefin._sources[source].name, new Singlefin._sources[source]());
        }

        const app = new Follower(name);
        
        app.subscribe(session);

        for(const state in Singlefin._states) {
            app.addState(Singlefin._states[state].name, new Singlefin._states[state]());
        }
        
        const trends: any = {};

        for(const trend in configuration.trends) {
            app.follow(trend);

            if(configuration.trends[trend].hasOwnProperty("defaultstate")) {
                app.on(trend, configuration.trends[trend]["defaultstate"]);
            }

            if(configuration.trends[trend].hasOwnProperty("initialstate")) {
                trends[trend] = [];
                trends[trend].push({
                    name: name,
                    state: configuration.trends[trend]["initialstate"]
                });
            }

            if(configuration.trends[trend].hasOwnProperty("defaultstate")) {
                app.on(trend, configuration.trends[trend]["defaultstate"]);
            }
        }

        session.init(trends);

        return session;
    }

    public static set handlers(value: any) {
        Singlefin._handlers[value.name] = value;
    }

    public static set model(value: any) {
        Singlefin._model[value.name] = value;
    }

    public static set sources(value: any) {
        Singlefin._sources[value.name] = value;
    }

    public static set bridges(value: any) {
        Singlefin._bridges[value.name] = value;
    }

    public static set states(value: any) {
        Singlefin._states[value.name] = value;
    }
}
