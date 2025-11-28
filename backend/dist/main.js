"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const platform_fastify_1 = require("@nestjs/platform-fastify");
const exception_filter_1 = require("./exception.filter");
const env_schema_1 = require("./env.schema");
const env_1 = __importDefault(require("@fastify/env"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    await app.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute'
    });
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    await app.register(env_1.default, {
        schema: env_schema_1.envSchema,
        dotenv: true,
        data: process.env,
    });
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map