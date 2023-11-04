import { ObjectLiteral } from 'typeorm';
export declare const encrypt: <T extends ObjectLiteral>(entity: T, includeProperties?: string[]) => T;
export declare const decrypt: <T extends ObjectLiteral>(entity: T, includeProperties?: string[]) => T;
