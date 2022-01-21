import { Influencer } from "./influencer";
import { NullState } from "./nullstate";
import { State } from "./state";

export class Follower {
    private _name: string;
    private _state: State = new NullState();
    private _influencers: Influencer[] = [];
    private _states: any = {};
    private _trendStates: any = {};


    public constructor(name: string) {
        this._name = name;
    }

    public get name() {
        return this._name;
    }
    
    public addInfluencer(influencer: Influencer) {
        this._influencers.push(influencer);
    }

    public addState(stateName: string, state: State) {
        state.name = stateName;

        this._states[stateName] = state;
    }

    public subscribe(influencer: Influencer) {
        this.addInfluencer(influencer);

        influencer.subscribe(this);
    }

    public follow(trend: string) {
        this._influencers.forEach((influencer: Influencer) => {
            influencer.follow(trend, this._name);
        });
    }

    public on(trend: string, state: string) {
        this._trendStates[trend] = this._states[state];
    }

    public changeState(state: string) {
        this._state = this._states[state];
    }

    public handle(influencer: Influencer, trend: string, model: any): void {
        this._state.handle(influencer, this, trend, model);
    }

    public onTrendChange(influencer: Influencer, trend: string, model: any): void {
        if(this._trendStates[trend]) {
            this._state = this._trendStates[trend];
        }
        
        this.handle(influencer, trend, model);
    }

    public set state(state: State) {
        this._state = state;
    }

    public serialize(): any {
        return {
            name: this._name,
            state: this._state.name
        }
    }

    public deserialize(follower: any) {
        this._name = follower.name;
        this._state = this._states[follower.state];
    }
}