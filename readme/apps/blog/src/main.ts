/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { BlogAPI, logAppRunning, Path, Prefix } from '@readme/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(Prefix.Global);

  app.useGlobalPipes(new ValidationPipe(
    {transform: true, validateCustomDecorators: true, transformOptions:
      {enableImplicitConversion: true, excludeExtraneousValues: true, exposeDefaultValues: true}}
  ))

  SwaggerModule.setup(Path.Spec, app, SwaggerModule.createDocument(app, BlogAPI.Config))

  await app.listen(BlogAPI.Port);

  logAppRunning(BlogAPI.Name, BlogAPI.Port)
}

bootstrap();
