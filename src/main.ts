import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
