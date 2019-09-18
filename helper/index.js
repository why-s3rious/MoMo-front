import { hostAPI } from '../configs/index';
import axios from 'axios';
const localHostLogin = 'v1/auth';
const localHost = 'v1';

export const requestStoreApi = async (endpoint, method, searchText, sort, page, categoryId, location) => {
    console.log(`${hostAPI}${localHost}/${endpoint}?q=${searchText}&sort=${sort}&p=${page}&category=${categoryId}&location=${location}`)
    const header = 'fake user token';
    return axios({
        method: method,
        url: `${hostAPI}${localHost}/${endpoint}?q=${searchText}&sort=${sort}&p=${page}&category=${categoryId}&location=${location}`,
        headers: { 'Authorization': `bearer ${token}` }
    })
        .then(response => {
            return response.data.stores;
        })
        .catch(er => {
            console.log(er.response.status)
            // handle er
        });
}

export const requestAccountApi = async (headers, endpoint, method, data) => {
    return axios({
        method: method,
        url: `${hostAPI}/${localHostLogin}/${endpoint}`,
        headers: headers,
        data: data
    })
        .then(response => { console.log(response.data); return response.data })
        .catch(er => {console.log("error: ", er.response.status); return er.response.status});
}