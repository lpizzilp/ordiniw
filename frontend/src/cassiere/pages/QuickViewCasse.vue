<template>
    <div class="quick-view">
        <div class="quick-view-inner">
            <h2>Scegli il tipo cassa</h2><br>
            <div class="container">
                <button class="btn" :style="{ 'background-color': c.bgcolore, 'color': c.txcolore }"
                    v-for="(c, index) in casseObj" :key="index" @click="DataParent(c.lettera)">
                    {{ c.nome }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
    name: "QuickView",

    data() {
        return {
            casseObj: []
        }
    },

    created() {
        this.Getcasse()
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },

    methods: {
        async DataParent(lettera) {
            sessionStorage.setItem('Tipo', lettera)
            router.push('/cassiere/cassa')
        },


        async Getcasse() {
            if (sessionStorage.getItem('Tipo') != null) {
                router.push('/cassiere/cassa')
            } else {
                var casse = await axios.get('/tipicassa')
                console.log(casse.data)
                casse.data.forEach(element => {
                    this.casseObj.push({ nome: element.nome, lettera: element.lettera, bgcolore: element.bgcolore, txcolore: element.txcolore });
                });
            }
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
    z-index: 995;
    background-color: rgb(39, 38, 38);

    display: flex;
    align-items: center;
    justify-content: center;
}

.quick-view .quick-view-inner {
    width: 40vw;
    height: 20vw;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;

}


.quick-view .quick-view-inner h2 {
    text-align: center;
    font-size: 30px;
    color: #f38304;
}

.quick-view .quick-view-inner .container {
    width: 100%;
    height: 70%;
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
}

.quick-view .quick-view-inner .container .btn {
    border: 2px solid black;
    font-size: 20px;
    text-align: center;
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