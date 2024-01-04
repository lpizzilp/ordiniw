<template>
    <div class="quick-view">
        <div v-if="BtnAttivi[0] == 1" class="quick-view-inner">
            <h2>Scelgi il tipo ordine</h2><br>
            <h3>Se desideri essere servito al tavolo, scegli "Tavolo"
                <slot></slot>
            </h3>
            <button v-if="BtnAttivi[1] == 1" class="btn" @click="DataParent('W')" style="width: 100%;">Tavolo</button>
            <button v-if="BtnAttivi[2] == 1" class="btn" @click="DataParent('Y')" style="width: 100%;">Asporto</button>
        </div>
        <div v-else class="quick-view-inner">
            <h2>Ordini non abilitati</h2><br>
            <h3>In questa sagra non puoi ordinare online.</h3><br>
            <h3 v-if="BtnAttivi[3] == 1 || BtnAttivi[4] == 1 || BtnAttivi[6] == 1">Puoi uttilizzare i servizi di:
                <slot></slot>
            </h3>
            <button v-if="BtnAttivi[3] == 1" class="btn" @click="DataParent('PRE')"
                style="width: 100%;">Prenotazione</button>
            <RouterLink to="/eliminacode" v-if="BtnAttivi[4] == 1 || BtnAttivi[6] == 1" class="btn" style="width: 100%;">Eliminacode</RouterLink>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "QuickView",
    data() {
        return {};
    },
    props: {
        Categoria: String,
        BtnAttivi: Array,
    },
    scrollToTop() {
        window.scrollTo(0, 0);
    },
    methods: {
        DataParent(Tipo) {
            sessionStorage.setItem('TipoOrdine', Tipo);
            const dataforParent = {
                vis: false,
                category: this.Categoria
            };
            this.$emit('childEvent', dataforParent);
        },
    },
    components: { RouterLink }
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
    text-transform: none;
}

.quick-view .quick-view-inner .btn {
    font-size: 18px;
    margin-top: 5vh;
    margin-bottom: 10px;
    width: 45%;
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