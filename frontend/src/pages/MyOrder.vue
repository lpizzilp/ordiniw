<template>
    <div>
        <div v-if="showContent" class="loader-container">
            <div class="loader"></div>
        </div>
    </div>
    <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
</template>


<script>

// Ottieni la query string dall'URL
var queryString = window.location.search;
queryString = queryString.substring(1);

// Dividi la stringa in un array di coppie nome=valore
var parametri = queryString.split("&");

// Crea un oggetto per memorizzare i parametri
var parametriObj = {};
for (var i = 0; i < parametri.length; i++) {
    var coppia = parametri[i].split("=");
    parametriObj[coppia[0]] = coppia[1];
}

import axios from 'axios';
import QuickViewErrore from '@/components/QuickViewErrore.vue';
export default {
    name: 'MyOrder',

    data() {
        return {
            showContent: true,
            Quickerrore: false
        }
    },

    created() {
        this.getBillItem()
    },


    methods: {
        async getBillItem() {
            sessionStorage.setItem('MatchUser', parametriObj.match)
            sessionStorage.setItem('Username', parametriObj.user)
            sessionStorage.setItem('TipoOrdine', parametriObj.type)
            sessionStorage.setItem('Bill', parametriObj.id)
            if (parametriObj.filtroOrd == 'PRE') {
                sessionStorage.setItem('filtro', parametriObj.filtroOrd)
                let bookitem = await axios.get('/prenotazione/' + parametriObj.id)
                let response = bookitem.request.response
                if (response.includes("{\"code\"")) {
                    this.Quickerrore = true
                    this.Makelog(response)
                }
                for (let i = 0; i < bookitem.data.length; i++) {
                    let data = {
                        user_id: parseInt(sessionStorage.getItem('Username')),
                        food_id: bookitem.data[i].food_id,
                        item_qty: parseInt(bookitem.data[i].item_qty)
                    }
                    await axios.post("/cartItem", data);
                }
            } else {
                sessionStorage.setItem('filtro', "")
                let billitem = await axios.get('/billdetails/' + parametriObj.id)
                let response = billitem.request.response
                if (response.includes("{\"code\"")) {
                    this.Quickerrore = true
                }
                for (let i = 0; i < billitem.data.length; i++) {
                    let data = {
                        user_id: parseInt(sessionStorage.getItem('Username')),
                        food_id: billitem.data[i].food_id,
                        item_qty: parseInt(billitem.data[i].item_qty)
                    }
                    await axios.post("/cartItem", data);
                }
            }

            this.$router.push("/menu")
        },

        async Makelog(err) {
            let data = {
                mode: 'err',
                arg: err
            }
            await axios.post('/log', data)
        },
    },

    components: { QuickViewErrore }
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