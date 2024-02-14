// lanciare con node AppertureSrp.js <parametro Tavolo> <parametro Asporto> <idSagra>
const axios = require('axios');
var unionParam = {
  type: process.argv[2] + process.argv[3],
  id: process.argv[4]
}
console.log(unionParam)
// Imposta il metodo di richiesta e l'URL
axios.put('http://localhost:8081/api/sagraComand', unionParam)
  .then(response => {
    console.log(response.data);
    console.log('eseguito')
  })
  .catch(error => {
    console.error('Errore nella richiesta:', error.message);
  });
