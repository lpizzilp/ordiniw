<template>
    <div class="quick-view">
        <div class="quick-view-inner">
            <h2>Opsss...</h2><br>
            <h3>Qualcosa è andato storto!!! Per favore Riprova...<br>Se
                l'errore dovesse persistere inviaci una Segnalazione.
                <slot></slot>
            </h3>
            <div>
                <button  @click="Azione()" style=" background-color: #27ae60;" class="btn" >Riprova</button>
               <RouterLink to="/segnalazioni" class="btn">Segnala errore</RouterLink>
            </div>
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
    methods: {
        Azione() {
            this.$emit('childError', false);

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
    width: 40vw;
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
    width: 100%;
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
