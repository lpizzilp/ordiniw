import logger from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`[UNCAUGHT ERROR] ${err.stack || err}`);
  res.status(500).json({ error: "Internal Server Error" });
};