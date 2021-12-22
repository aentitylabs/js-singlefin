import { describe, it } from 'mocha'
import { expect } from 'chai'
import { LoginFormState } from '../src/test/loginformstate';
import { HomeState } from '../src/test/homestate';
import { ClientLoginFormState } from '../src/test/clientloginformstate';
import { ClientHomeState } from '../src/test/clienthomestate';
import { AlertClosedState } from '../src/test/alertclosedstate';
import { AlertWaitState } from '../src/test/alertwaitstate';
import { MockSource } from '../src/test/mocksource';
import { MockBridge } from '../src/test/mockbridge';
import { Follower } from '../src/influencer/follower';
import { SinglefinSession } from '../src/singlefinsession';


describe('Broker', () => {
    it('test singlefin', () => {        
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("User", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "user": {
                    "entity": "User",
                    "ref": false,
                    "properties": {
                        "id": {
                            "value": ""
                        },
                        "name": {
                            "value": ""
                        },
                        "role": {
                            "value": ""
                        },
                        "username": {
                            "value": ""
                        },
                        "password": {
                            "value": ""
                        }
                    }
                }
            }
        });

        source.loadedEntities = [{
            "id": "",
            "name": "",
            "role": "",
            "username": "",
            "password": ""
        }];

        const app = new Follower("App");
        
        app.subscribe(session);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("access to homepage");

        const appAlert = new Follower("AppAlert");
        
        appAlert.subscribe(session);

        appAlert.addState("is closed", new AlertClosedState());
        appAlert.addState("is showing wait alert", new AlertWaitState());

        appAlert.follow("login");
        appAlert.follow("access to homepage");

        session.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }],
            "login": [{
                "name": "AppAlert",
                "state": "is closed"
            }]
        });

        session.inform("open app");

        expect({
            "followers": {
                "App": {
                    "name": "App",
                    "state": "is showing login form"
                },
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is closed"
                }
            }
        }).to.eql(session.serialize());

        session.model.user.username = "tom";
        session.model.user.password = "password";

        source.updatedEntity = {
            "id": 1,
            "name": "Tom",
            "role": "administrator",
            "username": "tom",
            "password": ""
        };

        session.inform("login");

        expect({
            "followers": {
                "App": {
                    "name": "App",
                    "state": "is showing login form"
                },
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is showing wait alert"
                }
            }
        }).to.eql(session.serialize());

        session.inform("access to homepage");

        expect({
            "followers": {
                "App": {
                    "name": "App",
                    "state": "is showing homepage"
                },
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is closed"
                }
            }
        }).to.eql(session.serialize());
    })

    it('test singlefin with trend listener', () => {
        const session: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        session.addSource("User", source);

        session.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "user": {
                    "entity": "User",
                    "ref": false,
                    "properties": {
                        "id": {
                            "value": ""
                        },
                        "name": {
                            "value": ""
                        },
                        "role": {
                            "value": ""
                        },
                        "username": {
                            "value": ""
                        },
                        "password": {
                            "value": ""
                        }
                    }
                }
            }
        });

        source.loadedEntities = [{
            "id": "",
            "name": "",
            "role": "",
            "username": "",
            "password": ""
        }];
        
        const app = new Follower("App");

        app.subscribe(session);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("access to homepage");

        const appAlert = new Follower("AppAlert");

        appAlert.subscribe(session);

        appAlert.addState("is closed", new AlertClosedState());
        appAlert.addState("is showing wait alert", new AlertWaitState());

        appAlert.on("login", "is showing wait alert");
        appAlert.on("access to homepage", "is closed");

        appAlert.follow("login");
        appAlert.follow("access to homepage");

        session.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }],
            "login": [{
                "name": "AppAlert",
                "state": "is closed"
            }]
        });

        session.inform("open app");

        expect({
            "followers": {
                "App": {
                    "name": "App",
                    "state": "is showing login form"
                },
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is closed"
                }
            }
        }).to.eql(session.serialize());

        session.model.user.username = "tom";
        session.model.user.password = "password";

        source.updatedEntity = {
            "id": 1,
            "name": "Tom",
            "role": "administrator",
            "username": "tom",
            "password": ""
        };

        session.inform("login");

        expect({
            "followers": {
                "App": {
                    "name": "App",
                    "state": "is showing login form"
                },
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is showing wait alert"
                }
            }
        }).to.eql(session.serialize());

        session.inform("access to homepage");

        expect({
            "followers": {
                "App": {
                    "name": "App",
                    "state": "is showing homepage"
                },
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is closed"
                }
            }
        }).to.eql(session.serialize());
    })

    it('test singlefin with bridge', () => {
        const bridge = new MockBridge();

        const serverSession: SinglefinSession = new SinglefinSession();

        const clientSession: SinglefinSession = new SinglefinSession();

        const source: MockSource = new MockSource();

        serverSession.addSource("User", source);
        clientSession.addSource("User", source);

        clientSession.addBridge("MockBridge", bridge);

        serverSession.loadModel({
            "entity": "App",
            "ref": false,
            "properties": {
                "user": {
                    "entity": "User",
                    "ref": false,
                    "properties": {
                        "id": {
                            "value": ""
                        },
                        "name": {
                            "value": ""
                        },
                        "role": {
                            "value": ""
                        },
                        "username": {
                            "value": ""
                        },
                        "password": {
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
                "user": {
                    "entity": "User",
                    "ref": false,
                    "properties": {
                        "id": {
                            "value": ""
                        },
                        "name": {
                            "value": ""
                        },
                        "role": {
                            "value": ""
                        },
                        "username": {
                            "value": ""
                        },
                        "password": {
                            "value": ""
                        }
                    }
                }
            }
        });

        source.loadedEntities = [{
            "id": "",
            "name": "",
            "role": "",
            "username": "",
            "password": ""
        },{
            "id": "",
            "name": "",
            "role": "",
            "username": "",
            "password": ""
        },{
            "id": "",
            "name": "",
            "role": "",
            "username": "",
            "password": ""
        }];

        const app = new Follower("App");

        app.subscribe(serverSession);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("login");
        app.follow("access to homepage");

        const appClient = new Follower("App");

        appClient.subscribe(clientSession);

        appClient.addState("is showing login form", new ClientLoginFormState());
        appClient.addState("is showing homepage", new ClientHomeState());

        appClient.follow("open app");
        appClient.follow("login");
        appClient.follow("access to homepage");

        const appAlert = new Follower("AppAlert");

        appAlert.subscribe(clientSession);

        appAlert.addState("is closed", new AlertClosedState());
        appAlert.addState("is showing wait alert", new AlertWaitState());

        appAlert.on("login", "is showing wait alert");
        appAlert.on("access to homepage", "is closed");

        appAlert.follow("login");
        appAlert.follow("access to homepage");

        serverSession.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }]
        });

        clientSession.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }],
            "login": [{
                "name": "AppAlert",
                "state": "is closed"
            }]
        });

        bridge.onReceived((actions: any) => {
            serverSession.informFrom("MockBridge", actions);
        });

        clientSession.informTo("MockBridge", "open app").then(() => {
            expect({
                "followers": {
                    "App": {
                        "name": "App",
                        "state": "is showing login form"
                    }
                }
            }).to.eql(serverSession.serialize());
    
            expect({
                "followers": {
                    "App": {
                        "name": "App",
                        "state": "is showing login form"
                    },
                    "AppAlert": {
                        "name": "AppAlert",
                        "state": "is closed"
                    }
                }
            }).to.eql(clientSession.serialize());
    
            clientSession.model.user.username = "tom";
            clientSession.model.user.password = "password";
    
            source.updatedEntity = {
                "id": 1,
                "name": "Tom",
                "role": "administrator",
                "username": "tom",
                "password": ""
            };
    
            clientSession.informTo("MockBridge", "login").then(() => {
                expect({
                    "followers": {
                        "App": {
                            "name": "App",
                            "state": "is showing homepage"
                        }
                    }
                }).to.eql(serverSession.serialize());
        
                expect({
                    "followers": {
                        "App": {
                            "name": "App",
                            "state": "is showing homepage"
                        },
                        "AppAlert": {
                            "name": "AppAlert",
                            "state": "is showing wait alert"
                        }
                    }
                }).to.eql(clientSession.serialize());
        
                clientSession.informTo("MockBridge", "access to homepage").then(() => {
                    expect({
                        "followers": {
                            "App": {
                                "name": "App",
                                "state": "is showing homepage"
                            }
                        }
                    }).to.eql(serverSession.serialize());
            
                    expect({
                        "followers": {
                            "App": {
                                "name": "App",
                                "state": "is showing homepage"
                            },
                            "AppAlert": {
                                "name": "AppAlert",
                                "state": "is closed"
                            }
                        }
                    }).to.eql(clientSession.serialize());
                });
            }); 
        });
    })
})