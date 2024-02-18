<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1><i class="fa-solid fa-chart-line"> Dashboard</i></h1>
        </div>

        <div v-if="tabFunzioni[0] == true" class="table-open">
            <h2 @click="OpenGrid(0)"><i class="fa-solid fa-utensils" style="padding-right: 2vh; color: #f38609;"></i>Ordini
            </h2>
            <i @click="OpenGrid(0)" class="fa-solid fa-chevron-up"></i>
            <hr style="width: 100%; margin: 20px 0px; border-width: 2px; border-color: #27ae60;">
            <table class="project-list">
                <tr>
                    <td>
                        <h3>Apertura/chiusura automatica</h3>
                    </td>
                    <td style="text-align: center;">
                        <h3>{{ status[0] }}</h3>
                    </td>
                    <td v-if="status[0] === 'Abilitato'"><label class="switch" @click="ChangeStatus(0, false)"><input
                                type="checkbox" checked><span class="slider round"></span></label></td>
                    <td v-else><label class="switch" @click="ChangeStatus(0, true)"><input type="checkbox"><span
                                class="slider round"></span></label></td>
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
                    <td v-if="status[1] === 'Abilitato'"><label class="switch" @click="ChangeStatus(1, false)"><input
                                type="checkbox" checked><span class="slider round"></span></label></td>
                    <td v-else><label class="switch" @click="ChangeStatus(1, true)"><input type="checkbox"><span
                                class="slider round"></span></label></td>
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
                    <td v-if="status[2] === 'Abilitato'"><label class="switch" @click="ChangeStatus(2, false)"><input
                                type="checkbox" checked><span class="slider round"></span></label></td>
                    <td v-else><label class="switch" @click="ChangeStatus(2, true)"><input type="checkbox"><span
                                class="slider round"></span></label></td>
                </tr>
            </table>
        </div>
        <div v-else class="table-close" @click="OpenGrid(0)">
            <h2><i class="fa-solid fa-utensils" style="padding-right: 2vh; color: #f38609;"></i>Ordini</h2>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Prenotazioni',

    data() {
        return {
            tabFunzioni: [true],
            status: ['Abilitato', 'Abilitato', 'Abilitato',],
        }
    },

    created() {
        if (!this.admin) {
            this.$router.push("/login");
        }
    },

    computed: {
        ...mapState(["admin"]),
    },

    methods: {
        ...mapMutations(["setAdmin"]),

        handleLogout: function () {
            this.setAdmin("");
        },

        OpenGrid(index) {
            if (this.tabFunzioni[index] == true) {
                this.tabFunzioni[index] = false
            } else {
                this.tabFunzioni[index] = true
            }
        },

        ChangeStatus(index, azione) {
            if (azione === true) {
                this.status[index] = 'Abilitato'
            } else if (azione === false) {
                this.status[index] = 'Disabilitato'
            }
        },
    }
}
</script>

<style scoped>
.admin-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: 20%;
    background-color: whitesmoke;
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

.switch {
    position: relative;
    display: inline-block;
    width: 54px;
    height: 28px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
}

.slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 2.8px;
    background-color: white;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
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

}</style>