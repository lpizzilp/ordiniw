// lanciare con node AppertureSrp.js <parametro Tavolo> <parametro Asporto> <idSagra>
const axios = require('axios');
var unionParam = {
  type: process.argv[2] + process.argv[3],
  id: process.argv[4]
}

axios.get('http://localhost:8081/api/sagra/controlli/' + unionParam.id)
  .then(response => {

    if (response.data[0].StrOrdini.substring(0, 1) == 1) {
      
      unionParam.type = response.data[0].StrOrdini.substring(0, 1) + unionParam.type
      axios.put('http://localhost:8081/api/sagraComand', unionParam)
        .catch(error => {
          console.error('Errore nella richiesta:', error.message);
        });

    }

  })
  .catch(error => {
    console.error('Errore nella richiesta:', error.message);
  });

