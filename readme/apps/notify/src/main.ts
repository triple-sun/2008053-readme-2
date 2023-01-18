/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { APIConfig, getAppRunningString, Path, Prefix, APIPort, SwaggerConfig } from '@readme/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(Prefix.Global);

  await app.startAllMicroservices();
  SwaggerModule.setup(Path.Spec, app, SwaggerModule.createDocument(app, SwaggerConfig.Notify))


  await app.listen(APIPort.Notify);

  Logger.log(
    getAppRunningString(APIConfig.NotifyTitle, APIPort.Notify)
  );
}

bootstrap();
