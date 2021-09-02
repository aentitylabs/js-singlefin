import { Follower } from "./follower";

export class Influencer {
    protected _followers: any = {};
    protected _trends: any = {};


    public subscribe(follower: Follower){
        this._followers[follower.name] = follower;
    }

    public init(trends: any) {
        for(const key in trends) {
            const followers = trends[key];

            for(let i=0; i<followers.length; i++) {
                const follower = this._followers[followers[i].name];

                follower.deserialize(followers[i]);
            }
        }
    }

    public follow(trend: string, follower: string) {
        if(!this._trends[trend]) {
            this._trends[trend] = [];
        }
        
        this._trends[trend].push(this._followers[follower]);
    }

    public newTrend(trend: string, model: any) {
        const followers = this._trends[trend];

        if(!followers) {
            return;
        }

        for(let i=0; i<followers.length; i++) {
            followers[i].onTrendChange(trend, model);
        }
    }

    public serialize(): any {
        const influencer: any = {
            followers: {}
        };

        for(const key in this._followers) {
            const follower = this._followers[key];
            
            influencer.followers[key] = follower.serialize();
        }

        return influencer;
    }
}