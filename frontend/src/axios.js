import axios from "axios";
import { Makelog } from '@/glbFunctions';


window.axios = axios
axios.defaults.withCredentials = false
// axios.defaults.baseURL = "http://localhost:8081/api"
let URLProd = "https://" + window.location.hostname.toString() + "/api"
let URLDev ="http://" + window.location.hostname.toString() + ":8081/api"

let backendUrl = process.env.NODE_ENV === 'production' ?  URLProd : URLDev 
axios.defaults.baseURL = backendUrl



axios.interceptors.response.use(
    response => {
        // Gestisci la risposta normale qui
        var errMsg = null
        // console.log(response)
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