<template>
    <div class="quick-view">
        <div class="quick-view-inner">
            <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3><i class="fa-solid fa-user-lock" style="padding-right: 2vh;"></i>LOGIN Cassiere</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <input type="email" id="uEmail" name="uEmail" class="form-control" placeholder="Inserisci l'email"
                       autocomplete="username" v-model="loginObj.email" />
                </div>

                <div class="form-group">
                    <input type="password" id="uPass" name="uPass" class="form-control" autocomplete="current-password"
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
    </div>
    <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
</template>

<script>
import axios from "axios";
import QuickViewErrore from '@/components/QuickViewErrore.vue';
import { mapMutations } from "vuex";
import { Makelog } from '@/glbFunctions';

export default {
    name: 'Login',
    inject: ["eventBus"],

    data() {
        return {
            loginObj: { email: "", pass: "" },
            matchUser: undefined,
            errors: [],
            showPassword: false,
            Quickerrore: false
        }
    },

    methods: {
        ...mapMutations(["setCassiere"]),

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
            let Adminuser = await axios.get('/users/' + sessionStorage.getItem('SagraId') + '/' + this.loginObj.email);
            let response = Adminuser.request.response
            if (response.includes("{\"code\"")) {
                this.Quickerrore = true
                Makelog(response);
            }
            if (Adminuser.data.length == 0) {
                this.matchUser = null
            } else if (Adminuser.data.authlevel == 2 || Adminuser.data.user_email == 'admin@esagra.it') {
                if (Adminuser.data.user_password === this.loginObj.pass) {
                    Adminuser.data.user_password = "";
                    if (sessionStorage.getItem('SagraId')) {
                        this.matchUser = true
                        let data = {
                            mode: 'info',
                            arg: 'Accesso cassa di ' + Adminuser.data.user_name
                        }
                        this.setCassiere(Adminuser.data.user_name)
                        axios.post('/log', data)
                    }
                } else {
                    this.matchUser = false
                }

            } else {
                this.matchUser = undefined
            }
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
                        sessionStorage.setItem("userCassa", this.loginObj.email);
                        this.eventBus.emit("Fullscreen", true);
                        break;

                    case undefined:
                    this.errors.push("Utente non ablitato alla funzione di cassa!")
                        break;

                    case null:
                        this.errors.push("Utente non registrato!")
                        break;
                }
            }
        }

    },

    components: { QuickViewErrore }

}
</script>

<style scoped>
.quick-view {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    padding: 2rem 9%;
    background-color: #00000047;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
}

.quick-view .quick-view-inner {
    background-color: #fff;
    height: 90vh;
    text-align: center;
}

.quick-view .quick-view-inner form {
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40rem;
    width: 100%;
    box-shadow: 1rem 1rem rgba(0, 0, 0, 0.568);
    border: 0.1rem solid rgb(0, 0, 0);
    padding: 2rem;
    border-radius: .5rem;
    animation: fadeUp .4s linear;
}

.quick-view .quick-view-inner form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.quick-view .quick-view-inner form .form-control {
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

.quick-view .quick-view-inner form .btn {
    margin-bottom: 1rem;
    margin-top: 1rem;
    width: 100%;
}

.quick-view .quick-view-inner form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.quick-view .quick-view-inner form p a {
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

.quick-view .quick-view-inner form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.quick-view .quick-view-inner form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.quick-view .quick-view-inner form .error-box ul {
    margin: 0;
    padding: 10px 0px;
}

.quick-view .quick-view-inner form .error-box ul li {
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
