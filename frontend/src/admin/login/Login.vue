<template>
    <div class="login-container">
        <div class="login-form-container">
            <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>LOGIN Amministratore</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="email" id="uEmail" name="uEmail" class="form-control" placeholder="Inserisci l'email"
                        v-model="loginObj.email" />
                </div>

                <div class="form-group">
                    <input type="password" id="uPass" name="uPass" class="form-control"
                        placeholder="Inserisci la tua password" v-model="loginObj.pass" />
                    <i v-if="showPassword == false" class="fa-regular fa-eye" @click="ShowPass()"></i>
                    <i v-else class="fa-regular fa-eye-slash" @click="ShowPass()"></i>
                </div>

                <div class="form-group">
                    <input type="submit" value="Accedi" class="btn">
                    <p>Non hai un account? <router-link @click="scrollToTop()" to="/register">Creane uno
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
        <quick-view-login v-if="showQuickVue"></quick-view-login>
        <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
    </div>
</template>


<script>
import axios from "axios";
import QuickViewErrore from '@/components/QuickViewErrore.vue';
import QuickViewLogin from "@/admin/components/QuickViewLogin.vue"
import { mapMutations } from "vuex";
export default {
    name: 'Login',

    data() {
        return {
            loginObj: { email: "", pass: "" },
            matchUser: undefined,
            errors: [],
            showPassword: false,
            showQuickVue: false,
            Quickerrore: false
        }
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async checkForm() {
            this.errors = [];

            if (!this.loginObj.email) {
                this.errors.push("L'email è obbligatoria");
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)) {
                    this.errors.push("Inserisci un email valida, è la stessa che hai usato nella registrazione");
                }
            }

            if (!this.loginObj.pass) {
                this.errors.push('La password è obbligatoria');
            }


        },

        ShowPass() {
            this.showPassword = !this.showPassword;
            document.getElementById('uPass').type = this.showPassword ? 'text' : 'password';
        },


        async validateuser() {
            let Adminuser = await axios.get('/users/' + this.loginObj.email);
            let response = Adminuser.request.response
            if (response.includes("{\"code\"")) {
                this.Quickerrore = true
                this.Makelog(response);
            }

            if (Adminuser.data.length == 0) {
                this.matchUser = null

            } else if (Adminuser.data.authlevel != 0) {
                if (Adminuser.data.user_password === this.loginObj.pass) {
                    Adminuser.data.user_password = "";
                    sessionStorage.setItem('AdminSagraId', (await axios.get('/users/' + this.loginObj.email)).data.id_sagra);
                    if (sessionStorage.getItem('AdminSagraId') != null || sessionStorage.getItem('AdminSagraId') != undefined || sessionStorage.getItem('AdminSagraId') != "") {
                        this.matchUser = true
                        let data = {
                            mode: 'info',
                            arg: 'Accesso pannello di controllo di ' + Adminuser.data.user_name
                        }
                        sessionStorage.setItem("User", Adminuser.data.user_name)
                        axios.post('/log', data)
                    }
                } else {
                    this.matchUser = false
                }

            } else {
                this.matchUser = undefined
            }
        },

        async Makelog(err) {
            let data = {
                mode: 'err',
                arg: err
            }
            await axios.post('/log', data)
        },

        async handleSubmit(e) {
            this.checkForm();
            e.preventDefault();
            if (this.errors.length != 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                await this.validateuser()
                switch (this.matchUser) {
                    case false:
                        this.errors.push("Password o email sbagliate!")
                        break;

                    case true:
                        this.setAdmin('Admin');
                        sessionStorage.setItem("Admin", this.loginObj.email);
                        this.$router.push("/admin/prenotazioni");
                        break;

                    case undefined:
                        this.showQuickVue = true
                        break;

                    case null:
                        this.errors.push("Utente non registrato!")
                        break;
                }
            }
        }

    },

    components: { QuickViewLogin, QuickViewErrore }

}
</script>

<style scoped>
.login-container {
    padding: 2rem 9%;
}

.login-container .login-form-container {
    background-color: #fff;
    height: 90vh;
}

.login-container .login-form-container form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: .5rem;
    animation: fadeUp .4s linear;
}

.login-container .login-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.login-container .login-form-container form .form-control {
    margin: .7rem 0;
    border-radius: .5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border-color: black;
}

.login-container .login-form-container form .btn {
    margin-bottom: 1rem;
    margin-top: 1rem;
    width: 100%;
}

.login-container .login-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.login-container .login-form-container form p a {
    color: #27ae60;
}

.form-group .fa-eye-slash,
.form-group .fa-eye {
    position: absolute;
    top: 123px;
    left: 330px;
    text-align: center;
    padding-left: 5px;
    font-size: 20px;
}

.login-container .login-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.login-container .login-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.login-container .login-form-container form .error-box ul {
    margin: 0;
    padding: 10px 0px;
}

.login-container .login-form-container form .error-box ul li {
    padding: 5px 10px;
    list-style-type: square;
    color: black;
}

@media (max-width: 768px) {

    .form-group .fa-eye-slash,
    .form-group .fa-eye {
        position: absolute;
        top: 110px;
        left: 300px;
        text-align: center;
        padding-left: 5px;
        font-size: 20px;
    }

}

@media (max-width: 576px) {

.form-group .fa-eye-slash,
.form-group .fa-eye {
    position: absolute;
    top: 98px;
    left: 265px;
    text-align: center;
    padding-left: 5px;
    font-size: 20px;
}

}
</style>