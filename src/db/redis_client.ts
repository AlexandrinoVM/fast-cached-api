import { createClient } from "redis";
import "dotenv/config";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err: Error) => {
  console.error("Redis error:", err.message);
});

// conecta UMA VEZ
export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export async function disconnectRedis() {
  if (redis.isOpen) {
    await redis.quit();
  }
}

export default redis;

