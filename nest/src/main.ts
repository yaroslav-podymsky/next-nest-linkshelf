import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 3004;
  const cors = config.get<string>('CORS_ORIGIN');
  app.enableCors({
    origin: cors,
  });
  await app.listen(port);
}
bootstrap();
