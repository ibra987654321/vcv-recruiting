import axios from 'axios'
import { environment } from '@/environments/environment'
import {API, QUESTION, SAVE, TEST, USER, VIDEO} from "@/helpers/endPoints";
import {getId, getToken} from "@/helpers/helpers";

export default {
    state: {

    },
    mutations: {},
    actions: {
        sendVideo(_, formData) {
            const data = axios.post(`${environment.authAPI + VIDEO}/uploadVideo/${getId()}`,
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
        getVideoQuestions(_) {
            const questions = axios(`${environment.authAPI + API + QUESTION}/forVideo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${getToken()}`,
                },
            }).then(r => r)

            return questions
        }
    },
}
