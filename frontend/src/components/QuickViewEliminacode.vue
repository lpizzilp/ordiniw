<template>
    <div class="quick-view">
        <div class="quick-view-inner">
            <h2>Fatti avvisare</h2><br>
            <h3>Ti verra inviato un messaggio quando sarà il tuo turno<br><br>
                Inserisci il numero del tuo ticket<br>(puoi inserire fino 3 cifre)<br><br>
                <slot></slot>
            </h3>
            <div class="writespace">
                <input  type="number" min="0" max="9" maxlength="1" @input="Changeinput(1)"
                    oninput="this.value = this.value.slice(0, 1)" name="input0" id="input0" v-model="Ncliente[0]" />
                <input  type="number" min="0" max="9" maxlength="1" @input="Changeinput(2)"
                    oninput="this.value = this.value.slice(0, 1)" name="input1" id="input1" v-model="Ncliente[1]" />
                <input  type="number" min="0" max="9" maxlength="1" @input="Changeinput(2)"
                    oninput="this.value = this.value.slice(0, 1)" name="input2" ref="input2" id="input2" v-model="Ncliente[2]" />
            </div>
            <button class="btn" @click="DataParent()"><i class="fa-solid fa-bell" style="padding-right: 2vh;"></i>Conferma<i class="fa-solid fa-bell" style="padding-left: 2vh;"></i></button>
            <button class="btn" @click="DataParent()" style="background-color: #f38609;">Annulla</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "QuickView",
    data() {
        return {
            Ncliente: [],
        };
    },

    scrollToTop() {
        window.scrollTo(0, 0);
    },
    methods: {

        Changeinput(input) {
            if (input < 3 ) {
                document.getElementById('input' + input).focus();
            }
        },

        DataParent() {
            console.log(this.Ncliente.join(''))
            const dataforParent = {
                vis: false,
                numero: this.Ncliente.join('') == "" ? null : +this.Ncliente.join('')
            };
            console.log(dataforParent.numero)
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
    color: #27ae60;
}

.quick-view .quick-view-inner h3 {
    text-align: center;
    font-size: 22px;
    color: #000000ae;
    text-transform: none;
}

.quick-view .quick-view-inner .writespace {
    display: flex;
    text-align: center;
    justify-content: space-evenly;
}

.quick-view .quick-view-inner .writespace input {
    border-bottom: 1px solid black;
    width: 25%;
    font-size: 22px;
    text-align: center;
    color: #000000ae;
    text-transform: none;
}

.quick-view .quick-view-inner .btn {
    font-size: 18px;
    margin-top: 5vh;
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