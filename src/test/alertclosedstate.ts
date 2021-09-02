import { State } from "../influencer/state";

export class AlertClosedState extends State {
    public handle(trend: string, model: any): void {
        if(trend === "login") {
            this.changeState("is showing wait alert");
        }
    }
    
}