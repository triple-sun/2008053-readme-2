import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { AppName } from '../enum/app-name';

export const jwtConfig = registerAs(AppName.JWT, () => ({
  secret: process.env.JWT_SECRET,
}));

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get<string>(`${AppName.JWT}.secret`),
    signOptions: { expiresIn: '6000s', algorithm: 'HS256' }
  }
}

export const jwtModuleConfig = {
  imports: [ConfigModule],
  useFactory: getJwtConfig,
  inject: [ConfigService]
}
