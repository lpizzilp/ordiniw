<template>
    <div class="thank-container">
        <h1> Grazie!</h1>
        <span>Utilizza il codice pagare il tuo ordine</span>

        <div class="dot">
            {{ NumId }}
        </div>

        <div class="thank-letter">
            <p>Abbiamo inserito l'ordine provvisorio<br>
                Utilizza il codice per confermare l'ordine in cassa.
            </p>
            <div class="end-button">
                <button class="btn opt" @click="Btnclick('E')" style="margin-top: 2vh;">Ricordamelo con un Email</button>
                <p>Oppure</p>
                <button class="btn opt" @click="Btnclick('H')">Torna alla Home</button>
            </div>
        </div>

        <QuickViewFinal v-if="showQuickView" @childEvent="handleChildEvent" :parentData="from" :parentId="NumId">
        </QuickViewFinal>
    </div>
</template>


<script>
import QuickViewFinal from "@/components/QuickViewFinal.vue";
export default {
    name: 'Thank',

    data() {
        return {
            NumId: 0,
            from: undefined,
            showQuickView: false
        }
    },

    created() {
        this.NumId = parseInt(sessionStorage.getItem('Bill'))
    },


    beforeUnmount() {
        sessionStorage.removeItem('MatchUser')
        sessionStorage.removeItem('Username')
        sessionStorage.removeItem('Type')
        sessionStorage.removeItem('Bill')
    },

    methods: {
        Btnclick(click) {
            this.from = click
            this.showQuickView = true
        },

        handleChildEvent(dataFromChild) {
            this.showQuickView = dataFromChild
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
    margin: 3vh auto;
    padding: 5vh;
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
    }
}
</style>