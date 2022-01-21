import { Follower } from "./follower";
import { Influencer } from "./influencer";

export abstract class State {
    private _name: string = "";


    public set name(name: string) {
        this._name = name;
    }

    public get name() {
        return this._name;
    }

    public abstract handle(influencer: Influencer, follower: Follower, trend: string, model: any): void;
}