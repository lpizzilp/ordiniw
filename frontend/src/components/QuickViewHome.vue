<template>
    <div class="quick-view">
        <div class="quick-view-inner">
            <h2>Scelgi il tipo ordine</h2><br>
            <h3>Se desideri essere servito al tavolo, scegli "Tavolo"
                <slot></slot>
            </h3>
            <button class="btn" @click="DataParent('t')" style="width: 100%;">Tavolo</button>
            <button class="btn" @click="DataParent('a')" style="width: 100%;">Asporto</button>
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
        typeData: String,
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },

    created(){
        console.log('pas')
        if (this.typeData === 'PRE') {
            this.DataParent(this.typeData)
        }
    },

    methods: {
        DataParent(where) {
            sessionStorage.setItem('Type', where)
            console.log(sessionStorage.getItem('Type'))
            const dataforParent = {
                vis: false,
                typefilter: this.typeData
            }
            this.$emit('childEvent', dataforParent);
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