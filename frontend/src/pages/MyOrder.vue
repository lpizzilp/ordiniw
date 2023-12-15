<template>
    <div>
        <div v-if="showContent" class="loader-container">
            <div class="loader"></div>
        </div>
    </div>
</template>


<script>

// Ottieni la query string dall'URL
var queryString = window.location.search;

// Rimuovi il "?" iniziale
queryString = queryString.substring(1);

// Dividi la stringa in un array di coppie nome=valore
var parametri = queryString.split("&");

// Crea un oggetto per memorizzare i parametri
var parametriObj = {};
for (var i = 0; i < parametri.length; i++) {
    var coppia = parametri[i].split("=");
    parametriObj[coppia[0]] = coppia[1];
}

// Ora puoi accedere ai valori dei parametri
console.log(parametriObj.parametro1);
console.log(parametriObj.parametro2);

import axios from 'axios';
export default {
    name: 'MyOrder',

    data() {
        return {
            showContent: true,
        }
    },

    created() {
        this.getBillItem();
    },


    methods: {
        async getBillItem() {
            sessionStorage.setItem('MatchUser', parametriObj.parametro1)
            sessionStorage.setItem('Username', parametriObj.parametro2)
            let billdata = await axios.get('/cartItem/' + sessionStorage.getItem('Username'))
            for (let i = 0; i < billdata.length; i++) {
                let data = {
                    user_id: parseInt(sessionStorage.getItem('Username')),
                    food_id: parseInt(billdata.data.food_id),
                    item_qty: parseInt(this.qty[i])
                }

                await axios.put("/cartItem/", data);
            }
        },
    }
}
</script>

<style scoped>
.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    height: 75vh;
}

.loader {
    border: 8px solid #fff;
    border-top: 8px solid #27ae60;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>