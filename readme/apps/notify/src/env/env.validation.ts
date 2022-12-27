import { ENVError, EnvValidationConfig, validateEnv } from "@readme/core";
import { IsInt, IsString } from 'class-validator';

class NotifyEnvValidation extends EnvValidationConfig {
  @IsInt({
    message: ENVError.SMTPPort
  })
  public MAIL_PORT: number;

  @IsString({
    message: ENVError.SMTPHost
  })
  public MAIL_HOST: string;

  @IsString({
    message: ENVError.SMTPUser
  })
  public MAIL_USER: string;

  @IsString({
    message: ENVError.SMTPPass
  })
  public MAIL_PASS: string;

  @IsString({
    message: ENVError.MailFrom
  })
  public MAIL_FROM: string;
}

export default validateEnv(NotifyEnvValidation)


