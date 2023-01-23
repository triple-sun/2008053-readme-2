/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { BffAPI, getRabbitMqConfig, logAppRunning, Path, Prefix } from '@readme/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, BffAPI.Config)
  const configService = app.get<ConfigService>(ConfigService);

  SwaggerModule.setup(Path.Spec, app, document)

  app.setGlobalPrefix(Prefix.Global);
  app.connectMicroservice(getRabbitMqConfig(configService));
  app.useGlobalPipes( new ValidationPipe({
    transform: true, validateCustomDecorators: true, skipMissingProperties: true,
    transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true }
  }))

  await app.startAllMicroservices();
  await app.listen(BffAPI.Port);

  logAppRunning(BffAPI.Name, BffAPI.Port)
}

bootstrap();
