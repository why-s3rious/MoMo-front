import { requestAccountApi } from '../helper/index';

export const loginApi = (data) => {
    const header = {'Content-Type': 'application/json'}
    return requestAccountApi(header, 'login', 'post', data)
}
export const infoApi = (token) => {
    const headers = {'Authorization': 'bearer ' + token}
    return requestAccountApi(headers, 'me', 'get', null)
}
export const registerApi = (accountInfo) => {
    return requestAccountApi('login', 'post', accountInfo)
}