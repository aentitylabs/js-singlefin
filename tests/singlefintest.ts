import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Singlefin } from '../src/singlefin';
import { LoginFormState } from '../src/test/loginformstate';
import { HomeState } from '../src/test/homestate';
import { ClientLoginFormState } from '../src/test/clientloginformstate';
import { ClientHomeState } from '../src/test/clienthomestate';
import { AlertClosedState } from '../src/test/alertclosedstate';
import { AlertWaitState } from '../src/test/alertwaitstate';
import { MockSource } from '../src/test/mocksource';
import { MockBridge } from '../src/test/mockbridge';
import { Follower } from '../src/influencer/follower';


describe('Broker', () => {
    it('test singlefin', () => {        
        const singlefin = new Singlefin();

        const source: MockSource = new MockSource();

        singlefin.addSource("User", source);

        singlefin.setModel({
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
        
        app.subscribe(singlefin);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("access to homepage");

        const appAlert = new Follower("AppAlert");
        
        appAlert.subscribe(singlefin);

        appAlert.addState("is closed", new AlertClosedState());
        appAlert.addState("is showing wait alert", new AlertWaitState());

        appAlert.follow("login");
        appAlert.follow("access to homepage");

        singlefin.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }],
            "login": [{
                "name": "AppAlert",
                "state": "is closed"
            }]
        });

        singlefin.inform("open app");

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
        }).to.eql(singlefin.serialize());

        singlefin.model.user.username = "tom";
        singlefin.model.user.password = "password";

        source.updatedEntity = {
            "id": 1,
            "name": "Tom",
            "role": "administrator",
            "username": "tom",
            "password": ""
        };

        singlefin.inform("login");

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
        }).to.eql(singlefin.serialize());

        singlefin.inform("access to homepage");

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
        }).to.eql(singlefin.serialize());
    })

    it('test singlefin with trend listener', () => {        
        const singlefin = new Singlefin();

        const source: MockSource = new MockSource();

        singlefin.addSource("User", source);

        singlefin.setModel({
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

        app.subscribe(singlefin);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("access to homepage");

        const appAlert = new Follower("AppAlert");

        appAlert.subscribe(singlefin);

        appAlert.addState("is closed", new AlertClosedState());
        appAlert.addState("is showing wait alert", new AlertWaitState());

        appAlert.on("login", "is showing wait alert");
        appAlert.on("access to homepage", "is closed");

        appAlert.follow("login");
        appAlert.follow("access to homepage");

        singlefin.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }],
            "login": [{
                "name": "AppAlert",
                "state": "is closed"
            }]
        });

        singlefin.inform("open app");

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
        }).to.eql(singlefin.serialize());

        singlefin.model.user.username = "tom";
        singlefin.model.user.password = "password";

        source.updatedEntity = {
            "id": 1,
            "name": "Tom",
            "role": "administrator",
            "username": "tom",
            "password": ""
        };

        singlefin.inform("login");

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
        }).to.eql(singlefin.serialize());

        singlefin.inform("access to homepage");

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
        }).to.eql(singlefin.serialize());
    })

    it('test singlefin with bridge', () => {
        const bridge = new MockBridge();

        const singlefinServer = new Singlefin();
        const singlefinClient = new Singlefin();

        const source: MockSource = new MockSource();

        singlefinServer.addSource("User", source);
        singlefinClient.addSource("User", source);

        singlefinServer.setModel({
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
        singlefinClient.setModel({
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

        app.subscribe(singlefinServer);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("login");
        app.follow("access to homepage");

        const appClient = new Follower("App");

        appClient.subscribe(singlefinClient);

        appClient.addState("is showing login form", new ClientLoginFormState());
        appClient.addState("is showing homepage", new ClientHomeState());

        appClient.follow("open app");
        appClient.follow("login");
        appClient.follow("access to homepage");

        const appAlert = new Follower("AppAlert");

        appAlert.subscribe(singlefinClient);

        appAlert.addState("is closed", new AlertClosedState());
        appAlert.addState("is showing wait alert", new AlertWaitState());

        appAlert.on("login", "is showing wait alert");
        appAlert.on("access to homepage", "is closed");

        appAlert.follow("login");
        appAlert.follow("access to homepage");

        singlefinServer.init({
            "open app": [{
                "name": "App",
                "state": "is showing homepage"
            }]
        });

        singlefinClient.init({
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
            singlefinServer.informFrom(bridge, actions);
        });

        singlefinClient.informTo(bridge, "open app").then(() => {
            expect({
                "followers": {
                    "App": {
                        "name": "App",
                        "state": "is showing login form"
                    }
                }
            }).to.eql(singlefinServer.serialize());
    
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
            }).to.eql(singlefinClient.serialize());
    
            singlefinClient.model.user.username = "tom";
            singlefinClient.model.user.password = "password";
    
            source.updatedEntity = {
                "id": 1,
                "name": "Tom",
                "role": "administrator",
                "username": "tom",
                "password": ""
            };
    
            singlefinClient.informTo(bridge, "login").then(() => {
                expect({
                    "followers": {
                        "App": {
                            "name": "App",
                            "state": "is showing homepage"
                        }
                    }
                }).to.eql(singlefinServer.serialize());
        
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
                }).to.eql(singlefinClient.serialize());
        
                singlefinClient.informTo(bridge, "access to homepage").then(() => {
                    expect({
                        "followers": {
                            "App": {
                                "name": "App",
                                "state": "is showing homepage"
                            }
                        }
                    }).to.eql(singlefinServer.serialize());
            
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
                    }).to.eql(singlefinClient.serialize());
                });
            }); 
        });
    })
})