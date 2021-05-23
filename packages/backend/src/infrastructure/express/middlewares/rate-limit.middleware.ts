import rateLimit from 'express-rate-limit'

export const rateLimitter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: 'You have exceeded the 100 requests in 10 minutes limit!',
  headers: false,
})
