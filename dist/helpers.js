"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
exports.validateKey = (keyToTest, algorithm) => {
    let string = 'validate';
    try {
        const buffer = Buffer.from(string, "utf8");
        const iv = crypto_1.randomBytes(16);
        const key = Buffer.from(keyToTest, 'hex');
        const cipher = crypto_1.createCipheriv(algorithm, key, iv);
        const start = cipher.update(buffer);
        const end = cipher.final();
        Buffer.concat([iv, start, end]).toString('base64');
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.createKey = (length, algorithm) => {
    let key = crypto_1.randomBytes(length);
    if (exports.validateKey(key.toString('hex'), algorithm)) {
        return key.toString('hex');
    }
    else {
        return false;
    }
};
//# sourceMappingURL=helpers.js.map