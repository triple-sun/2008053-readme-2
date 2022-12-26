import { registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "@readme/core";

export default registerAs(EnvRegisterAs.Notify, () => ({
  APIPort: process.env.API_PORT,
  port: parseInt(process.env.MAIL_PORT, 10),
  host: process.env.MAIL_HOST,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  from: process.env.MAIL_FROM,
}));
