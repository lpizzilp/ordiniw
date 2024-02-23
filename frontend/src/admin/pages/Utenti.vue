<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-users-gear"> Utenti</i></h1>
        </div>

        <div class="table-open">
            <table class="project-list">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Email</td>
                        <td>Attivo</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(t) in filterUte" :key="t.user_id">
                        <td>{{ t.user_id }}</td>
                        <td>{{ t.user_name }}</td>
                        <td>{{ t.user_email }}</td>
                        <td>{{ t.authlevel }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
</template>


<script>
import axios from "axios";
import QuickViewErrore from '@/components/QuickViewErrore.vue';
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Prenotazioni',

    data() {
        return {
            tabFunzioni: false,
            status: [],
            Ute: [],
            Quickerrore: false,
        }
    },

    created() {
        if (!this.admin) {
            this.$router.push("/login");
        } else {
            this.GetUte()
        }
    },

    computed: {
        ...mapState(["admin"]),
        filterUte: function () {
            return this.Ute;
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async GetUte() {
            this.Ute = (await axios.get('/users')).data
            console.log(this.Ute)
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
                arg: arg + ' toggle switch numero ' + (index + 1) + ' da parte di ' + sessionStorage.getItem('User')
            }
            await axios.post('/log', data)
        },
    },
    components: {  QuickViewErrore }
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
    text-align: center;
}

.project-list td {
    border-bottom: 1px inset black;
    padding: 5px;
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