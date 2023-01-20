import { ValidateENVProp, ValidateENVPort } from "../decorator/validate-env.decorator";

export class APIEnvConfig {
  @ValidateENVPort()
  public API_PORT: number;
}

export class RMQEnvConfig {
  @ValidateENVProp()
  public RMQ_USER: string;

  @ValidateENVProp()
  public RMQ_PASS: string;

  @ValidateENVProp()
  public RMQ_HOST: string;

  @ValidateENVProp()
  public RMQ_QUEUE: string;

  @ValidateENVProp()
  public RMQ_EXCHANGE: string;
}

export class MailerEnvConfig {
  @ValidateENVPort()
  public MAILER_PORT: number;

  @ValidateENVProp()
  public MAILER_HOST: string;

  @ValidateENVProp()
  public MAILER_USER: string;

  @ValidateENVProp()
  public MAILER_PASS: string;

  @ValidateENVProp()
  public MAILER_FROM: string;
}

export class MongoEnvConfig {
  @ValidateENVProp()
  public MONGO_DB: string;

  @ValidateENVProp()
  public MONGO_HOST: string;

  @ValidateENVPort()
  public MONGO_PORT: number;

  @ValidateENVProp()
  public MONGO_USER: string;

  @ValidateENVProp()
  public MONGO_PASS: string;

  @ValidateENVProp()
  public MONGO_AUTH_BASE: string;
}

export class JWTEnvConfig {
  @ValidateENVProp()
  public JWT_SECRET: string;
}
