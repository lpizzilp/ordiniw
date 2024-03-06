// lanciare con node AppertureSrp.js <idSagra> <parametro Tavolo> <parametro Asporto> 
const axios = require('axios');
var unionParam = {
  type: process.argv[3] + process.argv[4],
  id: process.argv[2]
}

if ((unionParam.id === undefined) || (unionParam.id ===  "?")) {
  console.log ("Lanciare con node ApertureSrp.js <idSagra> <parametro Tavolo>  <parametro Asporto> (es: 001 1 1 ")
  process.exit(1);

}
axios.get('http://localhost:8081/api/sagra/controlli/' + unionParam.id)
  .then(response => {

    if (response.data[0].StrOrdini.substring(0, 1) == 1) {
      
      unionParam.type = response.data[0].StrOrdini.substring(0, 1) + unionParam.type + response.data[0].StrOrdini.substring(3, 4)
      axios.put('http://localhost:8081/api/sagraComand', unionParam)
        .catch(error => {
          console.error('Errore nella richiesta:', error.message);
        });

    }

  })
  .catch(error => {
    console.error('Errore nella richiesta:', error.message);
  });

