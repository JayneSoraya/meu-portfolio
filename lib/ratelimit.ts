import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// cliente Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// limite: 3 requisições por janela de 1 hora por IP
export const forgotPasswordRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "@upstash/ratelimit/forgot-password",
});