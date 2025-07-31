<template>
    <div class="quick-vue">
        <div v-if="!Number.isInteger(checkoutObj.book_periodo)" class="start-box">
            <h3 style="font-size: 1.8rem; text-transform: none;">{{ checkoutObj.book_periodo == null ? "Qui potrai scelgiere la giornata da prenotare e il relativo pasto" : "Seleziona l'orario di arrivo, il tuo tavolo resterà prenotato per il lasso di tempo scelto" }}</h3>
            <button v-if="(!Isread[0] && !Isread[1]) || (Isread[0] && !Isread[1] && checkoutObj.book_periodo)" class="btn" @click="Isread[Isread[0] ? 1 : 0] = true"> Ok, ho capito</button>
        </div>
        <div v-if="checkoutObj.book_periodo == null" class="table-date">
            <template v-if="Isread[0]">
                <button class="td-tabledate" @click="checkoutObj.book_day = d.data, setbackgroundcolor(dayObj.length, index)"
                    :style="{ 'background-color': backcolors[0][index], 'color': backcolors[1][index], 'border-left': index == 0 ? 'none' : '2px inset black', 'border-right': index == (dayObj.length - 1) ? 'none' : '2px inset black' }"
                    v-for="(d, index) in dayObj" :key="index">
                    <template v-if="Giorno != d.data">
                        <div class="table-shadow">
                            <p>{{ d.data }}</p>
                            <h3>{{ d.giorno }}</h3>
                        </div>
                        <hr class="hr">
                        <h5 style="font-size: medium; margin: 0px; padding: 8px 0px;"><i class="fa-solid fa-chevron-down"
                                style="padding-right: 2rem;"></i>Periodi disponibili</h5>
                    </template>
                    <div class="time-div" v-else>
                        <div class="table-shadow" @click="checkoutObj.book_periodo = p, SetPlaceArray()"
                            style="margin: 1rem 2px; border-radius: 10px;" v-for="(p, i) in d.periodo" :key="i">
                            {{ p == 'M'?"Colazione" : p == 'P' ? "Pranzo" : "Cena" }}
                        </div>
                    </div>
                </button>
            </template>
        </div>
        <div v-else class="table-date">
            <template v-if="Isread[1]">
                <button class="td-tabledate"
                    :style="{ 'background-color': 'white', 'border-left': index == 0 ? 'none' : '2px inset black', 'border-right': index == (dayObj.length - 1) ? 'none' : '2px inset black' }"
                    v-for="(t, index) in timeObj.filter(t => t.periodo === checkoutObj.book_periodo)" :key="index">
                    <div class="table-shadow">
                        <h3>{{ t.periodo == 'M' ? "Colazione" : t.periodo == 'P' ? "Pranzo" : "Cena" }} {{ t.ora }}</h3>
                        <p>Posti disponibli {{ SetCapacita(t.capacita, t.id) }}</p>
                    </div>
                    <hr class="hr" style="border-color: #27ae60;">
                    <div class="check-btn">
                        <button class="btn" @click="SetPlaceQty('+', index)"><i class="fa-solid fa-plus"></i></button>
                        <p>{{ places[index] }}</p>
                        <button class="btn" @click="SetPlaceQty('-', index)"><i class="fa-solid fa-minus"></i></button>
                    </div>
                    <button v-if="places[index] != 0" @click="handleSubmit(index, t.id)" class="btn">Checkout</button>
                </button>
            </template>
        </div>
        <button v-if="(Isread[0] && Isread[1]) || (!Isread[0] && Isread[1])" class="btn" @click="checkoutObj.book_periodo = null; Isread[1] = false;" style="margin-top: 2rem ; background-color: #f38609;">Torna indietro</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Table",
    data() {
        return {
            checkoutObj: {book_name: "", book_day: "", book_periodo: null, book_posti: "", book_status: "null", book_created: ""},
            dayObj: [],
            timeObj: [],
            capacitaObj: [],
            backcolors: [[], [], []],
            places: [],
            Isread: [false, false],
            //orderObj: { name: "", phone: "", people: "", tables: "", card: "", when: "", note: "" },
            errorObj: [],
        }
    },

    props: {
        giorno: String
    },

    created() {
        this.GetDay()
    },

    methods: {
        setbackgroundcolor(length, index) {
            this.backcolors = [
                Array.from({ length }, (_, i) => index === i ? '#27ae60' : 'white'),
                Array.from({ length }, () => 'black'),
                []
            ];
            return this.backcolors;
        },

        async GetDay() {
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

        SetPlaceQty(type, index) {
            let timefiltered = this.timeObj.filter(t => t.periodo === this.checkoutObj.book_periodo)
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

        SetCapacita(capacita, periodoId) {
            const item = this.capacitaObj.find(
            el => el.book_day === this.checkoutObj.book_day && el.periodo === periodoId);
            return item ? parseInt(capacita) - parseInt(item.riservati) : capacita;
        },

        handleSubmit(index, book_periodo) {
            this.checkoutObj.book_periodo = parseInt(book_periodo)
            this.checkoutObj.book_posti = this.places[index]
        }
    },

}
</script>

<style scoped>
.start-box{
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