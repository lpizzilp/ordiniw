<template>
    <div class="admin-container">
        <h1><i class="fa-solid fa-book-open"> Prenotazioni</i></h1>

        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Serata</th>
                        <th>Pezzi</th>
                        <th>nominativo</th>
                        <th>telefono</th>
                        <th>Orario</th>
                        <th>Stato</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in filterPenot.slice().reverse()" :key="b.book_id">
                        <td>{{ b.food_name }}</td>
                        <td>{{ b.item_qty }}</td>
                        <td>{{ b.book_nominativo }}</td>
                        <td>{{ b.book_phone }}</td>
                        <td>{{ formattime(b.book_when) }}</td>
                        <td v-if="b.book_status = 0"><i class="fa-solid fa-square-xmark"
                                style="padding-right: 1vh;"></i>Cancellato</td>
                        <td v-else-if="b.book_status = 1"><i class="fa-regular fa-square-minus"
                                style="padding-right: 1vh;"></i>Attesa</td>
                        <td v-else-if="b.book_status = 2"><i class="fa-regular fa-square-check"
                                style="padding-right: 1vh;"></i>confermato</td>
                        <td>
                            <button class="btn" @click="changestate()" style="padding: 0.5vh 1.5vh; border-radius: 5px;"><i class="fas fa-bars"></i></button>
                            <div v-if="showAction == true" class="drop-down-select">
                                <button v-if="b.book_status != 0" class="action-btn" @click="nextStatusBtn(b.bill_id)">
                                    Conferma
                                </button>

                                <button v-if="b.book_status != 0" class="cancel-btn" @click="cancelBtn(b.bill_id)">
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
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allPenot: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
            showAction: false,
        }
    },

    created() {
        this.getAllPenot();
        if (!this.admin) {
            this.$router.push("/login");
        }
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["allFoods", "admin"]),

        filterPenot: function () {
            return this.allPenot.filter((b) => b.book_status < 6 && b.book_status > 0);
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async getAllPenot() {
            this.allPenot = (await axios.get('/getprenotazione')).data;
        },

        changestate() {
           switch (this.showAction) {
            case true:
                this.showAction = false
                break;
           
            case false:
                this.showAction = true
                break;
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

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllPenot();
        },

        async paidBtn(id) {
            await axios.put('/billstatus/paid/' + id);
            this.getAllPenot();
        },

        async cancelBtn(id) {
            await axios.put('/billstatus/cancel/' + id);
            this.getAllPenot();
        },



        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllPenot();
            }.bind(this), 1000);
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
    padding: 12px 8px;
}

.project-list>tbody>tr>td .avatar {
    width: 22px;
    border: 1px solid #CCC;
}

.table-responsive {
    margin-top: 8vh;
}

.action-btn,
.cancel-btn,
.paid-btn {
    width: 100px;
    height: 25px;
    color: white;
    text-transform: capitalize;
}

.action-btn {
    background-color: #0da9ef;
    margin-right: 10px;
}

.cancel-btn,
.paid-btn {
    background-color: red;
}

.action-btn:hover {
    background-color: #27ae60;
}

.drop-down-select {
    background-color: rgb(255, 255, 255);
    padding: 1vh 1vh;
    text-align: center;
    border: 2px outset black;
    border-radius: 5px;

}
</style>