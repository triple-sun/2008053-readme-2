import { IsInt, IsNumber, IsString, Max, Min } from "class-validator";
import { ENVError } from "../enum/env.enum";
import { Port } from "../enum/utils.enum";

export class APIEnvConfig {
  @IsInt({
    message: ENVError.APIPort
  })
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
}

export class MailerEnvConfig {
  @IsInt({
    message: ENVError.SMTPPort
  })
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
  @Min(Port.Min)
  @Max(Port.Max)
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
