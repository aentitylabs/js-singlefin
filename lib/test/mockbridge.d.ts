import { Bridge } from "js-entity-store";
export declare class MockBridge extends Bridge {
    private _onReceived;
    private _receivedActions;
    private _entitiesToReply;
    send(actions: any, onReply: any): any;
    reply(entities: any): void;
    onReceived(onReceived: any): void;
    get receivedActions(): any;
}
