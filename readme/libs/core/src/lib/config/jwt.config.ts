import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { AppName } from '../enum/utils.enum';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs(AppName.JWT, () => ({
  secret: process.env.JWT_SECRET,
}));

export const getJWTConfig = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>(`${AppName.JWT}.secret`),
    signOptions: { expiresIn: '7000000s', algorithm: 'HS256' }
  })
}
)
