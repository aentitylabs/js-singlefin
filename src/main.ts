import { Singlefin } from "./singlefin";
import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./influencer/follower";
import { State } from "./influencer/state";
import { HtmlTemplateEngine } from "js-html-template-engine";

declare const SINGLEFIN_APP_NAME: string;
declare const SINGLEFIN_TRENDS: any;
declare const SINGLEFIN_MODEL: any;
declare const SINGLEFIN_PAGES: any;
declare const SINGLEFIN_PAGES_COMPONENTS: any;


const singlefin: any = {
    handlers: {},
    sources: {},
    states: {},
    bridges: {},
    exports: {
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
    newSession: (() => {
        const session = Singlefin.newSession(SINGLEFIN_APP_NAME, singlefin.sources, singlefin.states, SINGLEFIN_MODEL, SINGLEFIN_TRENDS);
    
        return session;
    }),
    render: ((singlefinSession: SinglefinSession, windowObject: any, page: string, state?: string) => {
        const htmlTemplateEngine = new HtmlTemplateEngine(windowObject);

        for(const handler in singlefin.handlers) {
            htmlTemplateEngine.addComponentHandler(handler.toLowerCase(), singlefin.handlers[handler]);
        }
    
        for(const component in SINGLEFIN_PAGES_COMPONENTS) {
            htmlTemplateEngine.addComponent(component, SINGLEFIN_PAGES_COMPONENTS[component]);
        }
    
        return htmlTemplateEngine.render(SINGLEFIN_PAGES[page], state, singlefinSession.model);
    })
};

export { Singlefin, SinglefinSession, Follower, State, singlefin }