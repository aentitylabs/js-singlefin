import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./main";


export class Singlefin {
    public static newSession(name: string, sources: any, states: any, model: any, trends: any) {
        const session = new SinglefinSession();

        session.loadModel(model);

        for(const source in sources) {
            session.addSource(sources[source].name, new sources[source]());
        }

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
