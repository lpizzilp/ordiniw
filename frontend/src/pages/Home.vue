<template>
    <div>
        <div class="home-main">
            <div class="content">
                <span>Benvenuti {{ sagra_name }}!</span>
                <h3>Ordina i nostri gustosi piatti😋</h3>
                <p>Ordina online, paga alla cassa e aspetta comodamente al tavolo.</p>
                <button @click="handleSubmit('')" class="btn" style="margin-bottom: 10px;">Inizia a
                    Ordinare</button><br>
                <span v-if="Btn[2] == 1" style="padding-left: 30px;">oppure</span><br>
                <button v-if="Btn[2] == 1" @click="handleSubmit('PRE')" class="btn"
                    style="margin-top: 10px; margin-bottom: 10px;">Prenota
                    Evento / Specialità</button><br>
                <span v-if="Btn[3] == 1 || Btn[5] == 1" style="padding-left: 30px;">oppure</span><br>
                <button @click="handleSubmit('TAB')" v-if="Btn[3] == 1 || Btn[5] == 1" class="btn"
                    style="margin-top: 10px; margin-bottom: 10px;">Tabellone
                    Eliminacode
                </button><br>
                <span v-if="linksito[0] != null" style="padding-left: 30px;">Nel frattempo</span><br>
                <a v-if="linksito[0] != null" :href="Btn[8]" target="_blank" class="btn"
                    style="margin-top: 10px;">Visita il
                    nostro sito
                </a>
            </div>
            <div class="image">
                <img src="../assets/images/Homechef.png" alt="" class="home-img">
                <!-- <img src="../assets/images/a.png" alt="" class="home-parallax-img">-->
            </div>
        </div>


        <!--<div class="home-category">
            <button @click="handleSubmit('P')" class="box">
                <img src="../assets/images/pasta-img.png" alt="">
                <h3>Primi</h3>
            </button>

            <button @click="handleSubmit('C')" class="box">
                <img src="../assets/images/grigliata-img.png" alt="">
                <h3>Cucina</h3>
            </button>

            <button @click="handleSubmit('B')" class="box">
                <img src="../assets/images/coca-img.png" alt="">
                <h3>Bevande</h3>
            </button>
        </div>-->

        <div class="home-about">

            <div class="tabelloni">
                <div v-if="Btn[3] == 1" class="eliminacode">
                    <span>Eliminacode</span>
                    <div class="display" @click="handleSubmit('TAB')">
                        <sevenSegmentDisplay :value="Display[0][0]" :rounded="true" :segment-width="50"
                            :segment-height="7" on-color="#f00" off-color="transparent" />
                        <sevenSegmentDisplay v-if="Display[0][1] != undefined" style="margin-left: 15px;"
                            :value="Display[0][1]" :rounded="true" :segment-width="50" :segment-height="7"
                            on-color="#f00" off-color="transparent" />
                        <sevenSegmentDisplay v-if="Display[0][2] != undefined" style="margin-left: 15px;"
                            :value="Display[0][2]" :rounded="true" :segment-width="50" :segment-height="7"
                            on-color="#f00" off-color="transparent" />
                    </div>
                </div>
                <div v-if="Btn[5] == 1" class="info">
                    <span>Tabellone Info</span>
                    <div class="display" @click="handleSubmit('TAB')">
                        <p v-html="Display[1]"></p>
                    </div>
                </div>

                <div class="content">
                    <p v-if='Btn[3] == 1'>Clicca il bottone sottostante per aggiornare l'eliminacode</p>
                    <p v-if='Btn[5] == 1'>Clicca il bottone sottostante per aggiornare il tabellone.</p>
                    <button class="btn" @click="UpdateTab('TAB')" style="padding: 1.5rem;" :disabled="BtnUpData[0]"><i
                            class="fa-solid fa-retweet" style="margin-right: 5px;"></i>{{ BtnUpData[1] }}</button><br>
                    <!--<button v-if='Btn[3] == 1 && IsIphone == false && Active == true' class="btn" @click="ShowAvviso()"
                        style="padding: 1rem; margin-top: 3vh; margin-bottom: 3vh;"><i class="fa-solid fa-bell"
                            style="padding-right: 2vh;"></i>Avvisami al mio turno</button>
                        <button v-if='Btn[3] == 1 && IsIphone == false && Active == false' class="btn" @click="ShowAvviso()"
                        style="padding: 1rem; margin-top: 3vh; margin-bottom: 3vh;" disabled><i class="fa-solid fa-bell"
                            style="padding-right: 2vh;"></i>Avvisami al mio turno</button>-->
                </div>
            </div>
        </div>
        <QuickViewHome v-if="showQuickVue" @childEvent="handleChildEvent" :Categoria="Category" :BtnAttivi="TypeMess">
        </QuickViewHome>
        <QuickViewErrore v-if="errore"></QuickViewErrore>
        <QuickViewEliminacode v-if="showQuickVueEliminacode" :-whatshow="Showeliminacode"
            :-initial-num="+Display[0].join('')" @CloseError="handleCloseError" @childEvent="handleEliminacode">
        </QuickViewEliminacode>
    </div>
</template>

<script>
import axios from "axios";
import AvvisoCoda from "@/assets/sound/suono.mp3"
import { UAParser } from 'ua-parser-js';
import uniqid from 'uniqid';
import QuickViewEliminacode from "@/components/QuickViewEliminacode.vue";
import QuickViewErrore from "@/components/QuickViewErrore.vue";
import QuickViewHome from "@/components/QuickViewHome.vue";
import sevenSegmentDisplay from "@/components/seven-segment-display.vue";
export default {
    name: "Home",
    inject: ["eventBus"],

    data() {
        return {
            loginObj: { email: "exemple.exemple@gmail.com", pass: "Utente1" },
            matchUser: undefined,
            errors: [],
            showQuickVue: false,
            showQuickVueEliminacode: false,
            Category: undefined,
            sagra_name: "",
            Btn: [],
            TypeMess: [],
            linksito: [null, null],
            Display: [[]],
            BtnUpData: [false, 'Attesa aggiornamento'],
            timer: 30,
            togleTab: false,
            errore: false,
            Showeliminacode: true,
            IsIphone: false,
            Active: true
        };
    },

    created() {
        sessionStorage.removeItem('Bill')
        sessionStorage.removeItem('Coperti')
        this.getsagra();
        this.eventBus.on("loadBottoniHome", () => {
            this.getsagra();
        });
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getsagra() {
            this.sagra_name = sessionStorage.getItem('SiglaHome')
            if (this.sagra_name != undefined || null) {
                this.Btn = sessionStorage.getItem('SagraBottoni').split("µ")
                this.Btn[8] == 0 ? this.linksito = [null, null] : this.linksito = [1, this.Btn[8]]
                sessionStorage.setItem('startprt', this.Btn[7])
                this.Display[0] = this.Btn[4].split('')
                this.Display[1] = this.Btn[6]
            }
        },


        handleCloseError() {
            this.showQuickVueEliminacode = false
        },

        async handleChildEvent(type) {
            this.showQuickVue = type.vis
            if (type.mode != '') {
                this.errors = [];
                var idR = uniqid()
                console.log(idR)
                let datareg = {
                    user_id: idR,
                    user_email: this.loginObj.email,
                    user_password: this.loginObj.pass,
                };
                this.matchUser = datareg;
                sessionStorage.setItem('Username', this.matchUser.user_id);
                sessionStorage.setItem('MatchUser', this.matchUser);
                sessionStorage.setItem('filtro', type.category);
                this.$router.push("/menu");
            }
        },

        async handleEliminacode(data) {
            if (data.tipo == 'Annulla') {
                this.showQuickVueEliminacode = false
            } else {
                this.showQuickVueEliminacode = false
                this.Active = false
                await this.Faimedia(data.numero)
            }
        },


        async Faimedia(Ncliente) {
            var sagra = await axios.get('/sagra/' + sessionStorage.getItem('SagraId'))
            let Ninizio = +sagra.data[0].numcoda
            let Nintotminuti = null
            let Ncorrente = null
            let Nmancanti = null
            let Timpiegato = null
            const Tinizio = 120000 // 2 secondi in millisecondi
            const Tavviso = 300000 // 5 minuti in millisecondi
            const Tnoneseguibile = Tavviso
            await new Promise(resolve => {
                setTimeout(async () => {
                    try {
                        const sagra = await axios.get('/sagra/' + sessionStorage.getItem('SagraId'));
                        this.Numeroritardato(sagra.data[0].numcoda.toString())
                        Ncorrente = +sagra.data[0].numcoda
                        Nintotminuti = Ncorrente - Ninizio
                        Nmancanti = Ncliente - Ncorrente
                        Timpiegato = (Tinizio * Nmancanti) / Nintotminuti
                        if (+Timpiegato <= Tnoneseguibile) {
                            this.serviceWorker(Ncorrente)
                        } else {
                            this.RipetiMedia(Ninizio, Ncliente, Timpiegato, Tinizio, Tavviso)
                        }
                        resolve();
                    } catch (error) {
                        console.error("Errore durante la richiesta Axios:", error);
                        resolve(); // Assicura che la Promise venga sempre risolta, anche in caso di errore
                    }
                }, Tinizio);
            });
        },

        async RipetiMedia(Ninizio, Ncliente, Timpiegato, Tinizio, Tavviso) {
            let Nintotminuti = null
            let Ncorrente = null
            let Nmancanti = null
            await new Promise(resolve => {
                setTimeout(async () => {
                    try {
                        const sagra = await axios.get('/sagra/' + sessionStorage.getItem('SagraId'));
                        this.Numeroritardato(sagra.data[0].numcoda.toString())
                        Ncorrente = +sagra.data[0].numcoda
                        Nintotminuti = Ncorrente - Ninizio
                        Nmancanti = Ncliente - Ncorrente
                        Timpiegato = (Tinizio * Nmancanti) / Nintotminuti
                        if (+Timpiegato <= Tavviso) {
                            this.serviceWorker(Ncorrente)
                        } else {
                            this.RipetiMedia(Ninizio, Ncliente, Timpiegato, Tinizio, Tavviso)
                        }
                        resolve();
                    } catch (error) {
                        console.error("Errore durante la richiesta Axios:", error);
                        resolve();
                    }
                }, (Timpiegato / 2));
            });

        },

        serviceWorker(Ncorrente) {
            // Registrare il Service Worker utilizzando il percorso relativo
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('service.js')
                    .then(function (registration) {
                        registration.active.postMessage({
                            action: 'showNotification',
                            parametro: Ncorrente
                        });
                        const Isaudio = !!window.Audio
                        if (Isaudio) {
                            const audio = new Audio(AvvisoCoda);
                            audio.play();
                        }
                        if (navigator.vibrate) {
                            const pattern = [500, 200, 500, 200, 500]
                            navigator.vibrate(pattern);
                        }
                    })
                    .catch(function (error) {
                        console.error('Errore durante la registrazione del Service Worker:', error);
                    });
            }
        },


        UpdateTab(type) {
            this.togleTab = false
            this.handleSubmit(type)
        },

        ShowAvviso() {
            this.showQuickVueEliminacode = true
            this.Showeliminacode = 10
        },

        // Punto dove inserisce user
        async handleSubmit(type) {
            this.TypeMess = []
            let div = document.getElementsByClassName('tabelloni')
            var sagra = await axios.get('/sagra/' + sessionStorage.getItem('SagraId'))
            let response = sagra.request.response
            if (response.includes("{\"code\"")) {
                this.errore = true
                this.Makelog(response);
            }
            switch (type) {
                case 'TAB':
                    if (!this.togleTab) {
                        this.togleTab = true
                        this.linksito[0] = null
                        div[0].style.display = 'block'
                        if (sagra.data[0].flgEliminacode == 1) {
                            this.Btn[3] = 1
                            this.Btn[5] = 0
                            const parser = new UAParser();
                            let UAresult = parser.getResult();
                            if (UAresult.os == 'iOS' || UAresult.device.vendor == 'Apple') {
                                this.IsIphone = true
                            } else {
                                this.IsIphone = false
                            }
                            this.Numeroritardato(sagra.data[0].numcoda.toString())
                        } else if (sagra.data[0].flgInfo == 1) {
                            this.Btn[5] = 1
                            this.Btn[3] = 0
                            this.Display[1] = sagra.data[0].info.replace(/\r\n/g, '<br>');
                        }
                        this.AttesaUpdate();
                    } else {
                        this.togleTab = false
                        div[0].style.display = 'none'
                        this.linksito[1] == null ? this.linksito[0] = null : this.linksito[0] = 1
                    }
                    break;

                case 'PRE':
                    if (sagra.data[0].flgPrenotazioni == 1) {
                        this.Btn[2] = sagra.data[0].StrOrdini.substring(3, 4) == "" ? 1 : sagra.data[0].StrOrdini.substring(3, 4)
                    }
                    if (this.Btn[2] == 1) {
                        var data = {
                            vis: false,
                            category: type
                        }
                        sessionStorage.setItem('TipoOrdine', 'W');
                        this.handleChildEvent(data)
                    } else {
                        this.TypeMess[2] = 'click'
                        this.TypeMess[1] = false
                        this.TypeMess[0] = false
                        this.Btn[0] = this.Btn[1] = 0
                        this.showQuickVue = true
                    }
                    break;

                default:
                    div[0].style.display = 'none'
                    var ordini = [sagra.data[0].flgTavoli, sagra.data[0].flgAsporto]
                    if (ordini[0] == 1) {
                        this.Btn[0] = sagra.data[0].StrOrdini.substring(1, 2) == "" ? 1 : sagra.data[0].StrOrdini.substring(1, 2)
                        this.TypeMess[0] = this.Btn[0] == 1 ? true : false
                        this.TypeMess[0] = this.Btn[0] == 1 ? true : false
                    }
                    if (ordini[1] == 1) {
                        this.Btn[1] = sagra.data[0].StrOrdini.substring(2, 3) == "" ? 1 : sagra.data[0].StrOrdini.substring(2, 3)
                        this.TypeMess[1] = this.Btn[1] == 1 ? true : false
                    }
                    this.TypeMess[2] = false
                    this.Category = type
                    this.showQuickVue = true
                    break;
            }
        },


        async Numeroritardato(numero) {
            let num = '---'
            this.Display[0] = num.split('')
            setTimeout(() => {
                let num = numero
                this.Display[0] = num.split('')
            }, 1500);
        },

        async AttesaUpdate() {
            this.BtnUpData[0] = true
            this.BtnUpData[1] = 'Puoi riprovare tra 30s'
            setTimeout(() => {
                this.BtnUpData[0] = false
                this.BtnUpData[1] = 'Aggiorna'
            }, 30000);
        },

        async Makelog(err) {
            let data = {
                mode: 'err',
                arg: err
            }
            await axios.post('/log', data)
        },
    },
    components: { QuickViewHome, sevenSegmentDisplay, QuickViewErrore, QuickViewEliminacode }
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

.home-main .content a {
    color: white;
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

/* home about */

.home-about {
    align-items: center;
    background: #f7f7f7;
}

.home-about .tabelloni {
    display: none;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    padding: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: #27ae60;
}

.home-about .tabelloni span {
    font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: #27ae60;
}

.home-about .tabelloni .display {
    margin: 1rem;
    padding: 2rem;
    background-color: #000000;
    border-style: outset;
    border-width: 1px;
    border-radius: 10px;
    border-color: #27ae60;
}

.home-about .tabelloni .display p {
    padding: 1rem 0;
    line-height: 2;
    font-size: 2rem;
    color: #fff;
    text-transform: none;
}

.home-about .content p {
    font-size: 1.8rem;
    text-transform: none;
    color: #000000a8;
    line-height: 1.5;
    padding: 1rem 0;
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
