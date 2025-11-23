const { Redis } = require("@upstash/redis");
const { Ratelimit } = require("@upstash/ratelimit");

const dotenv = require("dotenv");

dotenv.config();

// create a rateLimiter that allows 100 requests per 60s
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

module.exports = ratelimit;
