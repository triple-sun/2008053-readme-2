/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { logAppRunning, NotifyAPI, Path, Prefix } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(Prefix.Global);

  SwaggerModule.setup(Path.Spec, app, SwaggerModule.createDocument(app, NotifyAPI.Config))

  app.useGlobalPipes(new ValidationPipe({ transform: true, validateCustomDecorators: true }))

  await app.listen(NotifyAPI.Port);

  logAppRunning(NotifyAPI.Name, NotifyAPI.Port)
}

bootstrap();
