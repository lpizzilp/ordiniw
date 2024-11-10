<template>
    <div v-if="Ute === true" class="quick-view">
        <div class="quick-view-inner">
            <h2>Utente Confermato</h2><br>
            <h3>é stata inviata un email al nuovo amministratore per avvisarlo che il suo utente è appena stato confermato
                <slot></slot>
            </h3>
            <RouterLink to="/" class="btn">Continua</RouterLink>
        </div>
    </div>

    <div v-else class="quick-view">
        <div class="quick-view-inner">
            <h2>Utente Rifiutato</h2><br>
            <h3>è stata inivata un email all'utente per informarlo che non potra usare il suo utente da amministratore
                <slot></slot>
            </h3>
            <RouterLink to="/" class="btn">Continua</RouterLink>
        </div>
    </div>
</template>

<script>
export default {
    name: "QuickView",

    data() {
        return {
        }
    },

    props: {
        Ute: Boolean
    },

    scrollToTop() {
        window.scrollTo(0, 0);
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
    color: #f38609;
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
    width: 100%;
}

@media (max-width: 768px) {

    .quick-view .quick-view-inner {
        width: 50vw;

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
