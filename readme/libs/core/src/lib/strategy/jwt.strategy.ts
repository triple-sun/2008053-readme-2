import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppName } from '../enum/utils.enum';
import { IUser } from '@readme/shared-types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(`${AppName.JWT}.secret`),
    });
  }

  async validate({email, _id, name}:  Pick<IUser, '_id' | 'email' | 'name'>) {
    return { email, _id, name};
  }
}
