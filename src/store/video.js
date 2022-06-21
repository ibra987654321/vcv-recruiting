import axios from 'axios'
import { environment } from '@/environments/environment'
import {API, QUESTION, SAVE, TEST, USER, VIDEO} from "@/helpers/endPoints";
import {getId, getToken, getCandidateType} from "@/helpers/helpers";

export default {
    state: {
        questionData: []
    },
    mutations: {
        setData(state, data) {
            state.questionData.push(data)
        }
    },
    actions: {
        sendVideo(_, formData) {
            const data = axios.post(`${environment.authAPI + API  + VIDEO}/upload/${getId()}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer_${getToken()}`,
                    },
                }
            ).then(r => r.data)

            return data
        },
        getVideoQuestions({commit}) {
            const questions = axios(`${environment.authAPI + API + QUESTION}/forVideo/${getCandidateType()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => {
                commit('setData', r.data)
                return r.data
            })

            return questions
        }
    },
}
