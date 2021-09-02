import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Singlefin } from '../src/singlefin';
import { LoginFormState } from '../src/test/loginformstate';
import { HomeState } from '../src/test/homestate';
import { AlertClosedState } from '../src/test/alertclosedstate';
import { AlertWaitState } from '../src/test/alertwaitstate';
import { CloudCheckAuthorizationState } from '../src/test/cloudcheckauthorizationstate';
import { CloudLoginState } from '../src/test/cloudloginstate';
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
            "entity": "User",
            "ref": false,
            "properties": {
                "id": {
                    "value": 1
                },
                "name": {
                    "value": "Tom"
                },
                "role": {
                    "value": "administrator"
                },
                "username": {
                    "value": "tom"
                },
                "password": {
                    "value": ""
                }
            }
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
            "entity": "User",
            "ref": false,
            "properties": {
                "id": {
                    "value": 1
                },
                "name": {
                    "value": "Tom"
                },
                "role": {
                    "value": "administrator"
                },
                "username": {
                    "value": "tom"
                },
                "password": {
                    "value": ""
                }
            }
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
        },{
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
        },{
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
        }];

        const app = new Follower("App");

        app.subscribe(singlefinServer);

        app.addState("is showing login form", new LoginFormState());
        app.addState("is showing homepage", new HomeState());

        app.follow("open app");
        app.follow("login");
        app.follow("access to homepage");

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
            "login": [{
                "name": "AppAlert",
                "state": "is closed"
            }]
        });

        bridge.onReceived((actions: any) => {
            singlefinServer.informFrom(bridge, actions);
        });

        singlefinClient.informTo(bridge, "open app");

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
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is closed"
                }
            }
        }).to.eql(singlefinClient.serialize());

        singlefinClient.model.user.username = "tom";
        singlefinClient.model.user.password = "password";

        source.updatedEntity = {
            "entity": "User",
            "ref": false,
            "properties": {
                "id": {
                    "value": 1
                },
                "name": {
                    "value": "Tom"
                },
                "role": {
                    "value": "administrator"
                },
                "username": {
                    "value": "tom"
                },
                "password": {
                    "value": ""
                }
            }
        };

        singlefinClient.informTo(bridge, "login");

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
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is showing wait alert"
                }
            }
        }).to.eql(singlefinClient.serialize());

        singlefinClient.informTo(bridge, "access to homepage");

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
                "AppAlert": {
                    "name": "AppAlert",
                    "state": "is closed"
                }
            }
        }).to.eql(singlefinClient.serialize());
    })
})