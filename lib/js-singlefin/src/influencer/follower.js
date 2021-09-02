"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follower = void 0;
const nullstate_1 = require("./nullstate");
class Follower {
    constructor(name, influencer) {
        this._name = name;
        this._influencer = influencer;
        this._state = new nullstate_1.NullState(this._influencer);
    }
    handle(trend, model) {
        this._state.handle(trend, model);
    }
    onTrendChange(trend, model) {
        this.handle(trend, model);
    }
    set state(state) {
        this._state = state;
    }
    serialize() {
        return {
            name: this._name,
            //state: this._state.constructor.name
        };
    }
    deserialize(follower) {
        this._name = follower.name;
        this._state = new follower.state(this._influencer);
    }
}
exports.Follower = Follower;
//# sourceMappingURL=follower.js.map