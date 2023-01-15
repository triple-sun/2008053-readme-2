/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APIConfig, getAppRunningString, Path, Port, Prefix } from '@readme/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = Prefix.Global;
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle(APIConfig.UsersTitle)
    .setDescription(APIConfig.UsersDesc)
    .setVersion(APIConfig.Version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Path.Spec, app, document)

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || Port.UsersAPIDefault;
  await app.listen(port);

  Logger.log(
    getAppRunningString(APIConfig.UsersTitle, port)
  );
}

bootstrap();
