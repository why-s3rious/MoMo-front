import { requestAccountApi } from '../helper/index';

export const getAllAccountApi = () => {
    return requestAccountApi('user', 'get', null)
}
export const registerApi = (account) => {
    return requestAccountApi('user', 'post', account)
}