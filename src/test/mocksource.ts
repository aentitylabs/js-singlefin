import { Source } from "js-entity-store";

export class MockSource extends Source {
    private _loadedEntities: any[] = [];
    private _updatedEntities: any[] = [];
    private _deletedEntities: any[] = [];
    private _updatedEntity: any = null;


    public load(entity: any, onLoad: any): void {
        /*const loadedEntity = this._loadedEntities.shift();

        if(!loadedEntity) {
            return onLoad(entity);
        }*/

        onLoad(entity);
    }

    public update(entity: any, onUpdate: any): void {
        //this._updatedEntities.push(entity);

        //TODO: eliminare l'if e settare sempre nel test...
        /*if(!this._updatedEntity) {
            return onUpdate(entity);
        }*/

        onUpdate(entity);
    }

    public delete(entity: any, onDelete: any): void {
        this.deletedEntities.push(entity);

        onDelete();
    }

    public set loadedEntities(loadedEntities: any[]) {
        this._loadedEntities = loadedEntities;
    }

    public get updateEntities() {
        return this._updatedEntities;
    }

    public get deletedEntities() {
        return this._deletedEntities;
    }

    public set updatedEntity(entity: any) {
        this._updatedEntity = entity;
    }
}
