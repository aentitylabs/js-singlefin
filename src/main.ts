import { Singlefin } from "./singlefin";
import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./influencer/follower";
import { State } from "./influencer/state";
import { Service } from "./service";

declare const SINGLEFIN_APP_NAME: string;
declare const SINGLEFIN_REGISTRY: any;
declare const SINGLEFIN_TRENDS: any;
declare const SINGLEFIN_MODEL: any;
declare const SINGLEFIN_PAGES: any;
declare const SINGLEFIN_PAGES_COMPONENTS: any;


const singlefin: any = {
    _serviceInstances: {},
    services: {},
    handlers: {},
    sources: {},
    states: {},
    bridges: {},
    exports: {
        set services(value: any) {
            singlefin.services[value.name] = value;
        },
        set handlers(value: any) {
            singlefin.handlers[value.name] = value;
        },
        set sources(value: any) {
            singlefin.sources[value.name] = value;
        },
        set states(value: any) {
            singlefin.states[value.name] = value;
        },
        set bridges(value: any) {
            singlefin.bridges[value.name] = value;
        }
    },
    registry: SINGLEFIN_REGISTRY,
    start: (() => {
        for(const service in singlefin.services) {
            singlefin._serviceInstances[service] = new singlefin.services[service]();

            singlefin._serviceInstances[service].run();
        }
    }),
    newSession: ((data: any = {}) => {
        const session = Singlefin.newSession(SINGLEFIN_APP_NAME, singlefin.bridges, singlefin.sources, singlefin.states, SINGLEFIN_MODEL, SINGLEFIN_TRENDS, SINGLEFIN_PAGES, SINGLEFIN_PAGES_COMPONENTS, singlefin.handlers, data);
    
        return session;
    })
};

export { Singlefin, SinglefinSession, Service, Follower, State, singlefin }