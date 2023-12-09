<template>
    <div class="quick-view">
        <div v-if="from === 'H'" class="quick-view-inner">
            <h2>Sei sicuro?</h2><br>
            <h3>Il codice è essenziale per effettuare il pagamento. Ti consigliamo di farti
                inviare un email o in alternativa di fare uno screenshot.
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent('I')" style="margin-right: 5%;">Indietro</button>
            <button class="btn" @click="DataParent('E')" style="margin-left: 5%;">Invia email</button>
            <button class="btn" @click="DataParent('H')" style="width: 100%;">Torna alla home</button>
        </div>
        <div v-else class="quick-view-inner">
            <h2>Invio Email</h2><br>
            <h3>Inserisci la tua Email
                <slot></slot>
            </h3>
            <form action="process.php" method="post">
                <input class="email" type="email" id="email" name="email" placeholder="Inserisci la tua email" required>
                <button class="btn" type="submit" style="width: 100%;">Invia</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "QuickView",
    data() {
        return {
            from: 'H'
        };
    },
    props: {
        parentData: String,
    },

    created() {
        this.from = this.parentData
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },
    methods: {
        async DataParent(where) {
            if (where === 'E') {
                this.from = 'E'
            } else if (where === 'I') {
                this.$emit('childEvent', false);
            } else if (where === 'H') {
                this.$router.push("/");
            }
        }
    },
};
</script>

<style scoped>
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.quick-view .quick-view-inner {
    width: 30vw;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
}


.quick-view .quick-view-inner h2 {
    text-align: center;
    font-size: 35px;
    color: #f38304;
}

.quick-view .quick-view-inner h3 {
    text-align: center;
    font-size: 22px;
    color: #000000ae;
}

.quick-view .quick-view-inner .btn {
    font-size: 18px;
    margin-top: 5vh;
    margin-bottom: 10px;
    width: 45%;
}

.email {
    text-align: center;
    font-size: large;
    padding: 3vh;
    height: 20px;
    margin: 2vh;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
}

@media (max-width: 768px) {

    .quick-view .quick-view-inner {
        width: 60vw;

    }

    .quick-view .quick-view-inner h2 {
        font-size: 28px;
    }

    .quick-view .quick-view-inner h3 {
        text-align: center;
        font-size: 20px;
    }



    .quick-view .quick-view-inner .btn {
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 7px;
    }
}

@media (max-width: 576px) {
    .quick-view .quick-view-inner {
        width: 90vw;
    }

    .quick-view .quick-view-inner .btn {
        font-size: 16px;
        margin-top: 25px;
        margin-bottom: 5px;
    }

}
</style>