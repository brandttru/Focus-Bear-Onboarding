import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from '@fastify/rate-limit';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // removes unwanted fields
      forbidNonWhitelisted: true, // throws error if extra fields sent
      transform: true,            // auto-convert types (string → number)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.register(rateLimit, {
    max: 100,               // limit each IP to 100 requests
    timeWindow: '1 minute', // per minute
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
