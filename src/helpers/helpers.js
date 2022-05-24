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
export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
