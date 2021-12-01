import { State } from "../influencer/state";
import { Follower } from "../main";

export class LoginFormState extends State {
    public handle(follower: Follower, trend: string, model: any): void {
        if(model.user.id !== "") {
            follower.changeState("is showing homepage");
        }
    }
    
}