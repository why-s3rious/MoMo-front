import { requestAccountApi } from '../helper/index';

export const checkLoginApi = () => {
    return requestAccountApi('user', 'get', null)
}
export const registerApi = (account) => {
    return requestAccountApi('user', 'post', account)
}