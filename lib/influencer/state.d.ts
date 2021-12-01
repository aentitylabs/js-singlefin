import { Follower } from "./follower";
export declare abstract class State {
    private _name;
    set name(name: string);
    get name(): string;
    abstract handle(follower: Follower, trend: string, model: any): void;
}
