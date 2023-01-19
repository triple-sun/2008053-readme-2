import { IsNumber, IsString, Max, Min } from "class-validator";
import { Size } from "../const/api-options.const";
import { Property } from "../enum/property.enum";
import { ENVError } from "../error/env.error.enum";

const { Port } = Property

export class APIEnvConfig {
  @IsNumber({}, {
    message: ENVError.APIPort
  })
  @Min(Size.Min(Port))
  @Max(Size.Max(Port))
  public API_PORT: number;
}

export class RMQEnvConfig {
  @IsString({
    message: ENVError.RMQUser
  })
  public RMQ_USER: string;

  @IsString({
    message: ENVError.RMQPass
  })
  public RMQ_PASS: string;

  @IsString({
    message: ENVError.RMQHost
  })
  public RMQ_HOST: string;

  @IsString({
    message: ENVError.RMQSubscriberQueue
  })
  public RMQ_QUEUE: string;

    @IsString({
    message: ENVError.RMQSubscriberQueue
  })
  public RMQ_EXCHANGE: string;
}

export class MailerEnvConfig {
  @IsNumber({}, {
    message: ENVError.SMTPPort
  })
  @Min(Size.Min(Port))
  @Max(Size.Max(Port))
  public MAILER_PORT: number;

  @IsString({
    message: ENVError.SMTPHost
  })
  public MAILER_HOST: string;

  @IsString({
    message: ENVError.SMTPUser
  })
  public MAILER_USER: string;

  @IsString({
    message: ENVError.SMTPPass
  })
  public MAILER_PASS: string;

  @IsString({
    message: ENVError.MailFrom
  })
  public MAILER_FROM: string;
}

export class MongoEnvConfig {
  @IsString({
    message: ENVError.DBName
  })
  public MONGO_DB: string;

  @IsString({
    message: ENVError.DBHost
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: ENVError.DBPort
  })
  @Min(Size.Min(Port))
  @Max(Size.Max(Port))
  public MONGO_PORT: number;

  @IsString({
    message: ENVError.DBUser
  })
  public MONGO_USER: string;

  @IsString({
    message: ENVError.DBPass
  })
  public MONGO_PASS: string;

  @IsString({
    message: ENVError.DBAuthBase
  })
  public MONGO_AUTH_BASE: string;
}

export class JWTEnvConfig {
  @IsString({
    message: ENVError.JwtSecret
  })
  public JWT_SECRET: string;
}
