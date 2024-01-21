<template>
    <div class="admin-container">
        <div class="header">
            <h1><i class="fa-solid fa-utensils"> Ordini</i></h1>
            <button class="btn download" @click="Exportfunction()"><i class="fa-solid fa-download" style="padding-right: 1vh;"></i>Download in Excel</button>
            <button class="btn" @click="getAllBills()"><i class="fa-solid fa-retweet" style="padding-right: 1vh;"></i>Aggiorna</button>
        </div>

        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Tavolo</th>
                        <th>Coperti</th>
                        <th>Nominativo</th>
                        <th>Data Ordine</th>
                        <th>Tipo</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in filterBills.slice()" :key="b.bill_id">
                        <td>{{ b.bill_tavolo }}</td>
                        <td>{{ b.bill_coperti }}</td>
                        <td>{{ b.Nominativo }}</td>
                        <td>{{ formattype('T', b.bill_when) }}</td>
                        <td>{{ formattype('C', b.TipoCassa) }}</td>
                        <td>{{ b.bill_total }}€</td>
                        <td v-if="b.bill_status == 0"><i class="fa-solid fa-square-xmark"></i> {{ avaiableStatus[b.bill_status] }}</td>
                        <td v-else-if="b.bill_status == 1"><i class="fa-regular fa-square-minus"></i> {{ avaiableStatus[b.bill_status] }}</td>
                        <td v-else-if="b.bill_status == 2 || 3"><i class="fa-regular fa-square-check"></i> {{ avaiableStatus[b.bill_status] }}</td>
                        <td>
                            <button v-if="b.bill_status == 0" class="annulla-btn" @click="nextStatusBtn(b.bill_id)">
                                Annulla
                            </button>

                            <button v-if="b.bill_status < 3 && b.bill_status > 0" class="action-btn" @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>

                            <button v-if="b.bill_status == 1" class="cancel-btn" @click="cancelBtn(b.bill_id)">
                                Cancella
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
import ExcelJS from 'exceljs';
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Dashboard',

    data() {
        return {
            avaiableStatus: ["cancellato", "attesa", "confermato", "completato"],
            allBills: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllBills();
        if (!this.admin) {
            this.$router.push("/login");
        }
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["allFoods", "admin"]),

        filterBills: function () {
            return this.allBills.filter((b) => b.bill_status < 4 && b.bill_status >= 0);
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        async getAllBills() {
            this.allBills = (await axios.get('/billstatus')).data;
        },

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        handleLogout: function () {
            this.setAdmin("");
        },

        formattype(typeformat, data) {
            let resul = ""
            switch (typeformat) {
                case 'T':
                    resul = moment(data, 'YYYY/MM/DDTHH:mm').format('DD/MM/YYYY');
                    break;

                case 'C':
                    if (data == 'W') {
                        resul = 'Tavolo'
                    } else {
                        resul = 'Asporto'
                    }
                    break;
            }

            return resul;
        },

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllBills();
        },

        async cancelBtn(id) {
            await axios.put('/billstatus/cancel/' + id);
            this.getAllBills();
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllBills();
            }.bind(this), 300000);
        },

        async Exportdata() {
            let plus = 0 // incremento righe
            var data = [[]] //array dei dati

            // recupera ordini
            this.allBills = (await axios.get('/billstatus')).data;

            data[0] = ['Id Ordine', 'Tavolo', 'Coperti', 'Nominativo', 'Data Ordine', 'Tipo', 'Totale']
            plus = plus + 1

            // carico dati
            for (let i = 0; i < this.allBills; i++) {
                this.allPenot = (await axios.get('/getprenotazione/' + this.totqty[i].food_id)).data;
                data[0 + plus] = [this.allBills[i].bill_id, this.allBills[i].bill_tavolo, this.allBills[i].bill_coperti, this.allBills[i].bill_nominativo, this.allBills[i].bill_when, this.allBills[i].TipoCassa, this.allBills[i].bill_total]
                plus = plus + 1
            }

            console.log(data)
            return data
        },


        async Exportfunction() {
            this.totqty = (await axios.get('/prenotazione/sum')).data;
            // Creare un nuovo workbook e foglio Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Dati');

            // Imposta la larghezza delle colonne
            worksheet.getColumn('A').width = 20;
            worksheet.getColumn('B').width = 20;
            worksheet.getColumn('C').width = 20;
            worksheet.getColumn('D').width = 20;
            worksheet.getColumn('E').width = 20;
            worksheet.getColumn('F').width = 20;
            worksheet.getColumn('G').width = 20;

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
                a.download = 'Ordini_excel.xlsx';
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
    padding: 3px 5px;
}

.table-responsive {
    margin-top: 8vh;
}


.annulla-btn,
.action-btn,
.cancel-btn {
    color: white;
    text-align: center;
    padding: 0.5vh;
    border-radius: 5px;
}

.action-btn {
    background-color: #27ae60;
    margin-bottom: 0.5vh;
    margin-right: 0.3vh;
}

.cancel-btn {
    background-color: red;
    margin-top: 0.5vh;
    margin-left: 0.3vh;
}

.annulla-btn {
    background-color: #0da9ef;
}
.annulla-btn:hover {
    background-color: #27ae60;
}


.action-btn:hover,
.cancel-btn:hover {
    background-color: #0da9ef;
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