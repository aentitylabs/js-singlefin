import { State } from "../influencer/state";

export class AlertWaitState extends State {
    public handle(trend: string, model: any): void {
        if(trend === "access to homepage") {
            this.changeState("is closed");
        }
    }
    
}