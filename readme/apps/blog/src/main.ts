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

  const config = new DocumentBuilder()
    .setTitle(APIConfig.BlogTitle)
    .setDescription(APIConfig.BlogDesc)
    .setVersion(APIConfig.Version)
    .build();

  app.setGlobalPrefix(Prefix.Global);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Path.Spec, app, document)

  const port = process.env.API_PORT || Port.BlogAPIDefault;
  await app.listen(port);

  Logger.log(
    getAppRunningString(APIConfig.BlogTitle, port)
  );
}

 bootstrap();
