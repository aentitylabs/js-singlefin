import { Source } from "js-entity-store";
export declare class SinglefinSource extends Source {
    load(entity: any, onLoad: any): void;
    update(entity: any, onUpdate: any): void;
    delete(entity: any, onDelete: any): void;
}
