import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyRateLimit from '@fastify/rate-limit';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './exception.filter';

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
  
  await app.register(fastifyRateLimit, {
    max: 100,               // limit each IP to 100 requests
    timeWindow: '1 minute' // per minute
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0'); // why does adding '0.0.0.0' make fastify work??
}
bootstrap();
