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
                    <select name="IdSagra" id="IdSagra" class="form-control">
                       <option v-for="sagra in sagre" :key="sagra" :value="sagra">{{ sagra }}</option>
                    </select>
                    <input type="text" name="uIdSagra" :placeholder="ConfirmObj.id_sagra" id="uIdSagra" class="form-control"
                        v-model="ConfirmObj.id_sagra" />
                </div>

                <div class="form-group">
                    <label for="uauthlevel">Autorizzaizione:
                    </label>
                    <input type="number" name="uauthlevel" :placeholder="ConfirmObj.authlevel" id="uauthlevel"
                        class="form-control" min="0" max="9" v-model="ConfirmObj.authlevel" />
                </div>

                <div class="form-group">
                    <input type="submit" value="Conferma" class="btn" />
                </div>
            </form>
        </div>
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
export default {
    name: "Confirm",

    data() {
        return {
            ConfirmObj: { name: "", email: "", pass: "", id_sagra: "", authlevel: "" },
            sagre: [],
            errors: [],
            showQuickVue: false,
            Isuser: true,
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

            let sagredata = await axios.get('/sagra')
            sagredata.data.forEach(element => {
                this.sagre.push(element.descrizione)          
            });

            console.log(this.sagre)
        },

        async checkForm() {
            this.errors = [];

            // Authlevel
            if (!/[0-9]{1}$/.test(this.ConfirmObj.authlevel)) {
                this.errors.push("L'autorizzazione deve essere un numero");
            }
        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();
                let data = await axios.get('/users/' + this.ConfirmObj.email);
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
                        user_email: this.ConfirmObj.email,
                        user_password: this.ConfirmObj.pass,
                        id_sagra: sessionStorage.getItem('SagraId'),
                        user_name: this.ConfirmObj.name,
                        authlevel: "0",
                        user_confirm: "0"
                    }
                    await axios.post("/users/", data);
                    this.showQuickVue = true
                }
            }
        }
    },
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
