<template>
    <div>
        <div class="home-main">
            <div class="content">
                <span>Benvenuti a vigonovo!</span>
                <h3>Ordina le nostre gustose pietanze 😋</h3>
                <p>Ordina online, paga alla cassa e aspetta comodamente al tavolo.</p>
                <button @click="handleSubmit('')" class="btn">Inizia a ordinare</button>
            </div>
            <div class="image">
                <img src="../assets/images/Homechef.png" alt="" class="home-img">
               <!-- <img src="../assets/images/a.png" alt="" class="home-parallax-img">-->
            </div>
        </div>


        <div class="home-category">
            <button @click="handleSubmit('pasta')" class="box">
                <img src="../assets/images/pasta-img.png" alt="">
                <h3>Pasta</h3>
            </button>

            <button @click="handleSubmit('carne')" class="box">
                <img src="../assets/images/grigliata-img.png" alt="">
                <h3>Carne</h3>
            </button>

            <button @click="handleSubmit('bevande')" class="box">
                <img src="../assets/images/coca-img.png" alt="">
                <h3>Bevande</h3>
            </button>
        </div>

        <div class="home-about">
            <div class="image">
                <img src="../assets/images/Riservato.png" alt="">
            </div>
            <div class="content">
                <span>Esagra, il gestionale sagre</span>
                <h3 class="title">Esagra, il gestionale sagre per tutte le esigenze</h3>
                <p>Cerchi un software completo ed efficente per gestire al meglio la tua sagra? Esagra è gestionale per feste paesane ed eventi che offrono al pubblico un servizio di ristorazione. È stato progettato all’insegna della massima flessibilità e semplicità d'utilizzo,in modo da adattarsi alle necessità della manifestazione. Nasce dall’esperienza diretta vissuta 
                    all’interno delle pro loco e non si limita a recepire le attuali esigenze ma propone attivamente nuovi ed efficienti processi di gestione.              
                </p>
                <a href="http://esagra.it" target="_blank" @click="scrollToTop()" class="btn">Scoprì di più</a>

               <!-- <div class="icons-container">
                    <div class="icons">
                        <img src="../assets/images/serv-2.png" alt="">
                        <h3>Ottimo cibo</h3>
                    </div>

                    <div class="icons">
                        <img src="../assets/images/serv-1.png" alt="">
                        <h3>Preparazione veloce</h3>
                    </div>

                    <div class="icons">
                        <img src="../assets/images/serv-3.png" alt="">
                        <h3>Qualità grantita</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-4.png" alt="">
                        <h3>Ottimo servizio</h3>
                    </div>
                </div>-->
            </div>
        </div>
        <QuickViewHome v-if="showQuickVue" @childEvent="handleChildEvent"></QuickViewHome>
    </div>
</template>

<script>
import axios from "axios";
import QuickViewHome from "@/components/QuickViewHome.vue";
import { mapMutations } from "vuex";

export default {
    name: "Home",
    data() {
        return {
            loginObj: { name: "", email: "exemple.exemple@gmail.com", phone: "+390000000000", pass: "Utente1", birth: "11223333", gen: "male" },
            matchUser: undefined,
            errors: [],
            showQuickVue: false
        };
    },
    methods: {
        ...mapMutations(["setUser"]),
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        handleChildEvent(){
            this.showQuickVue = false
            this.$router.push("/menu");
        },

        randomizza() {
            var numeriGenerati = new Set();
            // Funzione per generare un numero casuale unico
            function generaNumeroUnico() {
                var numeroCasuale = Math.floor(Math.random() * 999999999) + 1;
                if (numeriGenerati.has(numeroCasuale)) {
                    return generaNumeroUnico();
                }
                else {
                    numeriGenerati.add(numeroCasuale);
                    return numeroCasuale;
                }
            }
            var numeroUnico = generaNumeroUnico();
            return numeroUnico;
        },
        // Punto dove inserisce user
        async handleSubmit(type) {
            this.showQuickVue = true
            this.errors = [];
            console.log("passo handle");
            var idR = this.randomizza();
            this.loginObj.name = "Utente" + idR;
            let datareg = {
                user_id: idR,
                user_name: this.loginObj.name,
                user_email: this.loginObj.email,
                user_phone: this.loginObj.phone,
                user_password: this.loginObj.pass,
                user_birth: this.loginObj.birth,
                user_gender: this.loginObj.gen
            };
            await axios.post("/users/", datareg);
            let data = await axios.get('/users/' + this.loginObj.name);
            this.matchUser = data.data;
            if (!this.matchUser) {
                this.errors.push("Incorrect email or password!");
            }
            else {
                if (this.matchUser.user_password === this.loginObj.pass) {
                    this.matchUser.user_password = "";
                    this.setUser(this.matchUser);
                    sessionStorage.setItem('Username', this.matchUser.user_id);
                    sessionStorage.setItem('MatchUser', this.matchUser);
                    console.log(sessionStorage.getItem('Username'));
                    sessionStorage.setItem('filtro', type);
                }
            }
        },
    },
    components: { QuickViewHome }
};
</script>

<style scoped>
.home-main,
.home-about,
.home-banner,
.home-category {
    padding: 2rem 9%;
}

.home-main {
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    gap: 2rem;
    position: relative;
    overflow: hidden;
}

.home-main .content {
    flex: 1 1 41rem;
}

.home-main .content span {
    font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: #27ae60;
}

.home-main .content h3 {
    font-size: 4rem;
    color: #130f40;
    padding-top: 1rem;
}

.home-main .content p {
    font-size: 2rem;
    color: #000000a8;
    line-height: 1.5;
    padding: 1rem 0;
}

.home-main .image {
    flex: 1 1 41rem;
    margin: 2rem 0;
    pointer-events: none;
}

.home-main .image .home-img {
    width: 100%;
}

.home-main .home-parallax-img {
    position: absolute;
    top: -15rem;
    right: -15rem;
    width: 80vw;

}


/* home category */
.home-category {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1.5rem;
    padding-bottom: 5rem;
}

.home-category .box {
    padding: 2rem;
    text-align: center;
    border-radius: .5rem;
    background: #f7f7f7;
}

.home-category .box:hover {
    background: #f38609;
}

.home-category .box:hover h3 {
    color: #fff;
}

.home-category .box img {
    height: 7rem;
}

.home-category .box h3 {
    font-size: 1.8rem;
    color: #130f40;
}


/* home banner */
.home-banner .row-banner {
    background: url(../assets/images/row-banner.png) no-repeat;
    height: 45rem;
    background-size: cover;
    background-position: center;
    position: relative;
}

.home-banner .row-banner .content {
    position: absolute;
    top: 50%;
    left: 7%;
    transform: translateY(-50%);
}

.home-banner .row-banner .content span {
    font-family: 'Satisfy', cursive;
    font-size: 4rem;
    color: #27ae60;
    color: #130f40;
}

.home-banner .row-banner .content h3 {
    font-size: 6rem;
    color: red;
    text-transform: uppercase;
}

.home-banner .row-banner .content p {
    font-size: 2rem;
    padding-bottom: 1rem;
}


.home-banner .grid-banner .grid {
    border-radius: 1rem;
    overflow: hidden;
    height: 45rem;
}

.home-banner .grid-banner .grid:hover img {
    transform: scale(1.2);
}

.home-banner .grid-banner .grid img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.home-banner .grid-banner .grid .content {
    position: absolute;
    top: 2rem;
    padding: 0 2rem;
}

.home-banner .grid-banner .grid .content.center {
    text-align: center;
    width: 100%;
}

.home-banner .grid-banner .grid .content.center span {
    color: #666;
}

.home-banner .grid-banner .grid .content.center h3 {
    color: #130f40;
}

.home-banner .grid-banner .grid .content span {
    font-size: 2.5rem;
    color: #fff;
}

.home-banner .grid-banner .grid .content h3 {
    font-size: 3rem;
    color: #fff;
    padding-top: .5rem;
}

.home-about {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    background: #f7f7f7;
}

.home-about .image {
    flex: 1 1 40rem;
}

.home-about .image img {
    width: 100%;
}

.home-about .content {

    flex: 1 1 40rem;
}

.home-about .content span {
    font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: #27ae60;
}

.home-about .content .title {
    font-size: 3rem;
    padding-top: .5rem;
    color: #130f40;
}

.home-about .content p {
    padding: 1rem 0;
    line-height: 2;
    font-size: 2rem;
    color: #000000a8;
}

.home-about .content .icons-container {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.home-about .content .icons-container .icons {
    flex: 1 1 20rem;
    border-radius: .5rem;
    background: #fff;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.home-about .content .icons-container .icons h3 {
    font-size: 1.7rem;
    color: #130f40;
}

@media (max-width: 768px) {
    #menu-btn {
        display: inline-block;
    }

    .home-main .home-parallax-img {
        top: 0;
        right: 0;
        width: 100%;
    }

    .home-banner .grid-banner .content h3 {
        font-size: 15px !important;
    }

    .home-banner .grid-banner .content.center {
        padding-left: 0px !important;
    }

}

@media (max-width: 576px) {
    .home-main .content h3 {
        font-size: 3rem;
    }

    .home-main .content p {
        font-size: 2rem;
    }
}
</style>
