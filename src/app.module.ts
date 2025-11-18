import { Module, MiddlewareConsumer, NestModule  } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { AppProcessor } from './app.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'tasks',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',       
      port: 5432,
      username: 'myuser',    
      password: 'mypassword',    
      database: 'mydatabase',    
      autoLoadEntities: true,
      synchronize: true,       // ONLY for first run
    }),
    TypeOrmModule.forFeature([User]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/app',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor, {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor},],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // all routes
  }
}
