import axios from "axios";
import { Makelog } from '@/glbFunctions';
//import CryptoJS  from 'crypto-js';
import md5 from 'crypto-js/md5'; // Usa CryptoJS per MD5


window.axios = axios
axios.defaults.withCredentials = false
// axios.defaults.baseURL = "http://localhost:8081/api"
let URLProd = "https://" + window.location.hostname.toString() + "/api"
let URLDev ="http://" + window.location.hostname.toString() + ":8081/api"
let URLDevStampa = "http://192.168.56.132:1234/"
let URLProdStampa = "http://localhost:1234/"


let backendUrl = process.env.NODE_ENV === 'production' ?  URLProd : URLDev 
axios.defaults.baseURL = backendUrl


const secret = 'Esagra2025-Il-tuo-gestionale-per-la-tua-sagra';
function generateNonce() {
  const array = new Uint8Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
  
axios.interceptors.response.use(
    response => {
        // Gestisci la risposta normale qui
        var errMsg = null
        if (response.data.errno != undefined    ) {
            errMsg = response.config.url + " - "+ response.data.errno + " - " + response.data.sqlMessage +" -" + response.data.sql
        }
        if (response.data.serverStatus != undefined && (response.data.serverStatus != 0 && response.data.serverStatus !=2)   ) {
            errMsg = response.data.serverStatus + " - Errore interno database"
        }
        if (errMsg != null) {  Makelog(errMsg)  }
        response.errMsg = errMsg;

        return  response;
    },
    error => {
        // Gestisci gli di rete o errori generati lato server non sql
        var errMsg = null
        errMsg = error.config.url + " + "+ error.code + " + " + error.message ;

        Makelog(errMsg) 
        return Promise.reject(error);    }
);  

// Aggiungi un interceptor per includere il codice sagra in ogni richiesta
axios.interceptors.request.use(config => {
 
    const timestamp = Date.now();
    const nonce = generateNonce();
    //const data = JSON.stringify(config.data || {});
    const payload =  timestamp + nonce + secret;
    const signature = md5(payload).toString();
  
    config.headers['x-signature'] = signature;
    config.headers['x-timestamp'] = timestamp;
    config.headers['x-nonce'] = nonce;
    //config.data = JSON.parse(data); // Mantieni i dati orig
 
    config.headers['Id-Sagra'] = sessionStorage.getItem('SagraId');

    if (  config.url == 'stampa/ordine') {
        config.baseURL = process.env.NODE_ENV === 'production' ?  URLProdStampa : URLDevStampa
    }
    return config;
  }, error => {
    return Promise.reject(error);
  }
);