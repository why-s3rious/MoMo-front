import { requestAccountApi } from '../helper/index';

export const loginApi = (data) => {
    const header = {'Content-Type': 'application/json'}
    return requestAccountApi(header, 'login', 'post', data)
}
export const loginFbApi = (data) => {
    const header = {'Content-Type': 'application/json'}
    return requestAccountApi(header, 'login', 'post', data)
}
export const connectFbApi = (fb_id, token) => {
    const header = {'Content-Type': 'application/json', 'Authorization': 'bearer ' + token}
    return requestAccountApi(header, 'connect', 'post', fb_id)
}
export const disConnectFbApi = (token) => {
    const headers = {'Authorization': 'bearer ' + token}
    return requestAccountApi(headers, 'connect', 'delete', null)
}
export const infoApi = (token) => {
    const headers = {'Authorization': 'bearer ' + token}
    return requestAccountApi(headers, 'me', 'get', null)
}
export const registerApi = (data) => {
    const header = {'Content-Type': 'application/json'}
    return requestAccountApi(header, 'register', 'post', data)
}