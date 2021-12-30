import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./main";


export class Singlefin {
    public static newSession(name: string, bridges: any, sources: any, states: any, model: any, trends: any, data: any) {
        const session = new SinglefinSession();

        for(const bridge in bridges) {
            session.addBridge(bridges[bridge].name, new bridges[bridge](data));
        }

        for(const source in sources) {
            session.addSource(sources[source].name, new sources[source](data));
        }

        session.loadModel(model);

        const app = new Follower(name);
        
        app.subscribe(session);

        for(const state in states) {
            app.addState(states[state].name, new states[state]());
        }
        
        const initialTrends: any = {};

        for(const trend in trends) {
            app.follow(trend);

            if(trends[trend].hasOwnProperty("defaultstate")) {
                app.on(trend, trends[trend]["defaultstate"]);
            }

            if(trends[trend].hasOwnProperty("initialstate")) {
                initialTrends[trend] = [];
                initialTrends[trend].push({
                    name: name,
                    state: trends[trend]["initialstate"]
                });
            }

            if(trends[trend].hasOwnProperty("defaultstate")) {
                app.on(trend, trends[trend]["defaultstate"]);
            }
        }

        session.init(initialTrends);

        return session;
    }
}
