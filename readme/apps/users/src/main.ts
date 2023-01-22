/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { logAppRunning, Path, Prefix, UserDTO, UserRDO, UsersAPI } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(Prefix.Global);

  const document = SwaggerModule.createDocument(app, UsersAPI.Config, {extraModels: [UserDTO, UserRDO]})
  SwaggerModule.setup(Path.Spec, app, document)

  app.useGlobalPipes( new ValidationPipe({
    transform: true, validateCustomDecorators: true, skipMissingProperties: true,
    transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true }
  }))

  await app.listen(UsersAPI.Port);

  logAppRunning(UsersAPI.Name, UsersAPI.Port)
}

bootstrap();
