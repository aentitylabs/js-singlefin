import { Source } from "js-entity-store";

export class SinglefinSource extends Source {
    public load(entity: any, onLoad: any) {
        onLoad(entity);
    }
    public update(entity: any, onUpdate: any) {
        onUpdate(entity);
    }
    public delete(entity: any, onDelete: any): void {
        onDelete();
    }
    
}