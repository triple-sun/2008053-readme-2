import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './user-memory.repository';

@Module({
  providers: [UserMemoryRepository],
  exports: [UserMemoryRepository],
  controllers: [],
})
export class UserModule {}
