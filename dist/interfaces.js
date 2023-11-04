"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const helpers_1 = require("./helpers");
const crypto_1 = require("crypto");
exports.EncryptedColumn = (options) => {
    if (crypto_1.getCiphers().indexOf(options.encrypt.algorithm) < 0) {
        throw "Invalid Algorithm";
    }
    if (!helpers_1.validateKey(options.encrypt.key, options.encrypt.algorithm)) {
        throw "Invalid Key";
    }
    if (!options.type) {
        options.type = 'varchar';
        options.nullable = false;
    }
    return typeorm_1.Column(options);
};
//# sourceMappingURL=interfaces.js.map