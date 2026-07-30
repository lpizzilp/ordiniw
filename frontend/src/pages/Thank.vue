<template>
    <div class="thank-container">
        <h1> Grazie!</h1>
        <span v-if="prenotazione === false">Utilizza il codice per pagare il tuo ordine</span>
        <span v-else>Il tuo codice prenotazione</span>
        <template style="display: flex; justify-content: center; align-items: center;">
            <div v-if="prenotazione" class="dot" style="width: 11.5rem; height: 11.5rem; font-size: 8rem; background-color: #27ae60; color: white; line-height: 60%;">
                P
            </div>
            <div class="dot">
                {{ NumId }}
            </div>
        </template>

        <div class="thank-letter">
            <p v-if="prenotazione === false">Abbiamo inserito l'ordine provvisorio<br>
                Utilizza il codice per confermare l'ordine in cassa.
            </p>
            <p v-else>Abbiamo inserito la prenotazione<br>
                Ricordati di mostrare il codice alla cassa.
            </p>
            <div class="end-button">
                <button v-if="!wasQuickshow" class="btn opt" @click="Btnclick('E')" style="margin-top: 2vh;">Ricordamelo con un
                    Email</button><br>
                <button v-if="!wasQuickshow" class="btn opt" @click="handleChildEvent('screenshot')" style="margin-bottom:2vh">Fai uno screenshot</button>
                <router-link v-else-if="wasQuickshow && !prenotazione" to="/contaprezzi" class="btn" style="background-color: #E5C000;">Dividi la spesa</router-link>
                <p>Oppure</p>
                <button v-if="!wasQuickshow" class="btn opt" @click="Btnclick('H')" style="background-color: #f38304;"  onmouseover="this.style.background='#27ae60';" onmouseout="this.style.background='#f38304';">Torna alla Home</button>
                <router-link v-else to="/" class="btn opt" >Torna alla Home</router-link>
            </div>
        </div>

        <QuickViewFinal v-if="showQuickView" @childEvent="handleChildEvent" :parentData="from" :parentId="NumId"
            :Ncoperti="Ncoperti">
        </QuickViewFinal>
        <div v-if="activateScreenshot" data-html2canvas-ignore class="screenshotpannel"></div>
    </div>
</template>


<script>
import QuickViewFinal from "@/components/QuickViewFinal.vue";
import html2canvas from "html2canvas";
export default {
    name: 'Thank',

    data() {
        let artprenotabile
        sessionStorage.getItem('filtro') ? artprenotabile = true : artprenotabile = false

        return {
            NumId: 0,
            from: undefined,
            showQuickView: false,
            prenotazione: artprenotabile,
            Ncoperti: null,
            wasQuickshow: false,
            activateScreenshot: false
        }
    },

    created() {
        this.NumId = parseInt(sessionStorage.getItem('Bill'))
        this.Ncoperti = parseInt(sessionStorage.getItem('Coperti'))
    },


    beforeUnmount() {
        sessionStorage.removeItem('MatchUser')
        sessionStorage.removeItem('Username')
        sessionStorage.removeItem('TipoOrdine')
        sessionStorage.removeItem('filtro')
    },

    methods: {
        Btnclick(click) {
            this.from = click
            this.showQuickView = true
        },

        handleChildEvent(dataFromChild) {
            this.showQuickView = false
            this.wasQuickshow = dataFromChild === 'annulla' ? false : true
            if (dataFromChild === 'screenshot') {
                this.doScreenshot();
            }
        },

        doScreenshot(){
            scrollTo(0, 0);
            this.activateScreenshot = true;
            html2canvas(document.body, {
                useCORS: true,
                logging: true,
                scrollX: 0,
                scrollY: 0,
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'NumeroOrdine.png';
                link.href = canvas.toDataURL();
                link.click();
            });
            setTimeout(() => {
                this.activateScreenshot = false;
            }, 1000);
        },
    },

    components: {
        QuickViewFinal
    }

};
</script>

<style>
.thank-container {
    background: #f5f5f5;
    text-align: center;
    padding-bottom: 5vh;
}

.thank-container h1 {
    text-align: center;
    padding-top: 3vh;
    font-family: 'Satisfy', cursive;
    font-size: 5rem;
    color: #27ae60;

}

.thank-container span {
    font-size: 3rem;
    color: #0d074f;
    padding-top: 1rem;
}

.dot {
    background: #fff;
    margin: 3vh 0px;
    padding: 3.5vh;
    width: 22.5rem;
    height: 22.5rem;
    border-radius: 50%;
    font-size: 10rem;
    text-align: center;
}


.thank-letter {
    font-size: 20px;
    text-align: center;
}

.end-button {
    display: inline;
}

.opt {
    text-align: center;
    margin-top: 1vh;
    margin-bottom: 2vh;
    cursor: pointer;
}

.screenshotpannel{
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
}

.screenshotpannel::after {
  content: "";
  position: absolute;
  inset: 0;
  background: black;
  opacity: 0;
  animation: darkEffect 1s ease-in-out;
}

@keyframes darkEffect {
  0%, 100% {
    opacity: 0;
  }

  50% {
    opacity: 0.7;
  }
}

@media (max-width: 768px) {

    .thank-letter {
        margin-left: 3vh;
        margin-right: 3vh;
        font-size: 20px;
        text-align: center;
    }
}

@media (max-width: 576px) {

    .thank-container {
        text-align: center;
        padding-left: 1vh;
        padding-right: 1vh;
    }


    .thank-letter {
        font-size: 16px;
        text-align: center;
    }

    .opt {
        font-size: 16px;
        text-align: center;
        margin-top: 1vh;
        margin-bottom: 2vh;
        cursor: pointer;
    }
}
</style>