import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { notifyConfigModuleConfig } from '../config/config.module.config';

@Module({
  imports: [
    ConfigModule.forRoot(notifyConfigModuleConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
