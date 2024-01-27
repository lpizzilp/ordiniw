<template>
    <div class="admin-container">
        <div class="header">
            <h1><i class="fa-solid fa-book-open"> Prenotazioni</i></h1>
            <button class="btn download" @click="Exportfunction()"><i class="fa-solid fa-download"
                    style="padding-right: 1vh;"></i>Download in Excel</button>
            <button class="btn" @click="getAllPenot()"><i class="fa-solid fa-retweet"
                    style="padding-right: 1vh;"></i>Aggiorna</button>
        </div>

        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Serata</th>
                        <th></th>
                        <th></th>
                        <th>Pezzi</th>
                        <th></th>
                        <th></th>
                        <th>Vedi di più</th>
                    </tr>
                </thead>
                <tbody v-for="(t, id) in totqty.slice()" :key="t.food_name">
                    <tr>
                        <td style="padding: 12px 4px;">{{ t.food_name }}</td>
                        <td style="padding: 12px 4px;"></td>
                        <td style="padding: 12px 4px;"></td>
                        <td style="padding: 12px 4px;">{{ t.somma_qty }}</td>
                        <td style="padding: 12px 4px;"></td>
                        <td style="padding: 12px 4px;"></td>
                        <td style="padding: 12px 4px;" v-if="showSerata[id] == false"><i
                                @click="changeopengrid(id, t.food_id)" class="fa-solid fa-chevron-down"></i></td>
                        <td style="padding: 12px 4px;" v-if="showSerata[id] == true"><i
                                @click="changeopengrid(id, t.food_id)" class="fa-solid fa-chevron-up"></i></td>
                    </tr>
                    <tr v-if="showSerata[id] == true">
                        <th>Serata</th>
                        <th>Pezzi</th>
                        <th>nominativo</th>
                        <th>telefono</th>
                        <th>Data Prenotazione</th>
                        <th>Stato</th>
                    </tr>
                    <tr v-for="(b, index) in filterPenot.slice().reverse()" :key="b.book_id">
                        <td v-if="showSerata[id] == true">{{ b.food_name }}</td>
                        <td v-if="showSerata[id] == true">{{ b.item_qty }}</td>
                        <td v-if="showSerata[id] == true">{{ b.book_nominativo }}</td>
                        <td v-if="showSerata[id] == true">{{ b.book_phone }}</td>
                        <td v-if="showSerata[id] == true">{{ formattime(b.book_when) }}</td>
                        <td v-if="b.book_status == 0 && showSerata[id] == true"><i class="fa-solid fa-square-xmark"
                                style="padding-right: 1vh;"></i>Cancellato</td>
                        <td v-else-if="b.book_status == 1 && showSerata[id] == true"><i class="fa-regular fa-square-minus"
                                style="padding-right: 1vh;"></i>Attesa</td>
                        <td v-else-if="b.book_status == 2 && showSerata[id] == true"><i class="fa-regular fa-square-check"
                                style="padding-right: 1vh;"></i>confermato</td>
                        <td v-if="showSerata[id] == true">
                            <button class="btn" @click="changestate(index)"
                                style="z-index: 0; padding: 0.1vh 1vh; border-radius: 5px;"><i
                                    class="fas fa-bars"></i></button>
                            <div v-if="showAction[index] == true" class="drop-down-select">
                                <button v-if="b.book_status == 1" class="action-btn"
                                    @click="ActionBtn('Confirm', index, b.book_id, t.food_id)">
                                    Conferma
                                </button>

                                <button v-if="b.book_status != 1" class="annulla-btn"
                                    @click="ActionBtn('Annulla', index, b.book_id, t.food_id)">
                                    Annulla
                                </button>

                                <button v-if="b.book_status == 1" class="cancel-btn"
                                    @click="ActionBtn('Cancel', index, b.book_id, t.food_id)">
                                    Cancella
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import moment from 'moment';
import ExcelJS from 'exceljs';
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Prenotazioni',

    data() {
        return {
            totqty: [],
            allPenot: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
            showSerata: [],
            showAction: [],
            rowcolor: [],
        }
    },

    created() {
        if (this.allPenot.length == 0) {
            if (!this.admin) {
                this.$router.push("/login");
            } else {
                this.getAllPenot();
            }
        }
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["admin"]),

        filterPenot: function () {
            return this.allPenot.filter((b) => b.book_status <= 2 && b.book_status >= 0);
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async getAllPenot() {
            this.totqty = (await axios.get('/prenotazione/sum')).data;
            this.changeopengrid();
        },

        async changeopengrid(id, food_id) {
            for (let l = 0; l < this.totqty.length; l++) {
                this.showSerata.push(false)
            }
            switch (this.showSerata[id]) {
                case true:
                    this.showSerata[id] = false
                    break;

                case false:
                    this.allPenot = (await axios.get('/getprenotazione/' + food_id)).data;
                    for (let i = 0; i < this.showSerata.length; i++) {
                        if (id == i) {
                            this.showSerata[i] = true
                        } else {
                            this.showSerata[i] = false
                        }
                    }
                    break;
            }

        },

        changestate(id) {
            for (let i = 0; i < this.allPenot.length; i++) {
                this.showAction.push(false)
            }
            switch (this.showAction[id]) {
                case true:

                    this.showAction[id] = false
                    break;

                case false:
                    this.showAction[id] = true
                    break;
            }
        },


        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        formattime(data) {
            const dataParsata = moment(data, 'YYYY/MM/DDTHH:mm');

            // Formatta la data nel nuovo formato
            const dataFormattata = dataParsata.format('DD/MM/YYYY');

            return dataFormattata;
        },

        handleLogout: function () {
            this.setAdmin("");
        },

        async ActionBtn(type, index, book_id, food_id) {
            switch (type) {
                case "Confirm":
                    var data = {
                        id: book_id,
                        action: 2
                    }
                    break;

                case "Annulla":
                    data = {
                        id: book_id,
                        action: 1
                    }
                    break;

                case "Cancel":
                    data = {
                        id: book_id,
                        action: 0
                    }
                    break;
            }

            this.showAction[index] = false
            await axios.put("/prenotazione/action", data)
            this.allPenot = (await axios.get('/getprenotazione/' + food_id)).data;
        },


        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllPenot();
            }.bind(this), 600000);
        },

        async Exportdata() {
            let plus = 0 // incremento righe
            var data = [[]] //array dei dati

            // recupera prenotazioni
            this.totqty = (await axios.get('/prenotazione/sum')).data;

            data[0] = ['Id Articolo', 'Serata', 'Pezzi', '', '']
            plus = plus + 1

            // carico dati
            for (let i = 0; i < this.totqty.length; i++) {
                this.allPenot = (await axios.get('/getprenotazione/' + this.totqty[i].food_id)).data;
                data[plus] = [this.totqty[i].food_id, this.totqty[i].food_name, this.totqty[i].somma_qty, '', '']
                plus = plus + 1
            }
            for (let i = 0; i < this.totqty.length; i++) {
                this.allPenot = (await axios.get('/getprenotazione/' + this.totqty[i].food_id)).data;
                if (plus != this.totqty.length) {
                    data[plus] = ['', '', '', '', '']
                    this.rowcolor.push(plus)
                    plus = plus + 1
                }
                data[plus] = ['Articolo', 'Quantità', 'Nominativo', 'Telefono', 'Data']
                    plus = plus + 1
                    data[plus] = ['', '', '', '', '']
                    plus = plus + 1
                for (let l = 0; l < this.allPenot.length; l++) {
                    data[plus] = [this.allPenot[l].food_name, this.allPenot[l].item_qty, this.allPenot[l].book_nominativo, this.allPenot[l].book_phone, this.formattime(this.allPenot[l].book_when)]
                    plus = plus + 1
                }
            }

            return data
        },


        async Exportfunction() {
            this.totqty = (await axios.get('/prenotazione/sum')).data;
            // Creare un nuovo workbook e foglio Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Dati');

            // Imposta la larghezza delle colonne
            worksheet.getColumn('A').width = 25;
            worksheet.getColumn('B').width = 25;
            worksheet.getColumn('C').width = 20;
            worksheet.getColumn('D').width = 20;
            worksheet.getColumn('E').width = 20;

            const headerStyle = {
                font: { size: 13 },
                alignment: { vertical: 'middle', horizontal: 'center' },
                border: { top: { style: 'thin', color: { argb: '000000' } }, left: { style: 'thin', color: { argb: '000000' } }, right: { style: 'thin', color: { argb: '000000' } }, bottom: { style: 'thin', color: { argb: '000000' } } },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F5F5F5' } }
            };

            const emptyStyle = {
                border: { top: { style: 'thin', color: { argb: '000000' } }, left: { style: 'thin', color: { argb: '000000' } }, right: { style: 'thin', color: { argb: '000000' } }, bottom: { style: 'thin', color: { argb: '000000' } } },
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F5F5F5' } }
            };

            // Definisci lo stile per le celle non header
            const cellStyle = {
                font: { size: 12 },
                alignment: { vertical: 'middle', horizontal: 'center' },
                border: { top: { style: 'thin', color: { argb: '000000' } }, left: { style: 'thin', color: { argb: '000000' } }, right: { style: 'thin', color: { argb: '000000' } }, bottom: { style: 'thin', color: { argb: '000000' } } },
            };


            // Aggiungere dati al foglio Excel
            const data = await this.Exportdata()
            worksheet.addRows(data);

            // Aggiungi i dati al foglio Excel e applica gli stili
            data.forEach((row, rowIndex) => {
                row.forEach((value, colIndex) => {
                    const cell = worksheet.getCell(rowIndex + 1, colIndex + 1);
                    // Applica lo stile appropriato in base alla riga
                    if (rowIndex === 0) {
                        cell.style = headerStyle;
                    } else {
                        cell.style = cellStyle;
                    }

                    for (let i = 0; i < this.rowcolor.length; i++) {
                        if (rowIndex === this.rowcolor[i]) {
                            cell.style = emptyStyle;
                        }
                    }
                });
            });

            // Salva il file Excel
            workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);

                // Crea un elemento <a> per il download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Prenotazioni_excel.xlsx';
                a.click();

                window.URL.revokeObjectURL(url);
            });
        },

    },
}
</script>

<style scoped>
.admin-container {
    margin-left: 20%;
    background-color: #fff;
    padding: 2rem 5%;
    font-size: 16px;
}

.admin-container h1 {
    font-family: 'Satisfy', cursive;
    font-size: 1.5em;
    color: #27ae60;
}

.header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}


.project-list>tbody>tr>td {
    position: relative;
    padding: 3px 2px;
}

.table-responsive::-webkit-scrollbar {
    width: 1rem;
}

.table-responsive::-webkit-scrollbar-track {
    background: #fff;
}

.table-responsive::-webkit-scrollbar-thumb {
    background: #f38609;
    border-radius: 5rem;
}

.table-responsive {
    margin-top: 4vh;
}


.action-btn,
.annulla-btn,
.cancel-btn {
    color: white;
    text-align: center;
    padding: 1vh;
    border-radius: 5px;
}

.action-btn {
    background-color: #27ae60;
    margin-bottom: 0.5vh;
}

.annulla-btn {
    background-color: #0da9ef;
}

.cancel-btn {
    background-color: red;
    margin-top: 0.5vh;
}

.annulla-btn:hover {
    background-color: #27ae60;
}


.action-btn:hover,
.cancel-btn:hover {
    background-color: #0da9ef;
}

.drop-down-select {
    position: absolute;
    right: 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    padding: 1vh 1vh;
    text-align: center;
    border: 2px outset black;
    border-radius: 5px;

}

@media (max-width: 983px) {
    .admin-container {
        margin: 0px;
        margin-top: 70px;
        background-color: #fff;
        font-size: 16px;
    }

    .admin-container h1 {
        font-family: 'Satisfy', cursive;
        font-size: 1.2em;
        color: #27ae60;
    }

}
</style>