"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptionTransformer = void 0;
exports.encryptionTransformer = {
    key: process.env.ENCRYPTION_KEY,
    algorithm: 'aes-256-gcm',
    ivLength: 16,
};
//# sourceMappingURL=encryption.config.js.map