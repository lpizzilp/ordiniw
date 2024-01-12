<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Conferma l'account</h3>

                <div v-if="errors.length != 0" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="uName">Nome completo:
                    </label>
                    <input type="text" name="uName" readonly :placeholder="ConfirmObj.name" id="uName" class="form-control"
                        v-model="ConfirmObj.name" style="background-color: rgba(0, 0, 0, 0.5); color: whitesmoke;" />
                </div>

                <div class="form-group">
                    <label for="uEmail">Email:
                    </label>
                    <input type="email" name="uEmail" readonly :placeholder="ConfirmObj.email" id="uEmail"
                        class="form-control" v-model="ConfirmObj.email"
                        style="background-color: rgba(0, 0, 0, 0.5); color: whitesmoke;" />
                </div>

                <div class="form-group">
                    <label for="uPass">Password:
                    </label>
                    <input type="password" name="uPass" readonly :placeholder="ConfirmObj.pass" id="uPass"
                        class="form-control" v-model="ConfirmObj.pass"
                        style="background-color: rgba(0, 0, 0, 0.5); color: whitesmoke;" />
                </div>

                <div class="form-group">
                    <label for="uIdSagra">Sagra:
                    </label>
                    <select name="uIdSagra" id="uIdSagra" v-model="ConfirmObj.id_sagra" class="form-select">
                        <option v-for="sagra in descsagre" :key="sagra" :value="sagra">{{ sagra }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="uauthlevel">Autorizzazione:
                    </label>
                    <input type="number" name="uauthlevel" :placeholder="ConfirmObj.authlevel" id="uauthlevel"
                        class="form-control" min="0" max="9" v-model="ConfirmObj.authlevel" />
                </div>

                <div class="form-group">
                    <input type="submit" value="Conferma" class="btn" />
                    <input type="reset" value="Rifiuta" style="background-color: #f38609;" @click="handereject()"
                        class="btn" />
                </div>
            </form>
        </div>
        <QuickViewConfirm v-if="showQuickVue" :-ute="QuickView_ute"></QuickViewConfirm>
    </div>
</template>

<script>
var queryString = window.location.search;
queryString = queryString.substring(1);
var parametri = queryString.split("&");
var parametriObj = {};
for (var i = 0; i < parametri.length; i++) {
    var coppia = parametri[i].split("=");
    parametriObj[coppia[0]] = coppia[1];
}

import axios from 'axios';
import QuickViewConfirm from '@/components/QuickViewConfirm.vue';
export default {
    name: "Confirm",

    data() {
        return {
            ConfirmObj: { name: "", email: "", pass: "", id_sagra: "", authlevel: "" },
            descsagre: [],
            idsagre: [],
            errors: [],
            showQuickVue: false,
            QuickView_ute: true
        }
    },

    created() {
        this.getuser();
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getuser() {
            let Adminuser = await axios.get('/users/' + parametriObj.email);
            let Sagra = await axios.get('/sagra/' + parametriObj.id)
            this.ConfirmObj.name = Adminuser.data.user_name
            this.ConfirmObj.email = Adminuser.data.user_email
            this.ConfirmObj.pass = Adminuser.data.user_password
            this.ConfirmObj.id_sagra = Sagra.data[0].descrizione
            this.ConfirmObj.authlevel = Adminuser.data.authlevel

            let sagredata = await axios.get('/sagra/ute/' + parametriObj.id)

            sagredata.data.forEach(element => {
                this.descsagre.push(element.descrizione)
                this.idsagre.push(element.id_sagra)
            });
        },

        async checkForm() {
            this.errors = [];

            // IdSagra
            if (!this.ConfirmObj.id_sagra) {
                this.errors.push("La sagra è obbligatoria");
                this.scrollToTop();
            }

            // Authlevel
            if (!/[0-9]{1}$/.test(this.ConfirmObj.authlevel)) {
                this.errors.push("L'autorizzazione deve essere un numero");
                this.scrollToTop();
            }
        },

        async handereject() {
           let data = {
                conferma: false,
                sagra_link: "http://" + window.location.hostname.toString()
            }
            await axios.post("/mail/confirm/", data)
            this.QuickView_ute = false
            this.showQuickVue = true
        },

        async handleSubmit(e) {
            this.checkForm();
            if (this.errors.length > 0) {
                e.preventDefault();
            } else {
                e.preventDefault();
                for (let i = 0; i < this.descsagre.length; i++) {
                    if (this.descsagre[i] == this.ConfirmObj.id_sagra) {
                        this.ConfirmObj.id_sagra = this.idsagre[i]
                        break;
                    }

                }
                let data = {
                    user_email: this.ConfirmObj.email,
                    id_sagra: this.ConfirmObj.id_sagra,
                    authlevel: this.ConfirmObj.authlevel,
                }
                await axios.put("/users/update/", data);
                
                data = {
                    conferma: true,
                    admin_link: "http://" + window.location.hostname.toString() + "/admin",
                    admin_email: this.ConfirmObj.email,
                    admin_password: this.ConfirmObj.pass,
                    sagra_link: "http://" + window.location.hostname.toString()
                }
                await axios.post("/mail/confirm/", data)
                this.QuickView_ute = true
                this.showQuickVue = true
            }
        }
    },

    components: { QuickViewConfirm }

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
    background: #f7f7f7;
    text-transform: none;
    width: 100%;
    border-color: black;
}

.register-container .register-form-container form .form-select {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    padding: 0.8rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    background: #f7f7f7;
    border: 2px inset black;
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
