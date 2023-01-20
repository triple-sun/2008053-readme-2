/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { APIConfig, AppName, logStartup, Path, Prefix, SwaggerConfig } from '@readme/core';
import { AppModule } from './app/app.module';

const { Users } = AppName

 const {Port} = APIConfig[Users]

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(Prefix.Global);

  SwaggerModule.setup(Path.Spec, app, SwaggerModule.createDocument(app, SwaggerConfig.Users))

  app.useGlobalPipes(new ValidationPipe({ transform: true, validateCustomDecorators: true }))

  await app.listen(Port);

  logStartup(Users, Port)
}

bootstrap();
