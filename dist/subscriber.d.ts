import { EntitySubscriberInterface, InsertEvent, ObjectLiteral, UpdateEvent } from 'typeorm';
export declare class Subscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<ObjectLiteral>): void;
    afterInsert(event: InsertEvent<ObjectLiteral>): Promise<any> | void;
    beforeUpdate(event: UpdateEvent<ObjectLiteral>): void;
    afterUpdate(event: UpdateEvent<ObjectLiteral>): void;
    afterLoad(entity: ObjectLiteral): void;
}
