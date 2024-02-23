<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-users-gear"> Utenti</i></h1>
            <button v-if="Showmodifica == false" class="btn" @click="GestClick('Modifica')"><i class="fa-solid fa-pencil"
                    style="padding-right: 1vh;"></i>Modifica riga N.{{Nriga
                    }}</button>
            <div v-else style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="btn" style="background-color: #f38609;" @click="GestClick('Annulla')"><i
                        class="fa-solid fa-arrow-right-from-bracket" style="padding-right: 1vh;"></i>Annulla
                    Modifiche</button>
                <button class="btn" style="background-color: red;" @click="GestClick('Elimina')"><i
                        class="fa-solid fa-user-slash" style="padding-right: 1vh;"></i>Elimina
                    Acount</button>
            </div>

        </div>

        <div v-if="Showmodifica == false" class="table-open">
            <table class="project-list" id="Tabella">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Email</td>
                        <td>Attivo</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(t, index) in filterUte" :key="t.user_id" @click="Selectriga(index, t)"
                        @dblclick="GestClick('Modifica')">
                        <td style="border-right: 2px inset #27ae60; background-color: whitesmoke;">{{ t.user_id }}</td>
                        <td style="border-right: 2px inset #27ae60;">{{ t.user_name }}</td>
                        <td style="border-right: 2px inset #27ae60;">{{ t.user_email }}</td>
                        <td style="display: none;">{{ t.user_password }}</td>
                        <td v-if="t.authlevel == 1" style="background-color: #2ae477c4;">Si</td>
                        <td v-else-if="t.authlevel == 0" style="background-color: #e95018cb;">No</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="register-form-container">
            <form id="registerForm" @submit="GestClick('Conferma')" novalidate autocomplete="off">
                <h3>Modifica l'accout</h3>

                <div v-if="errors.length != 0" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="uName">Nome completo:
                    </label><input type="text" name="uName" :placeholder="ModifyObj.name" id="uName" class="form-control"
                        v-model="ModifyObj.name" />
                </div>

                <div class="form-group">
                    <label for="uEmail">Email:
                    </label>
                    <input type="email" name="uEmail" readonly :placeholder="ModifyObj.email" id="uEmail"
                        class="form-control" v-model="ModifyObj.email"
                        style="background-color: rgba(0, 0, 0, 0.5); color: whitesmoke;" />
                </div>

                <div class="form-group">
                    <label for="uPass">Password:
                    </label>
                    <input type="password" name="uPass" :placeholder="ModifyObj.pass" id="uPass" class="form-control"
                        v-model="ModifyObj.pass" />
                </div>

                <div class="form-group">
                    <label for="uauthlevel">Autorizzazione:
                    </label>
                    <input type="number" name="uauthlevel" :placeholder="ModifyObj.authlevel" id="uauthlevel"
                        class="form-control" min="0" max="9" v-model="ModifyObj.authlevel" />
                </div>

                <div class="form-group">
                    <input type="submit" value="Conferma" class="btn" />
                </div>
            </form>
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
            ModifyObj: { name: "", email: "", pass: "", id_sagra: "", authlevel: "" },
            Showmodifica: false,
            status: [],
            Ute: [],
            Nriga: null,
            errors: [],
            Quickerrore: false,
            showQuickview: false
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

        Selectriga(index, t) {
            this.Nriga = index + 1
            var Tabella = document.getElementById("Tabella");
            for (let i = 1; i < Tabella.rows.length; i++) {
                if ((index + 1) == i) {
                    Tabella.rows[(index + 1)].style.backgroundColor = "yellow"
                    Tabella.rows[(index + 1)].cells[3].style.backgroundColor = "yellow"
                } else {
                    Tabella.rows[i].style.backgroundColor = 'transparent';
                    Tabella.rows[i].cells[3].style.backgroundColor = t.authlevel == 0 ? '#2ae477c4' : '#e95018cb'
                }
            }
            console.log()
        },

        async Rigadata() {
            var Tabella = document.getElementById("Tabella");
            var riga = Tabella.rows[this.Nriga];
            this.ModifyObj.name = riga.cells[1].innerHTML
            this.ModifyObj.email = riga.cells[2].innerHTML
            this.ModifyObj.pass = riga.cells[3].innerHTML
            this.ModifyObj.authlevel = riga.cells[4].innerHTML == 'Si' ? 1 : 0
        },

        async GestClick(type) {
            switch (type) {
                case 'Annulla':
                    this.Showmodifica = false
                    break;

                case 'Elimina':

                    break;

                case 'Conferma':

                    break;
                case 'Modifica':
                    await this.Rigadata()
                    this.Showmodifica = true
                    break;
            }
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
    components: { QuickViewErrore }
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
    margin-bottom: 0;
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

.project-list>thead>tr>td {
    border: 2px inset #27ae60;
    background-color: whitesmoke;
    font-weight: 600;
}

.project-list>tbody>tr>td {
    border: 2px inset #27ae60;
    border-left: none;
    border-right: none;
    border-bottom: none;
    padding: 5px;
}

.project-list>tbody>tr:hover {
    background-color: aliceblue;
}

.project-list::-webkit-scrollbar {
    width: 1rem;
}

.project-list::-webkit-scrollbar-track {
    background: #fff;
}

.project-list::-webkit-scrollbar-thumb {
    background: #f38609;
    border-radius: 5rem;
}

.table-open {
    width: 100%;
    margin: 4vh 0vh;
    text-align: center;
    background-color: white;
    border: 1px outset black;
    border-radius: 5px;
}

.register-form-container {
    margin-top: -50px;
    margin-left: 25%;
    width: 50%;
    text-align: center;
}

.register-form-container form h3 {
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
}

.register-form-container form .form-control {
    margin: 3px 0;
    background: white;
    text-align: center;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    text-transform: none;
    border-color: black;
    border-radius: 0.5rem;
}


.register-form-container form label {
    font-size: 1.7rem;
    margin-top: 10px;
    margin-bottom: 0px;
}

.register-form-container form .btn {
    margin: 1.5rem 0;
    width: 100%;
    text-align: center;
}

.register-form-container form .form-group {
    margin: 0;
}

.register-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.register-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.register-form-container form .error-box ul {
    margin: 0;
    padding: 10px 0px;
}

.register-form-container form .error-box ul li {
    padding: 5px 10px;
    list-style-type: square;
    color: black;
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

    .table-open {
        display: inline-block;
        text-align: center;
        background-color: white;
        border: 1px outset black;
        border-radius: 5px;
    }

    .project-list {
        width: 100%;
        text-align: center;
    }

}
</style>