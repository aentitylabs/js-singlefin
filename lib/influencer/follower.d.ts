import { Influencer } from "./influencer";
import { State } from "./state";
export declare class Follower {
    private _name;
    private _state;
    private _influencers;
    private _states;
    private _trendStates;
    constructor(name: string);
    get name(): string;
    addInfluencer(influencer: Influencer): void;
    addState(stateName: string, state: State): void;
    subscribe(influencer: Influencer): void;
    follow(trend: string): void;
    on(trend: string, state: string): void;
    changeState(state: string): void;
    handle(influencer: Influencer, trend: string, model: any): void;
    onTrendChange(influencer: Influencer, trend: string, model: any): void;
    set state(state: State);
    serialize(): any;
    deserialize(follower: any): void;
}
