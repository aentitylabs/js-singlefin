import { Source } from "../../js-entity-store/src/source";

export class SinglefinSource extends Source {
    public load(entity: any) {
        return entity;
    }
    public update(entity: any) {
        return entity;
    }
    public delete(entity: any): void {
    }
    
}