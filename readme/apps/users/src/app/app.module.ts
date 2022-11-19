import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Path, PrivateRouteMiddleware } from '@readme/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
  exports: [UserModule, AuthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PrivateRouteMiddleware)
      .forRoutes(Path.Upload, Path.Subscribe);
  }
}
