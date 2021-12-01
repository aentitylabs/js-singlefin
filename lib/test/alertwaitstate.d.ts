import { State } from "../influencer/state";
import { Follower } from "../main";
export declare class AlertWaitState extends State {
    handle(follower: Follower, trend: string, model: any): void;
}
