import { Module } from '@nestjs/common';
import { AppName, getRMQModuleConfig } from '@readme/core';
import { RMQModule } from 'nestjs-rmq';

import { BffService } from './bff/bff.service';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQModuleConfig(AppName.BFF))
  ],
  controllers: [BffService],
  providers: [BffService],
})
export class AppModule {}
