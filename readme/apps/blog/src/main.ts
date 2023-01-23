/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { BlogAPI, getRabbitMqConfig, logAppRunning, Path, Prefix } from '@readme/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();

  app.setGlobalPrefix(Prefix.Global);
  app.useGlobalPipes( new ValidationPipe({
    transform: true, validateCustomDecorators: true, skipMissingProperties: true,
    transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true }
  }))

  const document = SwaggerModule.createDocument(app, BlogAPI.Config)
  SwaggerModule.setup(Path.Spec, app, document)

  await app.listen(BlogAPI.Port);

  logAppRunning(BlogAPI.Name, BlogAPI.Port)
}

bootstrap();
