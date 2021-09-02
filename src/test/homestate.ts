import { State } from "../influencer/state";

export class HomeState extends State {
    public handle(trend: string, model: any): void {
        if(model.user.id === "") {
            this.changeState("is showing login form");
        }
    }
    
}