import { createClient } from "redis";
import { config } from './config/config';

// used redis://redis:6379 instead of redis://127.0.0.1:6379 b/c docker service
export const client = createClient({url:config.REDIS_URL}).on("error", (err) => {
  console.log("Redis Client Error", err);
});

export async function connectRedis() {
  await client.connect();
  console.log("Redis connected");
}