//public function 

import axios from "axios";

export async function  Makelog(err,errType) {
  let data = {
      mode: (errType!= null ) ? errType :'err' ,
      arg: err
  }
  
  const uninterceptedAxiosCall =  axios.create();
  await  uninterceptedAxiosCall.post('/log', data)
  
}

// export function  sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
//          (async () => {sleep(5000)  })();
//const response = (async () => { await axios.post(callURL, Details);})();

export function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {
    //non fare nulla
  }
}

export function showErrore(){
  console.log("alert")
  alert("Opss..Qualcosa è andato storto! Per favore Riprova.")
}