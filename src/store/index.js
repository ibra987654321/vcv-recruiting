import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import {environment} from "@/environments/environment";
import {API, CANDIDATE_TYPE, KNOWLEDGE_TYPE, QUESTION, SAVE, USER} from "@/helpers/endPoints";
import {getToken, setId, setToken, getCandidateType, setCandidateType, getId} from "@/helpers/helpers";
import router from "@/router";

import landingForm from "@/store/landingForm";
import testing from "@/store/testing";
import video from "@/store/video";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
    state: {
        error: null,
        loading: false,
        modals: {
            error: false,
            mini: false,
            text:'',
            action: '',
            type: {
                success: false,
                error: false
            }
        },
        candidateType: '',
        candidateId: '',
        iterator: 0
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
        setCandidate(state, data) {
            state.candidateType = data
        },
        setCandidateId(state, data) {
            state.candidateId = data
        },
        setAction(state, func) {
            state.modals.action = func
        },
        setIterator(state, count) {
            state.iterator = count
        }
    },
    actions: {
        login({state, commit}, payload) {
            state.loading = true
            axios({
                method: 'POST',
                url: `${environment.authAPI + API + USER}/login`,
                data: {
                    ...payload
                }
            }).then(res => {
                if (res.data.token) {
                    commit('setIterator', res.data.index)
                    setToken(res.data.token)
                    setId(res.data.candidateId)
                    setCandidateType(res.data.candidateTypeId)
                    router.push({ name: res.data.stage })
                }
            }).catch(e => {
                state.loading = false
                state.modals.mini = true
                state.modals.type.error = true
                if (e.response.status === 403 || 401) {
                    state.modals.text = e.response.data
                } else {
                    state.modals.text = 'Произошла серверная ошибка'
                }
            })
        },
        submitForm({state, commit}, payload) {
            function navigate() {
                router.push({ name: 'login' })
                state.modals.mini = false
            }
            axios({
                method: 'POST',
                url: `${environment.authAPI + API}/candidate/save`,
                headers: {
                    'Content-Type': 'application/json',
                },
               data: {
                    ...payload
               }
            }).then(res => {
                state.loading = false
                state.modals.mini = true
                state.modals.type.success = true
                state.modals.text = `Мы отправили на почту код, подтвердите пожалуйста!`
                commit('setAction', navigate)

            })
        },
        candidateType({commit}) {
            const candidateTypes = axios(`${environment.authAPI + API + CANDIDATE_TYPE}/allActiveAndExternal`, {
                method: 'GET',
            }).then(r => {
                commit('setCandidate', r.data)
            })

            return candidateTypes
        },
        knowledgeType() {
            const knowledgeType = axios(`${environment.authAPI + API + KNOWLEDGE_TYPE}/all/${getCandidateType()}`, {
                method: 'GET',
            }).then(r => r.data)

            return knowledgeType
        },
        percentage() {
            const data = axios(`${environment.authAPI + API}/test/percentage/${getId()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => r.data)

            return data
        }

    },
    getters: {
        error: state => state.error
    },
    modules: {
        landingForm,
        testing,
        video
    }
});
