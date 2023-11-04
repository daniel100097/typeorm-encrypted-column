'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const crypto_1 = require('crypto');

function isGetter(obj, prop) {
    return !!Object.getOwnPropertyDescriptor(obj, prop)?.['get'];
}

function isSetter(obj, prop) {
    return !!Object.getOwnPropertyDescriptor(obj, prop)?.['set'];
}

const forMatchingColumns = (entity, cb, includeProperties = []) => {
    let validColumns = typeorm_1
        .getMetadataArgsStorage()
        .columns.filter(({ options, mode, target, propertyName }) => {
            const { encrypt } = options;

            if (!encrypt){
                return false;
            }
            if (isGetter(entity, propertyName)) {
                return false;
            }

            if (typeof entity[propertyName] === 'function') {
                return false;
            }

            return (
                entity[propertyName] &&
                mode === 'regular' &&
                encrypt &&
                (encrypt.looseMatching || entity.constructor === target)
            );
        })
        .filter((item, pos, self) => self.findIndex((v) => v.propertyName === item.propertyName) === pos);
    if (includeProperties.length > 0) {
        validColumns = validColumns.filter(({ propertyName }) => includeProperties.includes(propertyName));
    }
    validColumns.forEach(({ propertyName, options }) => {
        const { encrypt } = options;
        cb(propertyName, encrypt);
    });
};
exports.encrypt = (entity, includeProperties = []) => {
    if (!entity) return entity;
    forMatchingColumns(
        entity,
        (propertyName, options) => {
            entity[propertyName] = encryptString(entity[propertyName], options);
        },
        includeProperties,
    );
    return entity;
};
const encryptString = (string, options) => {
    const buffer = Buffer.from(string, 'utf8');
    const iv = crypto_1.randomBytes(options.ivLength);
    const key = Buffer.from(options.key, 'hex');
    const cipher = crypto_1.createCipheriv(options.algorithm, key, iv);
    const start = cipher.update(buffer);
    const end = cipher.final();
    return Buffer.concat([iv, start, end]).toString('base64');
};
exports.decrypt = (entity, includeProperties = []) => {
    if (!entity) return entity;
    forMatchingColumns(
        entity,
        (propertyName, options) => {
            entity[propertyName] = decryptString(entity[propertyName], options);
        },
        includeProperties,
    );
    return entity;
};
const decryptString = (string, options) => {
    const buffer = Buffer.from(string, 'base64');
    const iv = buffer.slice(0, options.ivLength);
    const key = Buffer.from(options.key, 'hex');
    const decipher = crypto_1.createDecipheriv(options.algorithm, key, iv);
    const start = decipher.update(buffer.slice(options.ivLength));
    const end = decipher.final();
    return Buffer.concat([start, end]).toString('utf8');
};
//# sourceMappingURL=events.js.map
