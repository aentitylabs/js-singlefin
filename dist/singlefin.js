(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-entity-store"));
	else if(typeof define === 'function' && define.amd)
		define(["jsentitystore"], factory);
	else if(typeof exports === 'object')
		exports["jssinglefin"] = factory(require("js-entity-store"));
	else
		root["jssinglefin"] = factory(root["jsentitystore"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_js_entity_store__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./influencer/follower.ts":
/*!********************************!*\
  !*** ./influencer/follower.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Follower = void 0;
const nullstate_1 = __webpack_require__(/*! ./nullstate */ "./influencer/nullstate.ts");
class Follower {
    constructor(name) {
        this._state = new nullstate_1.NullState();
        this._influencers = [];
        this._states = {};
        this._trendStates = {};
        this._name = name;
    }
    get name() {
        return this._name;
    }
    addInfluencer(influencer) {
        this._influencers.push(influencer);
    }
    addState(stateName, state) {
        state.name = stateName;
        this._states[stateName] = state;
    }
    subscribe(influencer) {
        this.addInfluencer(influencer);
        influencer.subscribe(this);
    }
    follow(trend) {
        this._influencers.forEach((influencer) => {
            influencer.follow(trend, this._name);
        });
    }
    on(trend, state) {
        this._trendStates[trend] = this._states[state];
    }
    changeState(state) {
        this._state = this._states[state];
    }
    handle(trend, model) {
        this._state.handle(this, trend, model);
    }
    onTrendChange(trend, model) {
        if (this._trendStates[trend]) {
            this._state = this._trendStates[trend];
        }
        this.handle(trend, model);
    }
    set state(state) {
        this._state = state;
    }
    serialize() {
        return {
            name: this._name,
            state: this._state.name
        };
    }
    deserialize(follower) {
        this._name = follower.name;
        this._state = this._states[follower.state];
    }
}
exports.Follower = Follower;


/***/ }),

/***/ "./influencer/influencer.ts":
/*!**********************************!*\
  !*** ./influencer/influencer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Influencer = void 0;
class Influencer {
    constructor() {
        this._followers = {};
        this._trends = {};
    }
    subscribe(follower) {
        this._followers[follower.name] = follower;
    }
    init(trends) {
        for (const key in trends) {
            const followers = trends[key];
            for (let i = 0; i < followers.length; i++) {
                if (this._followers[followers[i].name]) {
                    const follower = this._followers[followers[i].name];
                    follower.deserialize(followers[i]);
                }
            }
        }
    }
    follow(trend, follower) {
        if (!this._trends[trend]) {
            this._trends[trend] = [];
        }
        this._trends[trend].push(this._followers[follower]);
    }
    newTrend(trend, model) {
        const followers = this._trends[trend];
        if (!followers) {
            return;
        }
        for (let i = 0; i < followers.length; i++) {
            followers[i].onTrendChange(trend, model);
        }
    }
    serialize() {
        const influencer = {
            followers: {}
        };
        for (const key in this._followers) {
            const follower = this._followers[key];
            influencer.followers[key] = follower.serialize();
        }
        return influencer;
    }
}
exports.Influencer = Influencer;


/***/ }),

/***/ "./influencer/nullstate.ts":
/*!*********************************!*\
  !*** ./influencer/nullstate.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NullState = void 0;
const state_1 = __webpack_require__(/*! ./state */ "./influencer/state.ts");
class NullState extends state_1.State {
    handle(follower, trend, model) {
    }
}
exports.NullState = NullState;


/***/ }),

/***/ "./influencer/state.ts":
/*!*****************************!*\
  !*** ./influencer/state.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.State = void 0;
class State {
    constructor() {
        this._name = "";
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}
exports.State = State;


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.State = exports.Follower = exports.Singlefin = void 0;
const singlefin_1 = __webpack_require__(/*! ./singlefin */ "./singlefin.ts");
Object.defineProperty(exports, "Singlefin", ({ enumerable: true, get: function () { return singlefin_1.Singlefin; } }));
const follower_1 = __webpack_require__(/*! ./influencer/follower */ "./influencer/follower.ts");
Object.defineProperty(exports, "Follower", ({ enumerable: true, get: function () { return follower_1.Follower; } }));
const state_1 = __webpack_require__(/*! ./influencer/state */ "./influencer/state.ts");
Object.defineProperty(exports, "State", ({ enumerable: true, get: function () { return state_1.State; } }));


/***/ }),

/***/ "./session.ts":
/*!********************!*\
  !*** ./session.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Session = void 0;
const js_entity_store_1 = __webpack_require__(/*! js-entity-store */ "js-entity-store");
const influencer_1 = __webpack_require__(/*! ./influencer/influencer */ "./influencer/influencer.ts");
const singlefinsource_1 = __webpack_require__(/*! ./singlefinsource */ "./singlefinsource.ts");
class Session extends influencer_1.Influencer {
    constructor() {
        super();
        this._entityStore = new js_entity_store_1.EntityStore();
        this._currentTrend = js_entity_store_1.EntityFactory.newEntity(this._entityStore, {
            "entity": "Singlefin",
            "ref": false,
            "properties": {
                "trend": {
                    "value": ""
                },
                "trends": {
                    "value": {}
                }
            }
        });
        this._entityStore.addSource("Singlefin", new singlefinsource_1.SinglefinSource());
    }
    setModel(model) {
        this._model = js_entity_store_1.EntityFactory.newEntity(this._entityStore, model);
    }
    get model() {
        return this._model;
    }
    addSource(entityName, source) {
        this._entityStore.addSource(entityName, source);
    }
    inform(trend) {
        const followers = this._trends[trend];
        this._currentTrend.trend = trend;
        this._currentTrend.trends[trend] = this.serializeFollowers(followers);
        this._entityStore.sync();
        this.newTrend(trend, this._model);
        this._entityStore.sync();
    }
    informTo(bridge, trend) {
        const followers = this._trends[trend];
        this._currentTrend.trend = trend;
        this._currentTrend.trends[trend] = this.serializeFollowers(followers);
        return this._entityStore.syncTo(bridge).then(() => {
            this.init(this._currentTrend.trends);
            this.newTrend(this._currentTrend.trend, this._model);
            return this._entityStore.syncTo(bridge);
        });
    }
    informFrom(bridge, actions) {
        this._entityStore.syncFrom(bridge, actions, () => {
            this.init(this._currentTrend.trends);
            this.newTrend(this._currentTrend.trend, this._model);
            const followers = this._trends[this._currentTrend.trend];
            this._currentTrend.trends[this._currentTrend.trend] = this.serializeFollowers(followers);
        });
    }
    serializeFollowers(followers) {
        const serializedFollowers = [];
        for (let i = 0; i < followers.length; i++) {
            serializedFollowers.push(followers[i].serialize());
        }
        return serializedFollowers;
    }
}
exports.Session = Session;


/***/ }),

/***/ "./singlefin.ts":
/*!**********************!*\
  !*** ./singlefin.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Singlefin = void 0;
const session_1 = __webpack_require__(/*! ./session */ "./session.ts");
const main_1 = __webpack_require__(/*! ./main */ "./main.ts");
class Singlefin {
    newSession(name, configuration) {
        const session = new session_1.Session();
        for (const source in Singlefin._sources) {
            session.addSource(Singlefin._sources[source].name, new Singlefin._sources[source]());
        }
        const app = new main_1.Follower(name);
        app.subscribe(session);
        for (const state in Singlefin._states) {
            app.addState(Singlefin._states[state].name, new Singlefin._states[state]());
        }
        const trends = {};
        for (const trend in configuration.trends) {
            app.follow(trend);
            if (configuration.trends[trend].hasOwnProperty("defaultstate")) {
                app.on(trend, configuration.trends[trend]["defaultstate"]);
            }
            if (configuration.trends[trend].hasOwnProperty("initialstate")) {
                trends[trend] = [];
                trends[trend].push({
                    name: name,
                    state: configuration.trends[trend]["initialstate"]
                });
            }
            if (configuration.trends[trend].hasOwnProperty("defaultstate")) {
                app.on(trend, configuration.trends[trend]["defaultstate"]);
            }
        }
        session.init(trends);
        return session;
    }
    static set handlers(value) {
        Singlefin._handlers[value.name] = value;
    }
    static set sources(value) {
        Singlefin._sources[value.name] = value;
    }
    static set bridges(value) {
        Singlefin._bridges[value.name] = value;
    }
    static set states(value) {
        Singlefin._states[value.name] = value;
    }
}
exports.Singlefin = Singlefin;
Singlefin._handlers = {};
Singlefin._sources = {};
Singlefin._bridges = {};
Singlefin._states = {};


/***/ }),

/***/ "./singlefinsource.ts":
/*!****************************!*\
  !*** ./singlefinsource.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SinglefinSource = void 0;
const js_entity_store_1 = __webpack_require__(/*! js-entity-store */ "js-entity-store");
class SinglefinSource extends js_entity_store_1.Source {
    load(entity) {
        return entity;
    }
    update(entity) {
        return entity;
    }
    delete(entity) {
    }
}
exports.SinglefinSource = SinglefinSource;


/***/ }),

/***/ "js-entity-store":
/*!**************************************************************************************************************************!*\
  !*** external {"commonjs":"js-entity-store","commonjs2":"js-entity-store","amd":"jsentitystore","root":"jsentitystore"} ***!
  \**************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_js_entity_store__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=singlefin.js.map