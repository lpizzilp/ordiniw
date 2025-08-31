import {createStore} from "vuex"
import axios from "axios"

const store = createStore({
    state() {
        return {
            allFoods: [],
            allReparti: [],
            admin: undefined,
            cassaBarraWidth: null,
            userCassa: null,
        }
    },
    mutations: {
        setFoodsData(state, payload){
            state.allFoods = payload;
        },

        setRepartiData(state, payload){
            state.allReparti = payload;
        },

        setAdmin(state, payload){
            state.admin = payload;
        },

        setCassaBarraWidth(state, width) {
            state.cassaBarraWidth = width
        },

        setCassiere(state, payload){
            state.userCassa = payload;
        },
    },
    actions: {
        async getFoodsData(context){
            await axios.get('/foods')
            .then(function (response) {
                context.commit("setFoodsData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getRepartiData(context){
            await axios.get('/reparti')
            .then(function (response) {
                context.commit("setRepartiData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    }
})

export default store;