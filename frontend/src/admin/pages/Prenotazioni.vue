<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-book-open"> Prenotazioni</i></h1>
            <button class="btn" @click="getAllPenot()">Aggiorna</button>
        </div>

        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Serata</th>
                        <th></th>
                        <th></th>
                        <th>Pezzi</th>
                        <th></th>
                        <th></th>
                        <th>Vedi di più</th>
                    </tr>
                </thead>
                <tbody v-for="(t, id) in totqty.slice()" :key="t.food_name">
                    <tr>
                        <td>{{ t.food_name }}</td>
                        <td></td>
                        <td></td>
                        <td>{{ t.somma_qty }}</td>
                        <td></td>
                        <td></td>
                        <td><i @click="changeopengrid(id, t.food_id)" class="fa-solid fa-chevron-down"></i></td>
                    </tr>
                    <tr v-if="showSerata[id] == true">
                        <th>Serata</th>
                        <th>Pezzi</th>
                        <th>nominativo</th>
                        <th>telefono</th>
                        <th>Data Prenotazione</th>
                        <th>Stato</th>
                    </tr>
                    <tr v-for="(b, index) in filterPenot.slice().reverse()" :key="b.book_id">
                        <td v-if="showSerata[id] == true">{{ b.food_name }}</td>
                        <td v-if="showSerata[id] == true">{{ b.item_qty }}</td>
                        <td v-if="showSerata[id] == true">{{ b.book_nominativo }}</td>
                        <td v-if="showSerata[id] == true">{{ b.book_phone }}</td>
                        <td v-if="showSerata[id] == true">{{ formattime(b.book_when) }}</td>
                        <td v-if="b.book_status == 0 && showSerata[id] == true"><i class="fa-solid fa-square-xmark"
                                style="padding-right: 1vh;"></i>Cancellato</td>
                        <td v-else-if="b.book_status == 1 && showSerata[id] == true"><i class="fa-regular fa-square-minus"
                                style="padding-right: 1vh;"></i>Attesa</td>
                        <td v-else-if="b.book_status == 2 && showSerata[id] == true"><i class="fa-regular fa-square-check"
                                style="padding-right: 1vh;"></i>confermato</td>
                        <td v-if="showSerata[id] == true">
                            <button class="btn" @click="changestate(index)"
                                style="z-index: 0; padding: 0.5vh 1.5vh; border-radius: 5px;"><i
                                    class="fas fa-bars"></i></button>
                            <div v-if="showAction[index] == true" class="drop-down-select">
                                <button v-if="b.book_status == 1" class="action-btn"
                                    @click="ActionBtn('Confirm', index, b.book_id)">
                                    Conferma
                                </button>

                                <button v-if="b.book_status != 1" class="annulla-btn"
                                    @click="ActionBtn('Annulla', index, b.book_id)">
                                    Annulla
                                </button>

                                <button v-if="b.book_status == 1" class="cancel-btn"
                                    @click="ActionBtn('Cancel', index, b.book_id)">
                                    Cancella
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import moment from 'moment';
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Prenotazioni',

    data() {
        return {
            totqty: [],
            allPenot: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
            showSerata: [],
            showAction: [],
        }
    },

    created() {
        if (this.allPenot.length == 0) {
            if (!this.admin) {
                this.$router.push("/login");
            } else {
                this.getAllPenot();
            }
        }
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["admin"]),

        filterPenot: function () {
            return this.allPenot.filter((b) => b.book_status <= 2 && b.book_status >= 0);
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async getAllPenot() {
            this.totqty = (await axios.get('/prenotazione/sum')).data;
            this.changeopengrid();
            this.changestate();
        },

        async changeopengrid(id, food_id) {
            if (this.showSerata[0] == undefined || null || "") {
                for (let l = 0; l < this.totqty.length; l++) {
                    this.showSerata.push(false)
                }
            } else {
                switch (this.showSerata[id]) {
                    case true:
                        this.showSerata[id] = false
                        break;

                    case false:
                        console.log(food_id)
                        this.allPenot = (await axios.get('/getprenotazione/' + food_id)).data;
                        console.log(this.allPenot)
                        this.showSerata[id] = true
                        break;
                }
            }
        },

        changestate(id) {
            if (this.showAction[0] == undefined || null || "") {
                for (let i = 0; i < this.allPenot.length; i++) {
                    this.showAction.push(false)
                }
            } else {
                switch (this.showAction[id]) {
                    case true:

                        this.showAction[id] = false
                        break;

                    case false:
                        this.showAction[id] = true
                        break;
                }
            }
        },


        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        formattime(data) {
            const dataParsata = moment(data, 'YYYY/MM/DDTHH:mm');

            // Formatta la data nel nuovo formato
            const dataFormattata = dataParsata.format('DD/MM/YYYY');

            return dataFormattata;
        },

        handleLogout: function () {
            this.setAdmin("");
        },

        async ActionBtn(type, index, book_id) {
            switch (type) {
                case "Confirm":
                    var data = {
                        id: book_id,
                        action: 2
                    }
                    break;

                case "Annulla":
                    data = {
                        id: book_id,
                        action: 1
                    }
                    break;

                case "Cancel":
                    data = {
                        id: book_id,
                        action: 0
                    }
                    break;
            }

            this.showAction[index] = false
            await axios.put("/prenotazione/action", data)
            this.getAllPenot();
        },


        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllPenot();
            }.bind(this), 600000);
        }

    },
}
</script>

<style scoped>
.admin-container {
    margin-left: 20%;
    background-color: #fff;
    height: 100vh;
    padding: 2rem 5%;
    font-size: 16px;
}

.admin-container h1 {
    font-family: 'Satisfy', cursive;
    font-size: 1.5em;
    color: #27ae60;
}

.project-list>tbody>tr>td {
    position: relative;
    padding: 12px 4px;
}

.table-responsive {
    margin-top: 8vh;
}


.action-btn,
.annulla-btn,
.cancel-btn {
    color: white;
    text-align: center;
    padding: 1vh;
    border-radius: 5px;
}

.action-btn {
    background-color: #27ae60;
    margin-bottom: 0.5vh;
}

.annulla-btn {
    background-color: #0da9ef;
}

.cancel-btn {
    background-color: red;
    margin-top: 0.5vh;
}

.annulla-btn:hover,
.action-btn {
    background-color: #27ae60;
}


.action-btn:hover,
.cancel-btn:hover {
    background-color: #0da9ef;
}

.drop-down-select {
    position: absolute;
    right: 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    padding: 1vh 1vh;
    text-align: center;
    border: 2px outset black;
    border-radius: 5px;

}
</style>