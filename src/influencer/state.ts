import { Follower } from "./follower";

export abstract class State {
    private _name: string = "";
    private _follower: Follower | undefined;


    public set name(name: string) {
        this._name = name;
    }

    public get name() {
        return this._name;
    }

    public set follower(follower: Follower) {
        this._follower = follower;
    }

    public changeState(state: string) {
        if(this._follower) {
            this._follower.changeState(state);
        }
    }

    public abstract handle(trend: string, model: any): void;
}