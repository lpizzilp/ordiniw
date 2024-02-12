import axios from "axios";

window.axios = axios
axios.defaults.withCredentials = false
// axios.defaults.baseURL = "http://localhost:8081/api"
let URLProd = "https://" + window.location.hostname.toString() + "/api"
let URLDev ="http://" + window.location.hostname.toString() + ":8081/api"

let backendUrl = process.env.NODE_ENV === 'production' ?  URLProd : URLDev 
axios.defaults.baseURL = backendUrl
