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
                    <td><VueToggles :value="toggle[0]" @click="ChangeStatus(0)" :height="28" :width="56" checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" /></td>
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
                    <td><VueToggles :value="toggle[1]" @click="ChangeStatus(1)" :height="28" :width="56" checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" /></td>
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
                    <td><VueToggles :value="toggle[2]" @click="ChangeStatus(2)" :height="28" :width="56" checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" /></td>
                </tr>
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(0)">
            <h2><i class="fa-solid fa-utensils" style="padding-right: 2vh; color: #f38609;"></i>Ordini</h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { VueToggles } from "vue-toggles";
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Prenotazioni',

    data() {
        return {
            tabFunzioni: [true],
            status: [],
            toggle: [],
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
            if (switchdata.data.length > 0) {
                this.status[0] = switchdata.data[0].StrOrdini.substring(0, 1) == 1 ? 'Abilitato' : 'Disabilitato'
                this.status[1] = switchdata.data[0].StrOrdini.substring(1, 2) == 1 ? 'Abilitato' : 'Disabilitato'
                this.status[2] = switchdata.data[0].StrOrdini.substring(2, 3) == 1 ? 'Abilitato' : 'Disabilitato'
                this.toggle[0] = switchdata.data[0].StrOrdini.substring(0, 1) == 1 ? true : false
                this.toggle[1] = switchdata.data[0].StrOrdini.substring(1, 2) == 1 ? true : false
                this.toggle[2] = switchdata.data[0].StrOrdini.substring(2, 3) == 1 ? true : false
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
            }

            let unionstatus = this.status.join('')
            let replacestatus = unionstatus.replace(/Abilitato/g, '1')
            replacestatus = replacestatus.replace(/Disabilitato/g, '0')
            let uniondata = {
                type: replacestatus,
                id: sessionStorage.getItem('AdminSagraId')
            }
            await axios.put('/SagraComand', uniondata)
            this.Makelog(index)
        },

        async Makelog(index) {
            let arg = ""
            if (this.toggle[index] === true) {
                arg = 'Disabilitazione'
            } else if (this.toggle[index] === false) {
                arg = 'Abbilitazione'
            }

           let data = {
                mode: 'warn',
                arg: arg + ' toggle switch numero ' + (index + 1) + ' da parte di '+ sessionStorage.getItem('Admin')
            }
            await axios.post('/log', data)
        },
    },
    components: { VueToggles }
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