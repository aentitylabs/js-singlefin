import { Follower } from "./follower";
import { State } from "./state";
export declare class NullState extends State {
    handle(follower: Follower, trend: string, model: any): void;
}
