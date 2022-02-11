import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./main";


export class Singlefin {
    public static newSession(name: string, bridges: any, sources: any, states: any, model: any, trends: any, pages: any, pagesComponents: any, handlers: any, data: any) {
        const session = new SinglefinSession(pages, pagesComponents, handlers);

        for(const bridge in bridges) {
            session.addBridge(bridges[bridge].name, new bridges[bridge](data));
        }

        for(const source in sources) {
            session.addSource(sources[source].name, new sources[source](data));
        }

        session.loadModel(model);

        return session;
    }
}
