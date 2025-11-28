"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const bullmq_1 = require("@nestjs/bullmq");
const app_processor_1 = require("./app.processor");
const typeorm_1 = require("@nestjs/typeorm");
const app_entity_1 = require("./app.entity");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const logging_interceptor_1 = require("./logging.interceptor");
const logging_middleware_1 = require("./logging.middleware");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const core_2 = require("@nestjs/core");
const roles_guard_1 = require("./auth/roles.guard");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logging_middleware_1.LoggingMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: 'redis',
                    port: 6379,
                },
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'tasks',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASS'),
                    database: config.get('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([app_entity_1.User]),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/app',
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                useFactory: (config) => ({
                    pinoHttp: {
                        level: config.get('NODE_ENV') !== 'production' ? 'debug' : 'info',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_processor_1.AppProcessor,
            {
                provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor
            },
            {
                provide: core_2.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map