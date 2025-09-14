import logger from "../config/logger.js";


export const Infolog = (req, res) => {
    const data = req.body;
    switch (data.mode) {
        case 'debug':
            logger.debug(data.arg)
            break;

        case 'info':
            logger.info(data.arg)
            break;

        case 'warn':
            logger.warn(data.arg)
            break;

        case 'err':
            logger.error(data.arg)
            break;
    }
    res.json('ok');
};