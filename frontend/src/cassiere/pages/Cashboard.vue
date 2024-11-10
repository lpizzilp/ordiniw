<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-chart-line"> Dashboard</i></h1>
        </div>

        <div v-if="tabFunzioni[0] == true" class="table-open">
            <h2 @click="OpenGrid(0)"><i class="fa-solid fa-utensils"
                    style="padding-right: 2vh; color: #f38609;"></i>Ordini
            </h2>
            <i @click="OpenGrid(0)" class="fa-solid fa-chevron-up"></i>
            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
            <table class="project-list">
                <tbody>
                    <tr>
                        <td>
                            <h3>Apertura/chiusura automatica</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[0] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[0]" @click="ChangeStatus(0)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px; border-color: #27ae60;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Ordini al Tavolo</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[1] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[1]" @click="ChangeStatus(1)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 2px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 2px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 2px;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Ordini Asporto</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[2] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[2]" @click="ChangeStatus(2)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(0)">
            <h2><i class="fa-solid fa-utensils" style="padding-right: 2vh; color: #f38609;"></i>Ordini</h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>



        <div v-if="tabFunzioni[1] == true" class="table-open">
            <h2 @click="OpenGrid(1)"><i class="fa-solid fa-book-open"
                    style="padding-right: 2vh; color: #f38609;"></i>Prenotazioni
            </h2>
            <i @click="OpenGrid(1)" class="fa-solid fa-chevron-up"></i>
            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
            <table class="project-list">
                <tbody>
                    <tr>
                        <td>
                            <h3>Apertura/chiusura</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[3] == 'Abilitato' ? 'Aperto' : 'Chiuso' }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[3]" @click="ChangeStatus(3)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(1)">
            <h2><i class="fa-solid fa-book-open" style="padding-right: 2vh; color: #f38609;"></i>Prenotazioni</h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>


        <div v-if="tabFunzioni[2] == true" class="table-open">
            <h2 @click="OpenGrid(2)"><i class="fa-solid fa-sliders"
                    style="padding-right: 2vh; color: #f38609;"></i>Preferenze Checkout
            </h2>
            <h3>Visualizza<button @click="TogleCheckout(0)" id="BtnT"
                    style="margin-left: 10px; border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                    class="btn">Tavolo</button>
                <button @click="TogleCheckout(1)" id="BtnA"
                    style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;" class="btn">Asporto</button>
            </h3>
            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
            <table class="project-list">
                <tbody>
                    <tr>
                        <td>
                            <h3>Visibilità campo tavolo</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[4] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[4]" @click="ChangeStatus(4)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr v-if="status[4] == 'Abilitato'">
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                    </tr>
                    <tr v-if="status[4] == 'Abilitato'">
                        <td>
                            <h3>Obbligatorietà campo tavolo</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[5] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[5]" @click="ChangeStatus(5)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Visibilità campo Coperti</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[6] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[6]" @click="ChangeStatus(6)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr v-if="status[6] == 'Abilitato'">
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                    </tr>
                    <tr v-if="status[6] == 'Abilitato'">
                        <td>
                            <h3>Obbligatorietà campo Coperti</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[7] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[7]" @click="ChangeStatus(7)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Visibilità campo Nominativo</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[8] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[8]" @click="ChangeStatus(8)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr v-if="status[8] == 'Abilitato'">
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                    </tr>
                    <tr v-if="status[8] == 'Abilitato'">
                        <td>
                            <h3>Obbligatorietà campo Nominativo</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[9] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[9]" @click="ChangeStatus(9)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Visibilità campo Note</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[10] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[10]" @click="ChangeStatus(10)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                    <tr v-if="status[10] == 'Abilitato'">
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                        <td style="padding-left: 0px;">
                            <hr style="width: 100%; margin: 10px 0px; border-width: 1px;">
                        </td>
                    </tr>
                    <tr v-if="status[10] == 'Abilitato'">
                        <td>
                            <h3>Obbligatorietà campo Note</h3>
                        </td>
                        <td style="text-align: center;">
                            <h3>{{ status[11] }}</h3>
                        </td>
                        <td>
                            <VueToggles :value="toggle[11]" @click="ChangeStatus(11)" :height="28" :width="56"
                                checkedText="On" uncheckedText="Off" checkedBg="#2196F3" uncheckedBg="lightgrey" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(2)">
            <h2><i class="fa-solid fa-fa-sliders" style="padding-right: 2vh; color: #f38609;"></i>Preferenze Checkout
            </h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </div>
    <QuickViewErrore v-if="Quickerrore"></QuickViewErrore>
</template>


<script>
import axios from "axios";
import QuickViewErrore from '@/components/QuickViewErrore.vue';
import { VueToggles } from "vue-toggles";
import { mapState, mapMutations } from "vuex";
import { Makelog } from '@/glbFunctions';

export default {
    name: 'Prenotazioni',

    data() {
        return {
            tabFunzioni: [true, true, true],
            status: [],
            toggle: [],
            DataVisibilità: [],
            DataObbligo: [],
            buttonActive: 'T',
            Quickerrore: false,
        }
    },

    created() {
      /*  if (!this.admin) {
            this.$router.push("/login");
        }*/
    },

    mounted() {
        this.TogleCheckout(0)
    },

    computed: {
        ...mapState(["admin"]),
        ...mapState(["cassaBarraWidth"]),
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async GetSwitch() {
            try {
                const adminId = sessionStorage.getItem('AdminSagraId');
                const [switchdataOrdini, switchdataVisibilita, switchdataObbligo] = await Promise.all([
                    axios.get(`/sagra/controlli/${adminId}`),
                    axios.get(`/sagra/visibilita/${adminId}`),
                    axios.get(`/sagra/obbligo/${adminId}`)
                ]);

                this.DataVisibilità = switchdataVisibilita.data[0].MaskVisibilita.split('')
                this.DataObbligo = switchdataObbligo.data[0].MaskObbligo.split('')

                const puntoStart = this.buttonActive === 'T' ? 0 : 5;
                if (`${switchdataOrdini.request.response} ${switchdataVisibilita.request.response} ${switchdataObbligo.request.response}`.includes("{\"code\"")) {
                    this.Quickerrore = true;
                    return;
                }

                const updateStatusToggle = (splitArray, startIndex, sequence) => {
                    for (let i = startIndex; i < splitArray.length; i++) {
                        const index = sequence[(startIndex == 5 ? (i - 5) : i)];
                        this.status[index] = splitArray[i] == '0' ? 'Disabilitato' : 'Abilitato';
                        this.toggle[index] = splitArray[i] != '0';
                    }
                };

                if (switchdataOrdini.data.length > 0) {
                    updateStatusToggle(switchdataOrdini.data[0].StrOrdini.split(''), 0, Array.from({ length: switchdataOrdini.data[0].StrOrdini.length }, (_, i) => i));
                    updateStatusToggle(this.DataVisibilità, puntoStart, [4, 6, 8, 10]);
                    updateStatusToggle(this.DataObbligo, puntoStart, [5, 7, 9, 11]);
                }
            } catch (error) {
                this.Quickerrore = true;
            }
        },

        handleLogout: function () {
            this.setAdmin("");
        },

        TogleCheckout(id) {
            let BtnArray = ['BtnT', 'BtnA']
            let Active = document.getElementById(BtnArray[id])
            let Disativate = document.getElementById(BtnArray[id == 0 ? 1 : 0])
            this.buttonActive = BtnArray[id].slice(3, 4)

            Active.style.backgroundColor = '#f38609'
            Disativate.style.backgroundColor = '#27ae60'
            this.GetSwitch()
        },

        OpenGrid(index) {
            if (this.tabFunzioni[index] == true) {
                this.tabFunzioni[index] = false
            } else {
                this.tabFunzioni[index] = true
            }
        },

        async ChangeStatus(index) {
            this.toggle[index] = !this.toggle[index];
            this.status[index] = this.toggle[index] ? 'Abilitato' : 'Disabilitato';

            const updateSagra = async (url, statusIndexes, dataArray) => {
                let unionStatus = []
                if (url != '/SagraComand') {
                    if (this.buttonActive == 'T') {
                        unionStatus = [...statusIndexes.map(i => this.status[i]), ...['0'], ...dataArray.slice(5,10)]
                    } else {
                        unionStatus = [...dataArray.slice(0,5),...statusIndexes.map(i => this.status[i]), ...['0']]
                    } 
                } else {
                    unionStatus = statusIndexes.map(i => this.status[i])
                }
               const uniondata = {
                    type: unionStatus.join('').replace(/Abilitato/g, '1').replace(/Disabilitato/g, '0'),
                    id: sessionStorage.getItem('AdminSagraId')
                };
                await axios.put(url, uniondata);
                Makelog(this.toggle[index] ? "Disabilitazione" : "Abilitazione", "info");
            };

            await updateSagra('/SagraComand', [0, 1, 2, 3]);
            await updateSagra('/SagraVisibilita', [4, 6, 8, 10], this.DataVisibilità);
            await updateSagra('/SagraObbligo', [5, 7, 9, 11], this.DataObbligo);
        },

    },
    components: { VueToggles, QuickViewErrore }
}
</script>

<style scoped>
.admin-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 5rem 5%;
    font-size: 16px;
}

.admin-container h1 {
    font-family: 'Satisfy', cursive;
    font-size: 1.5em;
    color: #27ae60;
}

.project-list {
    width: 100%;
    text-align: left;
}

.project-list td {
    padding-left: 20px;
}

.table-close {
    width: 100%;
    margin: 3vh 0vh;
    padding: 12.5px 25px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    background-color: white;
    border: 1px outset black;
    border-radius: 5px;
}

.table-open {
    width: 100%;
    margin: 3vh 0vh;
    padding: 12.5px 25px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: white;
    border: 1px outset black;
    border-radius: 5px;
}

.bnt:active {
    background-color: #f38609;
    border: 3px inset black;
}

@media (max-width: 983px) {
    .admin-container {
        margin: 0px;
        margin-top: 70px;
        background-color: whitesmoke;
        font-size: 16px;
    }

    .admin-container h1 {
        font-family: 'Satisfy', cursive;
        font-size: 1.2em;
        color: #27ae60;
    }

    .project-list td {
        padding-left: 3px;
        text-align: left;
    }

}
</style>