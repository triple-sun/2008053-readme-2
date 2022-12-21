import { registerAs } from "@nestjs/config";

export default registerAs('notify', () => ({
  APIPort: process.env.API_PORT,
}));
