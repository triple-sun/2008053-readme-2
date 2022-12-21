import { registerAs } from "@nestjs/config";
import { EnvRegisterAs } from "@readme/core";

export default registerAs(EnvRegisterAs.Blog, () => ({
  APIPort: process.env.API_PORT,
  UploadDir: process.env.API_PORT,
}));
