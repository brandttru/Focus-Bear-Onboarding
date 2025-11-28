import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyRateLimit from '@fastify/rate-limit';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './exception.filter';
import { envSchema } from './env.schema';
import fastifyEnv from '@fastify/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unwanted fields
      forbidNonWhitelisted: true, // throws error if extra fields sent
      transform: true, // auto-convert types (string → number)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.register(fastifyRateLimit, {
    max: 100, // limit each IP to 100 requests
    timeWindow: '1 minute', // per minute
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true, // loads .env file
    data: process.env, // assigns validated vars to process.env
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0'); // why does adding '0.0.0.0' make fastify work??
}
bootstrap();
