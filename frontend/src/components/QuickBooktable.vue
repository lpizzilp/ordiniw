<template>
    <div class="quick-vue">
        <div style="display: block; text-align: center; height: fit-content; padding: 2rem; background-color: white; border: 2px inset black;">
            <h3 style="font-size: 1.8rem; text-transform: none;">{{ periodoSelected == null ? "Qui potrai scelgiere la giornata da prenotare e il relativo pasto" : "Seleziona l'orario di arrivo, il tuo tavolo resterà prenotato per il lasso di tempo scelto" }}</h3>
            <button v-if="(Isread[0] == false && Isread[1] == false) || (Isread[0] == true && Isread[1] == false && periodoSelected != null)" class="btn" style="font-size: 1.6rem; margin-top: 2rem;" @click="Isread[0] == false ? Isread[0] = true : Isread[1] = true">Ok, ho capito</button>
        </div>
        <div v-if="periodoSelected == null" class="table-date">
            <template v-if="Isread[0]">
                <button class="td-tabledate" @click="isHovered = index, setbackgroundcolor(dayObj.length)"
                    :style="{ 'background-color': backcolors[0][index], 'color': backcolors[1][index], 'border-left': index == 0 ? 'none' : '2px inset black', 'border-right': index == (dayObj.length - 1) ? 'none' : '2px inset black' }"
                    v-for="(d, index) in dayObj" :key="index">
                    <template v-if="isHovered != index">
                        <div class="table-shadow">
                            <p style="color: black; font-size: larger; margin: 0px; padding: 3px;">{{ d.data }}</p>
                            <h3>{{ d.giorno }}</h3>
                        </div>
                        <hr class="hr" :style="{ 'border': '2px dashed' + backcolors[2][index] }">
                        <h5 style="font-size: medium; margin: 0px; padding: 8px 0px;"><i class="fa-solid fa-chevron-down"
                                style="padding-right: 2rem;"></i>Periodi disponibili</h5>
                    </template>
                    <div class="time-div" v-else>
                        <div class="table-shadow" @click="periodoSelected = p, SetCapacitaArray()"
                            style="margin: 1rem 2px; border-radius: 10px;" v-for="(p, i) in d.periodo" :key="i">{{ p == 'M'
                                ?
                                "Colazione" : p == 'P' ? "Pranzo" : "Cena" }}</div>
                    </div>
                </button>
            </template>
        </div>
        <div v-else class="table-date">
            <template v-if="Isread[1]">
            <button class="td-tabledate"
                :style="{ 'background-color': 'white', 'border-left': index == 0 ? 'none' : '2px inset black', 'border-right': index == (dayObj.length - 1) ? 'none' : '2px inset black' }"
                v-for="(t, index) in timeObj.filter(t => t.periodo === periodoSelected)" :key="index">
                <div class="table-shadow">
                    <h3>{{ t.periodo == 'M' ? "Colazione" : t.periodo == 'P' ? "Pranzo" : "Cena" }} {{ t.ora }}</h3>
                    <p style="color: black; font-size: larger; margin: 0px; padding: 3px;">Posti disponibli {{
                        t.capacita }}</p>
                </div>
                <hr class="hr" style="border-color: #27ae60;">
                <div style="display: flex; width: 100%; justify-content: center; align-items: center; margin-bottom: 10px;">
                    <button class="btn" @click="SetPlaceQty('+', index)"><i class="fa-solid fa-plus"></i></button>
                    <p style=" width: fit-content; background-color: #f7f7f7; color: black; text-align: center; font-size: large; margin: 0px; padding: 10px;">
                        {{ places[index] }}</p>
                    <button class="btn" @click="SetPlaceQty('-', index)"><i
                            class="fa-solid fa-minus"></i></button>
                </div>
                <button v-if="places[index] != 0" class="btn">Checkout</button>
            </button>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Table",
    data() {
        return {
            dayObj: [],
            timeObj: [],
            backcolors: [[], [], []],
            places: [],
            isHovered: null,
            periodoSelected: null,
            Isread: [false, false]
            //orderObj: { name: "", phone: "", people: "", tables: "", card: "", when: "", note: "" },
            // errorObj: { nameErr: [], phoneErr: [], peopleErr: [], tablesErr: [], cardErr: [], whenErr: [] },
        }
    },

    created() {
        this.GetDay()
    },

    methods: {
        setbackgroundcolor(length) {
            this.backcolors = [[], [], []]
            if (this.isHovered != null) {
                for (let i = 0; i < length; i++) {
                    if (this.isHovered == i) {
                        this.backcolors[0].push('#27ae60')
                        this.backcolors[1].push('black')
                        this.backcolors[2].push('white')
                    } else {
                        this.backcolors[0].push('white')
                        this.backcolors[1].push('black')
                        this.backcolors[2].push('#27ae60')
                    }
                }
            }
            return this.backcolors
        },

        async GetDay() {
            var dayslot = await axios.get('/getdayslot')
            var timeslot = await axios.get('/gettimeslot')
            console.log('dayslot', dayslot.data)
            console.log('timeslot', timeslot.data)
            dayslot.data.forEach(element => {
                let giorno = this.getDayOfWeek(element.data)
                let periodarray = element.periodo.split('')
                console.log('periodoarray', periodarray)
                this.dayObj.push({ data: element.data, giorno, periodo: periodarray });
            });
            timeslot.data.forEach(element => {
                this.timeObj.push({ id: element.id, periodo: element.periodo, ora: element.ora, capacita: element.capacita });
            });
        },

        getDayOfWeek: function (dateStr) {
            const [day, month, year] = dateStr.split('/').map(Number);
            const date = new Date(year, month - 1, day); // mese da 0 a 11
            const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
            return days[date.getDay()];
        },

        SetCapacitaArray() {
            this.places = []
            let fltObj = this.timeObj.filter(t => t.periodo === this.periodoSelected)
            for (let i = 0; i < fltObj.length; i++) {
                this.places.push(0)
            }
        },

        SetPlaceQty(type, index) {
            let timefiltered = this.timeObj.filter(t => t.periodo === this.periodoSelected)
            if (type == '+') {
                if (this.places.every(value => value === 0)) {
                    this.places[index]++
                } else if (this.places[index] !== 0 && this.places.includes(this.places[index])) {
                    if (this.places[index] < timefiltered[index].capacita) {
                        this.places[index]++   
                    }
                }
            } else if (type == '-') {
                if (this.places[index] == 0) {
                    this.places[index]
                } else {
                    this.places[index]--
                }
            }
        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();

                let data = {
                    book_name: this.orderObj.name,
                    book_phone: parseInt(this.orderObj.phone),
                    book_people: parseInt(this.orderObj.people),
                    book_tables: parseInt(this.orderObj.tables),
                    user_id: parseInt(this.orderObj.card),
                    book_when: this.orderObj.when,
                    book_note: this.orderObj.note,
                }

                await axios.post("/booking", data);

                this.$refs.alert.showAlert('success', 'Thank you! We will call you soon to confirm your order', 'Booking Successfully !')
                document.getElementById("bookTableForm").reset();
            }
        }
    },

}
</script>

<style scoped>
.table-date {
    display: flex;
    width: 100%;
    background-color: white;
    margin-top: 2rem;
    border: 2px black inset;
    border-radius: 10px;
}

.table-shadow {
    background-color: white;
    padding: 10px;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.45) inset;
    -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.45) inset;
    -moz-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.45) inset;
}

.td-tabledate {
    flex: auto;
    background-color: white;
    border-radius: 10px;
    font-size: small;
    padding: 1.2rem;
}

.td-tabledate:hover {
    background-color: #27ae60;
    color: white;
}

.td-tabledate h3 {
    font-size: 2rem;
    margin: 0px;
    padding: 3px;
    color: #f38609;
}

.hr {
    border: 2px dashed #27ae60;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
}

.td-tabledate:hover .hr {
    border: 2px dashed white;
}

.time-div {
    margin: 0px;
    border: 2px dashed white;
}


@media (max-width: 768px) {
    .order form .row .input-box {
        width: 100%;
    }

    .order-section form .row {
        display: block;
        max-width: 100%;
        width: 100%;
        margin: 0;
    }

    .order-section form .row .input-box {
        width: 100%;
    }

}

@media (max-width: 576px) {
    .order-section .icons-container {
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    }
}
</style>