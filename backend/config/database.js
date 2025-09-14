//DEV 
// host: "localhost",
// user: "root",
// password: "",
// database: "db_restaurant",
//----------------------------------
//PROD
// host: "localhost",
// user: 'qedpqgpb_OesagraAdmin',
// password: "Giulio2008.P",
// database: 'qedpqgpb_ordiniEsagra',
//----------------------------------
//===========================================
//SOLUZIONE A POOL
//===========================================

import mysql from "mysql2";
import logger from "./logger.js"; // il tuo log4js già configurato

const db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "db_restaurant",
  waitForConnections: true,
  connectionLimit: 10, // massimo 10 connessioni contemporanee
  queueLimit: 0        // 0 = nessun limite di coda
};

// Creiamo un pool di connessioni
const pool = mysql.createPool(db_config);

// Aggiungiamo un wrapper retrocompatibile che accetta callback
pool.queryWithLog = (sql, params, cb) => {
  const start = Date.now();

  // Se params non è passato
  if (typeof params === "function") {
    cb = params;
    params = [];
  }

  pool.query(sql, params, (err, results, fields) => {
    const duration = Date.now() - start;

    logger.debug(`[DB] SQL="${sql}" params=${JSON.stringify(params)} duration=${duration}ms`);

    if (err) {
      logger.error(`[DB ERROR] ${err.code} - ${err.message}`);
    }

    if (cb) return cb(err, results, fields);
  });
};

export default pool;














//===========================================
//SOLUZIONE A CONNESSIONE SINGOLA 
//===========================================
/*
import mysql from "mysql2";
import logger from "./logger.js"; // importa il logger che hai già

const db_config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "db_restaurant",
};

let db = mysql.createConnection(db_config);

db.connect(error => {
    if (error){ 
        logger.error("Error connecting to the database.", error);
        setTimeout(handleDisconnect, 2000);
    } else {
        logger.info("Success connected to the database.");
    }
});

// funzione per riconnettersi in caso di crash
function handleDisconnect() {
    db = mysql.createConnection(db_config);

    db.connect(function(err) {
        if(err) {
            logger.error("Error when reconnecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        } else {
            logger.info("Reconnected to the database.");
        }
    });

    db.on("error", function(err) {
        logger.error("DB error", err);
        if(err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    // re-wrap query dopo riconnessione
    wrapQueryWithTiming();
}

// funzione che misura il tempo delle query
function wrapQueryWithTiming() {
    const originalQuery = db.query.bind(db);

    db.query = (sql, params, callback) => {
        const start = Date.now();

        // se params è opzionale
        if (typeof params === "function") {
            callback = params;
            params = [];
        }

        return originalQuery(sql, params, (err, results, fields) => {
            const duration = Date.now() - start;
            logger.debug(`[DB] SQL="${sql}" params=${JSON.stringify(params)} duration=${duration}ms`);

            if (err) {
                logger.error(`[DB ERROR] ${err.code} - ${err.message}`);
            }

            if (callback) callback(err, results, fields);
        });
    };
}

// attiva il wrapping subito
wrapQueryWithTiming();

export default db;
*/