/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { APIConfig, getAppRunningString, APIPort, Path, Prefix, SwaggerConfig } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(Path.Spec, app, SwaggerModule.createDocument(app, SwaggerConfig.Blog))

  app.setGlobalPrefix(Prefix.Global);
  app.useGlobalPipes(new ValidationPipe({ transform: true, validateCustomDecorators: true }))

  await app.listen(APIPort.Blog);

  Logger.log(
    getAppRunningString(APIConfig.BlogTitle, APIPort.Blog)
  );
}

bootstrap();
