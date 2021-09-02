"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singlefin = void 0;
const influencer_1 = require("./influencer/influencer");
const entitystore_1 = require("../../js-entity-store/src/entitystore");
const entityfactory_1 = require("../../js-entity-store/src/entityfactory");
class Singlefin extends influencer_1.Influencer {
    constructor(followers, model, bridge) {
        super();
        this._entityStore = new entitystore_1.EntityStore();
        this.deserialize(followers);
        this._model = entityfactory_1.EntityFactory.newEntity(this._entityStore, model);
        this._bridge = bridge;
    }
    addSource(entityName, source) {
        this._entityStore.addSource(entityName, source);
    }
    sync(trend) {
        if (!this._bridge) {
            this._entityStore.sync();
        }
        else {
            this._entityStore.syncTo(this._bridge);
        }
        this.newTrend(trend, this._model);
        if (!this._bridge) {
            this._entityStore.sync();
        }
        else {
            this._entityStore.syncTo(this._bridge);
        }
    }
}
exports.Singlefin = Singlefin;
//# sourceMappingURL=singlefin.js.map