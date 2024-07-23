<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-chart-line"> Dashboard</i></h1>
        </div>

        <div v-if="tabFunzioni[0] == true" class="table-open">
            <h2 @click="OpenGrid(0)"><i class="fa-solid fa-utensils" style="padding-right: 2vh; color: #f38609;"></i>Ordini
            </h2>
            <i @click="OpenGrid(0)" class="fa-solid fa-chevron-up"></i>
            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
            <table class="project-list">
                <tr>
                    <td>
                        <h3>Apertura/chiusura automatica</h3>
                    </td>
                    <td style="text-align: center;">
                        <h3>{{ status[0] }}</h3>
                    </td>
                    <td>
                        <VueToggles :value="toggle[0]" @click="ChangeStatus(0)" :height="28" :width="56" checkedText="On"
                            uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 0px;">
                        <hr style="width: 100%; margin: 10px 0px; border-width: 1px; border-color: #27ae60;">
                    </td>
                    <td style="padding-left: 0px;">
                        <hr style="width: 100%; margin: 10px 0px; border-width: 1px; border-color: #27ae60;">
                    </td>
                    <td style="padding-left: 0px;">
                        <hr style="width: 100%; margin: 10px 0px; border-width: 1px; border-color: #27ae60;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>Ordini al Tavolo</h3>
                    </td>
                    <td style="text-align: center;">
                        <h3>{{ status[1] }}</h3>
                    </td>
                    <td>
                        <VueToggles :value="toggle[1]" @click="ChangeStatus(1)" :height="28" :width="56" checkedText="On"
                            uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 0px;">
                        <hr style="width: 100%; margin: 10px 0px; border-width: 2px;">
                    </td>
                    <td style="padding-left: 0px;">
                        <hr style="width: 100%; margin: 10px 0px; border-width: 2px;">
                    </td>
                    <td style="padding-left: 0px;">
                        <hr style="width: 100%; margin: 10px 0px; border-width: 2px;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>Ordini Asporto</h3>
                    </td>
                    <td style="text-align: center;">
                        <h3>{{ status[2] }}</h3>
                    </td>
                    <td>
                        <VueToggles :value="toggle[2]" @click="ChangeStatus(2)" :height="28" :width="56" checkedText="On"
                            uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                    </td>
                </tr>
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(0)">
            <h2><i class="fa-solid fa-utensils" style="padding-right: 2vh; color: #f38609;"></i>Ordini</h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>



        <div v-if="tabFunzioni[1] == true" class="table-open">
            <h2 @click="OpenGrid(1)"><i class="fa-solid fa-book-open"
                    style="padding-right: 2vh; color: #f38609;"></i>Prenotazioni
            </h2>
            <i @click="OpenGrid(1)" class="fa-solid fa-chevron-up"></i>
            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
            <table class="project-list">
                <tr>
                    <td>
                        <h3>Apertura/chiusura</h3>
                    </td>
                    <td style="text-align: center;">
                        <h3>{{ status[3] == 'Abilitato' ? 'Aperto' : 'Chiuso' }}</h3>
                    </td>
                    <td>
                        <VueToggles :value="toggle[3]" @click="ChangeStatus(3)" :height="28" :width="56" checkedText="On"
                            uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                    </td>
                </tr>
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(1)">
            <h2><i class="fa-solid fa-book-open" style="padding-right: 2vh; color: #f38609;"></i>Prenotazioni</h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </div>
    <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
</template>


<script>
import axios from "axios";
import QuickViewErrore from '@/components/QuickViewErrore.vue';
import { VueToggles } from "vue-toggles";
import { mapState, mapMutations } from "vuex";
import { Makelog } from '@/glbFunctions';

export default {
    name: 'Prenotazioni',

    data() {
        return {
            tabFunzioni: [true, true],
            status: [],
            toggle: [],
            Quickerrore: false,
        }
    },

    created() {
        if (!this.admin) {
            this.$router.push("/login");
        } else {
            this.GetSwitch()
        }
    },

    computed: {
        ...mapState(["admin"]),
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async GetSwitch() {
            let switchdata = await axios.get('/sagra/controlli/' + sessionStorage.getItem('AdminSagraId'))
            let response = switchdata.request.response
            if (response.includes("{\"code\"")) {
                this.Quickerrore = true
            } else {
                if (switchdata.data.length > 0) {
                    let switchsplit = switchdata.data[0].StrOrdini.split('')
                    for (let i = 0; i < switchsplit.length; i++) {
                            this.status[i] = switchsplit[i] == 0 ? 'Disabilitato' : 'Abilitato'
                            this.toggle[i] = switchsplit[i] == 0 ? false : true
                    }
                }
            }
        },

        handleLogout: function () {
            this.setAdmin("");
        },

        OpenGrid(index) {
            if (this.tabFunzioni[index] == true) {
                this.tabFunzioni[index] = false
            } else {
                this.tabFunzioni[index] = true
            }
        },

        async ChangeStatus(index) {
            if (this.toggle[index] === true) {
                this.status[index] = 'Disabilitato'
                this.toggle[index] = false
            } else if (this.toggle[index] === false) {
                this.status[index] = 'Abilitato'
                this.toggle[index] = true
            } else {
                this.status[index] = 'Abilitato'
                this.toggle[index] = true
            }

            let unionstatus = this.status.join('')
            let replacestatus = unionstatus.replace(/Abilitato/g, '1')
            replacestatus = replacestatus.replace(/Disabilitato/g, '0')
            let uniondata = {
                type: replacestatus,
                id: sessionStorage.getItem('AdminSagraId')
            }
           
            await axios.put('/SagraComand', uniondata)
            Makelog((this.toggle[index] === true) ? "Disabilitazione" : "Abilitazione","info")
        },

    },
    components: { VueToggles, QuickViewErrore }
}
</script>

<style scoped>
.admin-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: 20%;
    background-color: whitesmoke;
    padding: 5rem 5%;
    font-size: 16px;
}

.admin-container h1 {
    font-family: 'Satisfy', cursive;
    font-size: 1.5em;
    color: #27ae60;
}

.project-list {
    width: 100%;
    text-align: left;
}

.project-list td {
    padding-left: 20px;
}

.table-close {
    width: 100%;
    margin: 3vh 0vh;
    padding: 12.5px 25px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    background-color: white;
    border: 1px outset black;
    border-radius: 5px;
}

.table-open {
    width: 100%;
    margin: 3vh 0vh;
    padding: 12.5px 25px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: white;
    border: 1px outset black;
    border-radius: 5px;
}

@media (max-width: 983px) {
    .admin-container {
        margin: 0px;
        margin-top: 70px;
        background-color: whitesmoke;
        font-size: 16px;
    }

    .admin-container h1 {
        font-family: 'Satisfy', cursive;
        font-size: 1.2em;
        color: #27ae60;
    }

    .project-list td {
        padding-left: 3px;
        text-align: left;
    }

}
</style>