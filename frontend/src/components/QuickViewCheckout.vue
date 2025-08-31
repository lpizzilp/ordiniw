<template>
    <div class="quick-view">
        <div v-if="Cancelled == false" class="quick-view-inner">
            <h2>Sei sicuro?</h2><br>
            <h3> Vuoi cancellare l'ordine? <br><br>
                Se hai cambiato idea puoi anche modificare l'ordine senza doverne fare uno nuovo
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent('P')" style="margin-right: 5%;">Prosegui</button>
            <button class="btn" @click="DataParent('M')" style="margin-right: 5%;">Modifica</button>
            <button class="btn" @click="DataParent('C')" style="width: 100%;">Cancella</button>
        </div>
        <div v-else class="quick-view-inner">
            <h2>Articoli cancellati</h2><br>
            <h3>Reindirizazione alla pagina home
                <slot></slot>
            </h3>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "QuickView",

    data() {
        return {
            Cancelled: false,
            timer: 2
        }
    },

    beforeUnmount() {
        clearInterval(this.timerInterval);
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },

    methods: {
        async DataParent(where) {
            if (where === 'P') {
                this.$emit('childEvent', false);
            } else if (where === 'M') {
                this.$router.push("/cart");
            } else if (where === 'C') {
                await axios.delete("/cartItem/" + sessionStorage.getItem('Username'));
                this.Cancelled = true
                this.startTimer()
            }
        },


        startTimer() {
            // Decrementa il timer ogni secondo
            sessionStorage.removeItem('Username')
            sessionStorage.removeItem('MatchUser')
            this.timerInterval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    // Quando il timer raggiunge zero, ferma l'intervallo e reindirizza alla pagina home
                    clearInterval(this.timerInterval);
                    this.$router.push("/");
                }
            }, 1000);
        },
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
    cursor: pointer;
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
        cursor: pointer;
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
        cursor: pointer;
    }

}
</style>