/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { BlogAPI, logStartup, Path, Prefix } from '@readme/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { Name, Port, Config } = BlogAPI

  app.setGlobalPrefix(Prefix.Global);

  SwaggerModule.setup(Path.Spec, app, SwaggerModule.createDocument(app, Config))

  app.useGlobalPipes(new ValidationPipe({ transform: true, validateCustomDecorators: true }))

  await app.listen(Port);

  logStartup(Name, Port)
}

bootstrap();
