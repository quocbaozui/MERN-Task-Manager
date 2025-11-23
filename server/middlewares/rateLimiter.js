// 1. Sửa import: Dùng require thay vì import
const ratelimit = require("../config/upstash.js");

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

// 2. Sửa export: Dùng module.exports thay vì export default
module.exports = rateLimiter;
