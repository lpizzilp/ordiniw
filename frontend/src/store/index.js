import {createStore} from "vuex"
import axios from "axios"

const store = createStore({
    state() {
        return {
            allFoods: [],
            allCategories: [],
            admin: undefined,
        }
    },
    mutations: {
        setFoodsData(state, payload){
            state.allFoods = payload;
        },

        setCategorieData(state, payload){
            state.allCategories = payload;
        },

        setAdmin(state, payload){
            state.admin = payload;
        }
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

        async getCaterieData(context){
            await axios.get('/categorie')
            .then(function (response) {
                context.commit("setCategorieData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    }
})

export default store;