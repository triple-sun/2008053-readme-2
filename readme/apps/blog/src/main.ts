/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

 import { Logger } from '@nestjs/common';
 import { NestFactory } from '@nestjs/core';
 import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
 import { Desc, Info, Path, Prefix, Title, Version } from '@readme/core';
 import { AppModule } from './app/app.module';

 async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const globalPrefix = Prefix.API;

   const config = new DocumentBuilder()
     .setTitle(Title.Blog)
     .setDescription(Desc.Blog)
     .setVersion(Version.Blog)
     .build();

   app.setGlobalPrefix(globalPrefix);

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup(Path.SpecBlog, app, document)

   const port = process.env.PORT || 3334;
   await app.listen(port);

   Logger.log(
     `${Info.AppRun}${port}/${globalPrefix}`
   );
 }

 bootstrap();
