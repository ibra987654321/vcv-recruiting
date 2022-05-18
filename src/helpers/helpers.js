export const getToken = () => localStorage.getItem('vcv-token')

export const setToken = token => {
    localStorage.setItem('vcv-token', token)
}
export const removeToken = () => {
    localStorage.removeItem('vcv-token')
}

export const setId = id => {
    localStorage.setItem('candidate-id', id)
}

export const getId = () => localStorage.getItem('candidate-id')
export const removeId = () => {
    localStorage.removeItem('candidate-id')
}
