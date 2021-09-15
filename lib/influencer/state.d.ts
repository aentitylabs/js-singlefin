import { Follower } from "./follower";
export declare abstract class State {
    private _name;
    private _follower;
    set name(name: string);
    get name(): string;
    set follower(follower: Follower);
    changeState(state: string): void;
    abstract handle(trend: string, model: any): void;
}
