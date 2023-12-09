import axios from "axios";

window.axios = axios
axios.defaults.withCredentials = false
let backendUrl;
// axios.defaults.baseURL = "http://localhost:8081/api"
if (  process.env.NODE_ENV === 'production' ) { 
     backendUrl = "http://" + window.location.hostname.toString() + "/api"
}else {

    backendUrl = "http://" + window.location.hostname.toString() + ":8081/api"

}


axios.defaults.baseURL = backendUrl
