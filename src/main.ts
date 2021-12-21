import { Singlefin } from "./singlefin";
import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./influencer/follower";
import { State } from "./influencer/state";
import { Modules } from "./modules";
import { HtmlTemplateEngine } from "js-html-template-engine";

declare global {
    var SINGLEFIN_APP_NAME: any;
    var SINGLEFIN_MODEL: any;
}

global.SINGLEFIN_APP_NAME = SINGLEFIN_APP_NAME;
global.SINGLEFIN_MODEL = SINGLEFIN_MODEL;

declare const SINGLEFIN_APP_NAME: string;
declare const SINGLEFIN_TRENDS: any;
//declare const SINGLEFIN_MODEL: any;
declare const SINGLEFIN_PAGES: any;
declare const SINGLEFIN_PAGES_COMPONENTS: any;


const singlefin = {
    exports: Modules,
    newSession: (() => {
        const session = Singlefin.newSession(SINGLEFIN_APP_NAME, Modules.sources, Modules.states, SINGLEFIN_MODEL, SINGLEFIN_TRENDS);
    
        return session;
    }),
    render: ((singlefinSession: SinglefinSession, windowObject: any, page: string) => {
        const htmlTemplateEngine = new HtmlTemplateEngine(windowObject);
    
        for(const component in SINGLEFIN_PAGES_COMPONENTS) {
            htmlTemplateEngine.addComponent(component, SINGLEFIN_PAGES_COMPONENTS[component]);
        }
    
        return htmlTemplateEngine.render(SINGLEFIN_PAGES[page], "server", singlefinSession.model);
    })
};

export { Singlefin, SinglefinSession, Follower, State, singlefin }