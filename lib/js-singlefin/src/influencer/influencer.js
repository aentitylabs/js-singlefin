"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Influencer = void 0;
const follower_1 = require("./follower");
class Influencer {
    constructor() {
        this._followers = {};
    }
    follow(trend, follower) {
        if (this._followers[trend]) {
            this._followers[trend] = [];
        }
        this._followers[trend].push(follower);
    }
    newTrend(trend, model) {
        const followers = this._followers[trend];
        for (let i = 0; followers.length > 0; i++) {
            followers[i].onTrendChange(trend, model);
        }
    }
    serialize() {
        const influencer = {
            followers: {}
        };
        for (const key in this._followers) {
            const followers = this._followers[key];
            influencer.followers[key] = [];
            for (let i = 0; followers.length > 0; i++) {
                influencer.followers[key].push(followers[i].serialize());
            }
        }
        return influencer;
    }
    deserialize(influencer) {
        for (const key in influencer.followers) {
            const followers = influencer.followers[key];
            this._followers[key] = [];
            for (let i = 0; followers.length > 0; i++) {
                const follower = new follower_1.Follower(followers[i].name, this);
                this._followers[key].push(follower.deserialize(followers[i]));
            }
        }
    }
}
exports.Influencer = Influencer;
//# sourceMappingURL=influencer.js.map