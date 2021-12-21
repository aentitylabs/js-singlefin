import { SinglefinSession } from "../singlefinsession";
import { Modules } from "./modules";
declare const singlefin: {
    exports: typeof Modules;
    newSession: () => SinglefinSession;
    render: (singlefinSession: SinglefinSession, windowObject: any, page: string) => import("js-template-engine").Component;
};
export { singlefin };
