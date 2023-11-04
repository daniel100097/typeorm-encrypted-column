import { ColumnOptions } from 'typeorm';
export interface EncryptedColumnOptions extends ColumnOptions {
    encrypt: EncryptionOptions;
}
export interface EncryptionOptions {
    key: string;
    algorithm: string;
    ivLength: number;
    looseMatching?: boolean;
}
export declare const EncryptedColumn: (options: EncryptedColumnOptions) => Function;
