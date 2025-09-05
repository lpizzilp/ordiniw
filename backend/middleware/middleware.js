import crypto from 'crypto';


const usedNonces = new Set();
const secret = 'Esagra2025-Il-tuo-gestionale-per-la-tua-sagra';

export function verifyHmac(req, res, next) {
  // rotte da escludere (anche le sottorotte verranno escluse)
  const excludedRoutes = [
    '/api/log',
    '/api/sagra/controlli',
    '/api/sagraComand',
    '/api/sagra/keepalive'
  ];

  const isExcluded = excludedRoutes.some(route =>
    req.path === route || req.path.startsWith(route + '/')
  );

  if (isExcluded) {
    return next(); // salta la verifica HMAC
  }


if (req.headers['x-internal-request'] === 'true') {
      console.log('Richiesta interna al server');  
      return next();
  }

  const signature = req.headers['x-signature'];
  const timestamp = req.headers['x-timestamp'];
  const nonce = req.headers['x-nonce'];

  if (!signature || !timestamp || !nonce) {
    console.log('Firma, timestamp o nonce mancanti');
    return res.sendStatus(400); // Bad Request
  }
  const payload = timestamp + nonce + secret;
 
  const expectedSignature = crypto.createHash('md5').update(payload).digest('hex');

  // console.log('data:', data);
  // console.log('timestamp:', timestamp);
  // console.log('nonce:' ,nonce);
  // console.log('signature:', signature);
  // console.log('Hash calcolato:', expectedSignature);

  if (signature !== expectedSignature) {
    console.log('Firma non valida');
    console.log('Hash calcolato:', expectedSignature);
    console.log('Firma ricevuta:', signature);
    return res.sendStatus(403); // Forbidden
  }

  const currentTime = Date.now();
  if (currentTime - parseInt(timestamp) > 5 * 60 * 1000) {
    console.log('Timestamp non valido');
    return res.sendStatus(403);
  }

  if (usedNonces.has(nonce)) {
    console.log('Nonce già utilizzato');
    return res.sendStatus(403);
  }

  usedNonces.add(nonce);
  setTimeout(() => usedNonces.delete(nonce), 5 * 60 * 1000);

  next();
}

export const disableCache = (req, res, next) => {
  // Se la richiesta è su una rotta cartItem, disabilita la cache
  if (req.path.startsWith('/api/cartItem')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  next();
}