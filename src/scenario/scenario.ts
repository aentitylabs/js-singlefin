import { Context } from "./context";

export class Scenario {
    private _name: string;
    private _contexts: Context[] = [];


    public constructor(name: string) {
        this._name = name;
    }

    public get name() {
        return this._name;
    }

    public addContext(context: Context) {
        this._contexts.push(context);
    }

    public resolve(model: any, done: any) {
        this.resolveContext(model, 0, done);
    }

    public serialize() {
        const contexts: any[] = [];

        for(const context of this._contexts) {
            contexts.push({
                name: context.name,
                state: context.state
            });
        }

        return {
            name: this._name,
            contexts: contexts
        };
    }

    public deserialize(scenario: any, contextStatesInstances: any) {
        this._contexts = [];

        for(const context of scenario.contexts) {
            const contextInstance: Context = new Context(context.name, context.state);

            contextInstance.states = contextStatesInstances[context.name];

            this._contexts.push(contextInstance);
        }
    }

    private resolveContext(model: any, index: number, done: any) {
        if(index === this._contexts.length) {
            done();

            return;
        }

        const context: Context = this._contexts[index];

        context.resolve(model, () => {
            this.resolveContext(model, ++index, done);
        }, () => {
            done();
        })
    }
}