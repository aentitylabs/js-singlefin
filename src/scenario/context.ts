import { State } from "./state";

export class Context {
    private _name: string;
    private _states: any = {};
    private _state: string = "";


    constructor(name: string, state: string) {
        this._name = name;
        this._state = state;
    }

    public set states(value: any) {
        this._states = value;
    }

    public get name(): string {
        return this._name;
    }

    public set state(value: string) {
        this._state = value;
    }

    public get state(): string {
        return this._state;
    }

    public resolve(model: any, done: any, error: any) {
        if(!this._states.hasOwnProperty(this._state)) {
            console.log("state " + this._state + " not exist in context " + this._name);

            error();

            return;
        }

        const state: State = new this._states[this._state]();

        state.resolve(model, (state?: string) => {
            if(state) {
                this._state = state;
            }

            done();
        }, (state?: string) => {
            if(state) {
                this._state = state;
            }

            error();
        });
    }
}
