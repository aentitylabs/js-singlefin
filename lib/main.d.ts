import { Singlefin } from "./singlefin";
import { SinglefinSession } from "./singlefinsession";
import { Follower } from "./influencer/follower";
import { State } from "./influencer/state";
import { Modules } from "./modules";
declare global {
    var SINGLEFIN_APP_NAME: any;
    var SINGLEFIN_MODEL: any;
}
declare const singlefin: {
    exports: typeof Modules;
    newSession: () => SinglefinSession;
    render: (singlefinSession: SinglefinSession, windowObject: any, page: string) => import("js-template-engine").Component;
};
export { Singlefin, SinglefinSession, Follower, State, singlefin };
