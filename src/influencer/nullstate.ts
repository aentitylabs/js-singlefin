import { Follower } from "./follower";
import { State } from "./state";

export class NullState extends State {
    public handle(follower: Follower, trend: string, model: any): void {
        
    }
}