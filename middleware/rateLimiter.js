import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limita a 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
