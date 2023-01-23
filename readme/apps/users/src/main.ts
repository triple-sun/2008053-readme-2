/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { getRabbitMqConfig, logAppRunning, Path, Prefix, UserDTO, UserRDO, UsersAPI } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const document = SwaggerModule.createDocument(app, UsersAPI.Config, {extraModels: [UserDTO, UserRDO]})

  SwaggerModule.setup(Path.Spec, app, document)

  app.setGlobalPrefix(Prefix.Global);
  app.connectMicroservice(getRabbitMqConfig(configService));
  app.useGlobalPipes( new ValidationPipe({
    transform: true, validateCustomDecorators: true, skipMissingProperties: true,
    transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true }
  }))

  await app.startAllMicroservices();
  await app.listen(UsersAPI.Port);

  logAppRunning(UsersAPI.Name, UsersAPI.Port)
}

bootstrap();
