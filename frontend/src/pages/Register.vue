<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Crea il tuo account</h3>

                <div v-if="errors.length != 0" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="uName">Inserisci il tuo nome completo:
                    </label>
                    <input type="text" name="uName" placeholder="Inserisci nome e cognome" id="uName" class="form-control"
                        v-model="registerObj.name" />
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uEmail">Inserisci l'email:
                    </label>
                    <input type="email" name="uEmail" placeholder="L'email diventerà il tuo nome utente" id="uEmail"
                        class="form-control" v-model="registerObj.email" />
                    <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{ errorObj.emailErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPass">Inserisci una password:
                    </label>
                    <input type="password" name="uPass" placeholder="enter your password" id="uPass" class="form-control"
                        v-model="registerObj.pass" />
                    <p class="error-mess" v-if="errorObj.passErr.length > 0">{{ errorObj.passErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPassConfirm">Reinserisci la password:
                    </label>
                    <input type="password" name="uPassConfirm" placeholder="enter your password again" id="uPassConfirm"
                        class="form-control" v-model="registerObj.confirm" />
                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
                </div>

                <div class="form-group">
                    <input type="submit" value="Registrati" class="btn" />
                    <p>hai un account? <router-link @click="scrollToTop()" to="/login">login</router-link>
                    </p>
                </div>
            </form>
        </div>
        <quick-view-register v-if="showQuickVue" :display="Isuser"></quick-view-register>
    </div>
</template>

<script>
import axios from 'axios';
import QuickViewRegister from '@/components/QuickViewRegister.vue';
export default {
    name: "Register",

    data() {
        return {
            registerObj: { name: "", email: "", pass: "", confirm: "" },
            errorObj: { nameErr: [], emailErr: [], passErr: [], confirmErr: [] },
            errors: [],
            showQuickVue: false,
            Isuser: true,
        }
    },

    created() {
        if (sessionStorage.getItem('SagraId') == null || undefined || "") {
            this.Isuser = false
            this.showQuickVue = true
        }
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.emailErr = [];
            this.errorObj.passErr = [];
            this.errorObj.confirmErr = [];
            this.errors = [];
        },

        checkForm: function () {
            this.resetCheckErr();

            // Name validate
            if (!this.registerObj.name) {
                this.errorObj.nameErr.push("Il nome è obbligatorio");
                this.errors.push("Il nome è obbligatorio");
            }
            else {
                if (!/^[a-zA-Z]+(\s[a-zA-Z]+)+$/.test(this.registerObj.name)) {
                    this.errorObj.nameErr.push('Inserisci nome e cognome');
                    this.errors.push('Inserisci nome e cognome');
                }
            }

            // Email validate
            if (!this.registerObj.email) {
                this.errorObj.emailErr.push("L'email è obbligatoria, sarà il tuo futuro nome Utente");
                this.errors.push("L'email è obbligatoria, sarà il tuo futuro nome Utente");
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.registerObj.email)) {
                    this.errorObj.emailErr.push("L'email deve essere valida");
                    this.errors.push("L'email deve essere valida");
                }
            }

            // Pass validate
            if (!this.registerObj.pass) {
                this.errorObj.passErr.push('la password è obbligatoria');
                this.errors.push('la password è obbligatoria');
            }
            else {
                if (this.registerObj.pass.length < 3) {
                    this.errorObj.passErr.push('La password deve avere almeno 4 caratteri');
                    this.errors.push('La password deve avere almeno 4 caratteri');
                }
            }

            // Confirm Pass validate
            if (!this.registerObj.confirm) {
                this.errorObj.confirmErr.push('Reinserisci la password');
                this.errors.push('Reinserisci la password');
            }
            else {
                if (this.registerObj.pass !== this.registerObj.confirm) {
                    this.errorObj.confirmErr.push('Le password devono essere uguali');
                    this.errors.push('Le password devono essere uguali');
                }
            }
            this.scrollToTop();
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        async handleSubmit(e) {
            this.checkForm();
            if (!this.checkEmptyErr()) {
                this.scrollToTop();
                e.preventDefault();
            } else {
                e.preventDefault();
                let data = await axios.get('/users/' + this.registerObj.email);
                if (data.data) {
                    this.errorObj.emailErr.push("Questa email è associata a un account esistente");
                    this.errors.push("Questa email è associata a un account esistente");
                }
                else {
                    let dataid = (await axios.get("/users/new")).data
                    let id = dataid.user_id
                    id == null || undefined ? id = 0 : id == 0 ? id = 1 : id = id + 1
                    let data = {
                        user_id: id,
                        user_email: this.registerObj.email,
                        user_password: this.registerObj.pass,
                        id_sagra: sessionStorage.getItem('SagraId'),
                        user_name: this.registerObj.name,
                        authlevel: "0",
                    }
                    await axios.post("/users/", data);

                    // ora
                    var now = new Date();
                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);
                    var hour = ("0" + (now.getHours())).slice(-2);
                    var min = ("0" + (now.getMinutes())).slice(-2);
                    let ora = hour + ":" + min + ' del giorno ' + day + '/' + month + '/' + now.getFullYear();

                    data = {
                        sagra_link: "http://ordini.esagra.it",
                        reg_ora: ora,
                        admin_name: this.registerObj.name,
                        admin_email: this.registerObj.email,
                        admin_password: this.registerObj.pass,
                        admin_sagra: sessionStorage.getItem('Sagranav'),
                        confirm_link: "http://" + window.location.hostname + "/admin/confirm/?email=" + this.registerObj.email + "&id=" + sessionStorage.getItem('SagraId')
                    }
                    console.log(data)
                    await axios.post("/mail/registrazione/", data)
                    this.showQuickVue = true
                }
            }
        }
    },

    components: { QuickViewRegister }

};
</script>


<style scoped>
.register-container {
    padding: 2rem 9%;
}

.register-container .register-form-container {
    background: #fff;

}

.register-container .register-form-container form {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
    max-width: 70rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
}

.register-container .register-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.register-container .register-form-container form .form-control {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border-color: black;
}

.register-container .register-form-container form label {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 0;
}

.register-container .register-form-container form span {
    font-size: 18px;
    padding-left: 5px;
    padding-right: 40px;
}

.register-container .register-form-container form .btn {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

.register-container .register-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.register-container .register-form-container form p a {
    color: #27ae60;
}

.register-container .register-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.register-container .register-form-container form .form-group {
    margin: 0;
}

.register-container .register-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}

.register-container .register-form-container form .error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, .2);
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.register-container .register-form-container form .error-box ul {
    margin: 0;
    padding: 10px 0px;
}

.register-container .register-form-container form .error-box ul li {
    padding: 5px 10px;
    list-style-type: square;
    color: black;
}
</style>
