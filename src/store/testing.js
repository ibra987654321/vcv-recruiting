import axios from 'axios'
import { environment } from '@/environments/environment'
import {API, QUESTION, SAVE, TEST, USER} from "@/helpers/endPoints";
import {getId, getToken} from "@/helpers/helpers";

export default {
    state: {

    },
    mutations: {},
    actions: {
        sendAnswer(store, payload) {
            axios({
                method: 'POST',
                url: `${environment.authAPI + API + TEST}/saveTest/${getId()}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },

                data:[
                    ...payload
                ]
            })
        },
        getQuestions(store) {
            store.rootState.loading = true
            const questions = axios(`${environment.authAPI + API + QUESTION}/getAll`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => r.data)

            return questions
        }
    },
}
