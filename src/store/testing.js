import axios from 'axios'
import { environment } from '@/environments/environment'
import {API, QUESTION, SAVE, TEST, USER} from "@/helpers/endPoints";
import {getId, getToken, getCandidateType} from "@/helpers/helpers";

export default {
    state: {
        iterator: 0
    },
    mutations: {},
    actions: {
        sendAnswer(store, payload) {
            axios({
                method: 'POST',
                url: `${environment.authAPI + API + TEST}/save/${getId()}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },

                data: [
                    ...payload
                ]
            })
                .then(r => r)
                .catch(e => {
                store.rootState.loading = false
                store.rootState.modals.mini = true
                store.rootState.modals.type.error = true
                store.rootState.modals.text = 'Произошла серверная ошибка'
            })
        },
        getQuestions(store) {
            store.rootState.loading = true
            const questions = axios(`${environment.authAPI + API + QUESTION}/forTest/${getCandidateType()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => {
               return  r.data
            })

            return questions
        }
    },
}
