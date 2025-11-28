"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
exports.envSchema = {
    type: 'object',
    required: ['ENCRYPTION_KEY'],
    properties: {
        ENCRYPTION_KEY: {
            type: 'string',
        },
    },
};
//# sourceMappingURL=env.schema.js.map