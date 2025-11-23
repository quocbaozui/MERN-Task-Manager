import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(req.ip);
    if (!success) {
      // 429 means Too many request
      return res
        .status(429)
        .json({ message: "Too many request, please try later" });
    }

    next();
  } catch (error) {
    console.log("rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
