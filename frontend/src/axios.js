import axios from "axios";
import { Makelog } from '@/glbFunctions';


window.axios = axios
axios.defaults.withCredentials = false
// axios.defaults.baseURL = "http://localhost:8081/api"
let URLProd = "https://" + window.location.hostname.toString() + "/api"
let URLDev ="http://" + window.location.hostname.toString() + ":8081/api"
let URLDevStampa = "http://192.168.32.128:1234/"
let URLProdStampa = "http://localhost:1234/"


let backendUrl = process.env.NODE_ENV === 'production' ?  URLProd : URLDev 
axios.defaults.baseURL = backendUrl



axios.interceptors.response.use(
    response => {
        console.log(response)
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
    config.headers['Id-Sagra'] = sessionStorage.getItem('SagraId');
    if (  config.url.slice(0,14) == 'stampa/ordine/') {
        config.baseURL = process.env.NODE_ENV === 'production' ?  URLProdStampa : URLDevStampa
    }
    return config;
  }, error => {
    return Promise.reject(error);
  }
);