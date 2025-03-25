import crypto from 'crypto';

const usedNonces = new Set();
const secret = 'Esagra2025-Il-tuo-gestionale-per-la-tua-sagra';

export function verifyHmac(req, res, next) {
  //rotte da escludere 
  const excludedRoutes = [
    '/api/log', 
    '/api/sagra/keepalive'
  ];

  //solo per localHost
  const includedLocalRoutes =  [
    '/api/foods' 
  ];
  
  // Verifica se la richiesta proviene dal server stesso
  const isInternalRequest = req.hostname === 'localhost' || req.hostname === '127.0.0.1';  

  if (excludedRoutes.includes(req.path)) {
    return next();
  }
  if  (isInternalRequest && req.path != '/api/foods' )  {
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

