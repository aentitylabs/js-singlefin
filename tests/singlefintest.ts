import { describe, it } from 'mocha'
import { expect } from 'chai'
import { MockSource } from '../src/test/mocksource';
import { SinglefinSession } from '../src/singlefinsession';
import { State } from '../src/scenario/state';
import { MockBridge } from '../src/test/mockbridge';


describe('Broker', () => {
    it('test scenario', () => {
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("Mock", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });

        session.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hello";
                    model.data.val2 = "Tom";

                    next();
                }
            }
        });
        session.addContextStatesInstances("context2", {
            "context2state1": class Context2State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi";
                    model.data.val2 = "Alice";

                    next();
                }
            }
        });

        session.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            }]
        });

        session.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context2",
                state: "context2state1"
            }]
        });

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("hello");
        expect(session.model.data.val2).to.eql("Tom");

        session.sync("scenario2");

        expect(session.model.data.val1).to.eql("hi");
        expect(session.model.data.val2).to.eql("Alice");
    })

    it('test scenario change context state', () => {
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("Mock", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });

        session.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hello";
                    model.data.val2 = "Tom";

                    next("context1state2");
                }
            },
            "context1state2": class Context1State2 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "bye";
                    model.data.val2 = "Robert";

                    next();
                }
            }
        });
        session.addContextStatesInstances("context2", {
            "context2state1": class Context2State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi";
                    model.data.val2 = "Alice";

                    next();
                }
            }
        });

        session.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            }]
        });

        session.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context2",
                state: "context2state1"
            }]
        });

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("hello");
        expect(session.model.data.val2).to.eql("Tom");

        session.sync("scenario2");

        expect(session.model.data.val1).to.eql("hi");
        expect(session.model.data.val2).to.eql("Alice");

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("bye");
        expect(session.model.data.val2).to.eql("Robert");
    })

    it('test scenario with more contexts and change context state', () => {
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("Mock", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });

        session.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hello";
                    model.data.val2 = "Tom";

                    next();
                }
            }
        });
        session.addContextStatesInstances("context2", {
            "context2state1": class Context2State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi";
                    model.data.val2 = "Alice";

                    next("context2state2");
                }
            },
            "context2state2": class Context2State2 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "bye";
                    model.data.val2 = "Robert";

                    next();
                }
            }
        });

        session.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            },{
                name: "context2",
                state: "context2state2"
            }]
        });

        session.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context2",
                state: "context2state1"
            }]
        });

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("bye");
        expect(session.model.data.val2).to.eql("Robert");

        session.sync("scenario2");

        expect(session.model.data.val1).to.eql("hi");
        expect(session.model.data.val2).to.eql("Alice");

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("bye");
        expect(session.model.data.val2).to.eql("Robert");
    })

    it('test scenario error', () => {
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("Mock", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });

        source.loadedEntities = [{
            "val1": "",
            "val2": ""
        }];

        session.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hello";
                    model.data.val2 = "Tom";

                    error();
                }
            },
            "context1state2": class Context1State2 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "bye";
                    model.data.val2 = "Robert";

                    next();
                }
            }
        });
        session.addContextStatesInstances("context2", {
            "context2state1": class Context2State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi";
                    model.data.val2 = "Alice";

                    next();
                }
            }
        });

        session.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            }]
        });

        session.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context2",
                state: "context2state1"
            }]
        });

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("hello");
        expect(session.model.data.val2).to.eql("Tom");

        session.sync("scenario2");

        expect(session.model.data.val1).to.eql("hi");
        expect(session.model.data.val2).to.eql("Alice");

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("hello");
        expect(session.model.data.val2).to.eql("Tom");
    })

    it('test scenario error and change contex state', () => {
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("Mock", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });

        session.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hello";
                    model.data.val2 = "Tom";

                    error("context1state3");
                }
            },
            "context1state2": class Context1State2 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "bye";
                    model.data.val2 = "Robert";

                    next();
                }
            },
            "context1state3": class Context1State3 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "error";
                    model.data.val2 = "error!";

                    next();
                }
            }
        });
        session.addContextStatesInstances("context2", {
            "context2state1": class Context2State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi";
                    model.data.val2 = "Alice";

                    next();
                }
            }
        });

        session.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            }]
        });

        session.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context2",
                state: "context2state1"
            }]
        });

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("hello");
        expect(session.model.data.val2).to.eql("Tom");

        session.sync("scenario2");

        expect(session.model.data.val1).to.eql("hi");
        expect(session.model.data.val2).to.eql("Alice");

        session.sync("scenario1");

        expect(session.model.data.val1).to.eql("error");
        expect(session.model.data.val2).to.eql("error!");
    })

    it('test scenario and remote sync', () => {
        const bridge = new MockBridge();

        const serverSession: SinglefinSession = new SinglefinSession();

        const clientSession: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        serverSession.addSource("Data", source);
        clientSession.addSource("Data", source);

        serverSession.addBridge("MockBridge", bridge);
        clientSession.addBridge("MockBridge", bridge);

        serverSession.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });
        clientSession.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "data": {
                    "entity": "Data",
                    "ref": false,
                    "properties": {
                        "val1": {
                            "value": ""
                        },
                        "val2": {
                            "value": ""
                        }
                    }
                }
            }
        });

        serverSession.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi!";
                    model.data.val2 = "I'm a server";

                    next();
                }
            },
            "context1state2": class Context1State2 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hello!";
                    model.data.val2 = "How are you?";

                    next();
                }
            }
        });

        clientSession.addContextStatesInstances("context1", {
            "context1state1": class Context1State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    next("context1state2");
                }
            },
            "context1state2": class Context1State2 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "bye";
                    model.data.val2 = "Robert";

                    next();
                }
            }
        });
        clientSession.addContextStatesInstances("context2", {
            "context2state1": class Context2State1 implements State {
                resolve(model: any, next: any, error: any): void {
                    model.data.val1 = "hi";
                    model.data.val2 = "Alice";

                    next();
                }
            }
        });

        serverSession.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            }]
        });
        serverSession.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context2",
                state: "context2state1"
            }]
        });

        clientSession.addScenario({
            name: "scenario1",
            contexts: [{
                name: "context1",
                state: "context1state1"
            }]
        });
        clientSession.addScenario({
            name: "scenario2",
            contexts: [{
                name: "context1",
                state: "context1state1"
            },{
                name: "context2",
                state: "context2state1"
            }]
        });

        bridge.onReceived((actions: any) => {
            serverSession.syncFrom("MockBridge", actions);
        });

        clientSession.syncTo("MockBridge", "scenario1");

        expect(clientSession.model.data.val1).to.eql("bye");
        expect(clientSession.model.data.val2).to.eql("Robert");

        expect(serverSession.model.data.val1).to.eql("hello!");
        expect(serverSession.model.data.val2).to.eql("How are you?");

        clientSession.sync("scenario2");

        expect(clientSession.model.data.val1).to.eql("hi");
        expect(clientSession.model.data.val2).to.eql("Alice");

        expect(serverSession.model.data.val1).to.eql("hello!");
        expect(serverSession.model.data.val2).to.eql("How are you?");
    })
})