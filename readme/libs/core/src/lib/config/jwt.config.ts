import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { Token } from '../enum/token.enum';

export const jwtConfig = registerAs(Token.JWT, () => ({
  secret: process.env.JWT_SECRET,
}));

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get<string>(`${Token.JWT}.secret`),
    signOptions: { expiresIn: '6000s', algorithm: 'HS256' }
  }
}

export const jwtModuleConfig = {
  imports: [ConfigModule],
  useFactory: getJwtConfig,
  inject: [ConfigService]
}
