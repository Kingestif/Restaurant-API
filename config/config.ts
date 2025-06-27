import {z} from 'zod';
import dotenv from 'dotenv';

dotenv.config();
const configSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().url("MONGO_URI must be a valid URL").min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRE: z.coerce.number().min(1, "JWT_EXPIRE time is reqruired"),
  NODE_ENV: z.string().min(1, "NODE_ENV is required")
});

const result = configSchema.safeParse(process.env);
if (!result.success) {
  console.error("Invalid environment configuration:", result.error.format());
  process.exit(1);
}

export const config = result.data;