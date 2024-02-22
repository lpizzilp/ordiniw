<template>
    <div class="quick-view">
        <div class="quick-view-inner">
            <h2>Errore</h2><br>
            <h3>L'esecuzione di questo comando è andata in errore ti consigliamo di aggiornare la pagina e riprovare<br>Se
                l'errore dovesse persistere segnalalo con l'apposito bottono qui sotto
                <slot></slot>
            </h3>
           <RouterLink to="/segnalazioni" class="btn">Segnala errore</RouterLink>
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
    width: 70vw;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
}


.quick-view .quick-view-inner h2 {
    text-align: center;
    font-size: 35px;
    color: #f32009e3;
}

.quick-view .quick-view-inner h3 {
    text-align: center;
    text-transform: none;
    font-size: 22px;
    color: #000000ae;
}

.quick-view .quick-view-inner .btn {
    font-size: 18px;
    margin-top: 5vh;
    margin-bottom: 10px;
    margin-left: 25%;
    width: 50%;
    background-color: #f38609;
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
        margin: 0;
        margin-top: 5px;
        margin-bottom: 7px;
        width: 100%;
    }
}

@media (max-width: 576px) {
    .quick-view .quick-view-inner {
        width: 90vw;
    }

    .quick-view .quick-view-inner .btn {
        font-size: 16px;
        margin: 0;
        margin-top: 25px;
        margin-bottom: 5px;
        width: 100%;
    }

}
</style>
