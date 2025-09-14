// backend/middleware/requestLogger.js
import logger from "../config/logger.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  logger.info(`[REQ] ${req.method} ${req.originalUrl} body=${JSON.stringify(req.body)}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`[RES] ${req.method} ${req.originalUrl} status=${res.statusCode} duration=${duration}ms`);
  });

  next();
};

// middleware/logger.js

const SLOW_THRESHOLD = Number(process.env.SLOW_REST_THRESHOLD || 500);

export function restLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    // const logData = {
    //   method: req.method,
    //   url: req.originalUrl,
    //   status: res.statusCode,
    //   duration: `${duration}ms`
    // };

    // se lenta → sempre errore
    if (duration > SLOW_THRESHOLD) {
      logger.performance(`${req.method} ${req.originalUrl} - ${duration}ms (slow)`);
      return;
    }

    // se non lenta → log solo se DEBUG_REST attivo
    if (process.env.DEBUG_REST === "true") {
      logger.performance(`${req.method} ${req.originalUrl} - ${duration}ms`);
    }
  });

  next();
}