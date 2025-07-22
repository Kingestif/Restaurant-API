import { createClient } from "redis";

export const client = createClient().on("error", (err) => {
  console.log("Redis Client Error", err);
});

export async function connectRedis() {
  await client.connect();
}