/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { getRabbitMqConfig, logAppRunning, NotifyAPI, Path, Prefix } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(Prefix.Global);
  app.connectMicroservice(getRabbitMqConfig(configService));
  app.useGlobalPipes( new ValidationPipe({
    transform: true, validateCustomDecorators: true, skipMissingProperties: true,
    transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true }
  }))

  const document = SwaggerModule.createDocument(app, NotifyAPI.Config)
  SwaggerModule.setup(Path.Spec, app, document)

  await app.startAllMicroservices();
  await app.listen(NotifyAPI.Port)

  logAppRunning(NotifyAPI.Name, NotifyAPI.Port)
}

bootstrap();
