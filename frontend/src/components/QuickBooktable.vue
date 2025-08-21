<template>
    <div class="quick-view">
        <div class="quick-inner">
            <div v-if="!Number.isInteger(checkoutObj.book_periodo)" class="start-box">
                <h3 style="font-size: 1.8rem; text-transform: none;">{{ checkoutObj.book_periodo == null ? "Qui potrai scelgiere la giornata da prenotare e il relativo pasto" : "Seleziona l'orario di arrivo, il tuo tavolo resterà prenotato per il lasso di tempo scelto" }}</h3>
            </div>
            <div v-if="checkoutObj.book_periodo == null" class="table-date">
                <button class="td-tabledate" @click="selectperiodo = true, setbackgroundcolor(dayObj.length, index)"
                    :style="{ 'background-color': backcolors[0][index], 'color': backcolors[1][index] }"
                    v-for="(d, index) in dayObj.filter(d => d.data === formatter(giorno))" :key="index">
                    <div class="table-shadow">
                        <p>{{ d.data }}</p>
                        <h3>{{ d.giorno }}</h3>
                    </div>
                    <hr class="hr">
                    <h5 style="font-size: medium; margin: 0px; padding: 8px 0px;"><i class="fa-solid fa-chevron-down"
                            style="padding-right: 2rem;"></i>Periodi disponibili</h5>
                    <div class="time-div" v-if="selectperiodo != false">
                        <div class="table-shadow" @click="checkoutObj.book_periodo = p, SetPlaceArray()"
                            style="margin: 1rem 2px; border-radius: 10px;" v-for="(p, i) in d.periodo" :key="i">
                            {{ p == 'M' ? "Colazione" : p == 'P' ? "Pranzo" : "Cena" }}
                        </div>
                    </div>
                </button>
            </div>
            <div v-else class="table-date">
                <button class="td-tabledate" :style="{ 'background-color': 'white', 'flex': '0 0 50%' }"
                    v-for="(t, index) in timeObj.filter(t => t.periodo === checkoutObj.book_periodo)" :key="index">
                    <div class="table-shadow">
                        <h3>{{ t.periodo == 'M' ? "Colazione" : t.periodo == 'P' ? "Pranzo" : "Cena" }} {{ t.ora }}</h3>
                        <p>Posti disponibli {{ SetCapacita(t.capacita, t.id) }}</p>
                    </div>
                    <hr class="hr" style="border-color: #27ae60;">
                    <div v-if="SetCapacita(t.capacita, t.id) != 0" class="check-btn">
                        <button class="btn" @click="SetPlaceQty('-', index)"><i class="fa-solid fa-minus"></i></button>
                        <p>{{ places[index] }}</p>
                        <button class="btn" @click="SetPlaceQty('+', index)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div v-else class="check-btn"><button class="btn" style="background-color: #f38609;">Posti
                            esauriti</button></div>
                    <button v-if="places[index] != 0" @click="handleSubmit(index, t.id)" class="btn">Vai al
                        Carrello</button>
                </button>
            </div>
            <button class="btn"
                @click="checkoutObj.book_periodo == null ? closeForm() : checkoutObj.book_periodo = null;"
                style="margin-top: 2rem ; align-self: center; background-color: #f38609;">Torna indietro</button>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import moment from 'moment';
export default {
    name: "QuikView",
    data() {
        return {
            checkoutObj: { book_name: "", book_day: "", book_periodo: null, book_posti: "", book_status: "null", book_created: "" },
            dayObj: [],
            selectperiodo: false,
            timeObj: [],
            capacitaObj: [],
            backcolors: [[], [], []],
            places: [],
            //orderObj: { name: "", phone: "", people: "", tables: "", card: "", when: "", note: "" },
            errorObj: [],
        }
    },

    props: {
        giorno: String
    },

    created() {
        this.GetDay()
        console.log('entro')
    },

    methods: {
        closeForm() {
            this.$emit('ClosePrenot', false);
        },

        setbackgroundcolor(length, index) {
            this.backcolors = [
                Array.from({ length }, (_, i) => index === i ? '#27ae60' : 'white'),
                Array.from({ length }, () => 'black'),
                []
            ];
            return this.backcolors;
        },

        async GetDay() {
            console.log('gironoprova ' + this.giorno)
            var dayslot = await axios.get('/getdayslot')
            var timeslot = await axios.get('/gettimeslot')
            var capacita = await axios.get('/getcapacita')
            console.log('dayslot', dayslot.data)
            console.log('timeslot', timeslot.data)
            console.log('capacita', capacita.data)
            dayslot.data.forEach(element => {
                let giorno = this.getDayOfWeek(element.data)
                let periodarray = element.periodo.split('')
                console.log('periodoarray', periodarray)
                this.dayObj.push({ data: element.data, giorno, periodo: periodarray });
            });
            timeslot.data.forEach(element => {
                this.timeObj.push({ id: element.id, periodo: element.periodo, ora: element.ora, capacita: element.capacita });
            });
            capacita.data.forEach(element => {
                this.capacitaObj.push({ book_day: element.book_day, periodo: element.id, ora: element.ora, riservati: element.riservati });
            });
        },

        getDayOfWeek: function (dateStr) {
            const [day, month, year] = dateStr.split('/').map(Number);
            const date = new Date(year, month - 1, day); // mese da 0 a 11
            const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
            return days[date.getDay()];
        },

        SetPlaceArray() {
            this.places = []
            let fltObj = this.timeObj.filter(t => t.periodo === this.checkoutObj.book_periodo)
            for (let i = 0; i < fltObj.length; i++) {
                this.places.push(0)
            }
        },

        formatter(day) {
            return moment(day, 'YYYYMMDD').format('DD/MM/YYYY');
        },

        SetPlaceQty(type, index) {
            let timefiltered = this.timeObj.filter(t => t.periodo === this.checkoutObj.book_periodo)
            if (type == '+') {
                if (this.places.every(value => value === 0)) {
                    this.places[index]++
                } else if (this.places[index] !== 0 && this.places.includes(this.places[index])) {
                    if (this.places[index] < this.SetCapacita(timefiltered[index].capacita, timefiltered[index].id)) {
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

        SetCapacita(capacita, periodoId) {
            const item = this.capacitaObj.find(
                el => el.book_day === this.checkoutObj.book_day && el.periodo === periodoId);
            return item ? parseInt(capacita) - parseInt(item.riservati) : capacita;
        },

        handleSubmit(index, book_periodo) {
            this.checkoutObj.day = this.giorno.trim()
            console.log(this.giorno + ' gionro')
            this.checkoutObj.book_periodo = parseInt(book_periodo)
            this.checkoutObj.book_posti = this.places[index]
            console.log(this.checkoutObj)
            sessionStorage.setItem('bookTable', JSON.stringify(this.checkoutObj))
            router.push('/cart')
        }
    },

}
</script>

<style scoped>
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);

    display: block;
    padding: 15rem 0px;
}

.quick-inner {
    background-color: #c7c7c7;
    padding: 2%;
    text-align: center;
}


.start-box {
    display: block;
    text-align: center;
    height: fit-content;
    padding: 2rem;
    background-color: white;
    border: 2px inset black;
}

.start-box .btn {
    font-size: 1.6rem;
    margin-top: 2rem;
}

.table-date {
    display: flex;
    flex-wrap: wrap;
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

.table-shadow p {
    color: black;
    font-size: larger;
    margin: 0px;
    padding: 3px;
}

.td-tabledate {
    flex: auto;
    background-color: white;
    border: 1px solid black;
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

.td-tabledate .check-btn {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.td-tabledate .check-btn p {
    width: fit-content;
    background-color: #f7f7f7;
    color: black;
    text-align: center;
    font-size: large;
    margin: 0px;
    padding: 10px;
}

.time-div {
    margin: 0px;
    border: 2px dashed white;
}


@media (max-width: 768px) {
    .quick-view {
        padding: 19rem 0px;
    }

    .table-date {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>