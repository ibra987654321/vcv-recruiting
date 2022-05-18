import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {environment} from "@/environments/environment";
import {API, SAVE, USER} from "@/helpers/endPoints";
import {getToken, setId, setToken} from "@/helpers/helpers";
import router from "@/router";

import landingForm from "@/store/landingForm";
import testing from "@/store/testing";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        error: null,
        loading: false,
        modals: {
            error: false,
            mini: false,
            text:'',
            type: {
                success: false,
                error: false
            }
        }
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        }
    },
    actions: {
        login(store, payload) {
            store.state.loading = true
            axios({
                method: 'POST',
                url: `${environment.authAPI + API + USER}/login`,
                data: {
                    ...payload
                }
            }).then(res => {
                if (res.data.token) {
                    setToken(res.data.token)
                    router.push({ name: 'profile' })
                }
            }).catch(e => {
                store.state.loading = false
                store.state.modals.mini = true
                store.state.modals.type.error = true
                if (e.response.status == '403') {
                    store.state.modals.text = 'Не правильная почта или код'
                } else {
                    store.state.modals.text = 'Произошла серверная ошибка'
                }
            })
        },
        submitForm(_, payload) {
            axios({
                method: 'POST',
                url: `${environment.authAPI + API}/candidate/saveCandidate`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
               data: {
                    ...payload
               }
            }).then(res => {
                setId(res.data.id)
                router.push({name: 'testing'})
            })
        },

    },
    getters: {
        error: state => state.error
    },
    modules: {
        landingForm,
        testing,
    }
});
