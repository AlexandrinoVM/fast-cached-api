import { createClient } from "redis";
import "dotenv/config";

const Redis = createClient({
  url: process.env.REDIS_URL,
});

Redis.on("connect", () => {
  console.log("Redis connected");
});

Redis.on("error", (err: Error) => {
  console.error("Redis error:", err.message);
});

// conecta UMA VEZ
export async function connectRedis() {
  if (!Redis.isOpen) {
    await Redis.connect();
  }
}

export async function disconnectRedis() {
  if (Redis.isOpen) {
    await Redis.quit();
  }
}

export default Redis;

