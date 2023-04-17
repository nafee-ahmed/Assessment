import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // whitelist so that extra params cannot be passed to body
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors()
  await app.listen(3001);
}
bootstrap();
