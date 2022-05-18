import axios from 'axios'

import { environment } from '@/environments/environment'
import {API, SAVE, USER} from "@/helpers/endPoints";

export default {
    state: {
        form: {
            name: "",
            email: "",
            phoneNumber: "",
        },
    },
    mutations: {},
    actions: {
        sendToEmail(store, payload) {
            store.rootState.loading = true
            axios({
                method: 'POST',
                url: `${environment.authAPI + API + USER + SAVE}`,
                data: {
                    ...payload
                }
            }).then(res => {
                store.rootState.loading = false
                store.rootState.modals.mini = true
                store.rootState.modals.type.success = true
                store.rootState.modals.text = 'Регистрация прошла успешно! Проверьте свою почту'
            }).catch(e => {
                store.rootState.loading = false
                store.rootState.modals.mini = true
                store.rootState.modals.type.error = true
                store.rootState.modals.text = 'Произошла серверная ошибка'
            })
        },
    },
}
