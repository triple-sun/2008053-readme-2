import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvRegisterAs } from '../enum/env.enum';

export const jwtOptions = registerAs(EnvRegisterAs.JWT, () => ({
  secret: process.env.JWT_SECRET,
}));

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get<string>(`${EnvRegisterAs.JWT}.secret`),
    signOptions: { expiresIn: '60s', algorithm: 'HS256' }
  }
}
