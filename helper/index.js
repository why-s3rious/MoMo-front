import { hostAPI } from '../configs/index';
import axios from 'axios';
const localHost = ':80/v1';
// :80/v1/search?q=cafe&sort=%2B-time%2Fdistance%2Fmatch&p=2&category=1&location=long,lat
// getToken = () =>{
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njg4NzE1MjksImlhdCI6MTU2ODc4NTEyOSwic3ViIjoxMDAyMzU1MTgxODAyMn0.VKVdA9eUu9mc26-fGhivrL_dYTev1Wk2p1Xoc35uIJw";
// }

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

export const requestAccountApi = async (endpoint, method, data) => {
    const header = 'fake user token';
    return axios({
        method: method,
        url: `${hostAPI}/${localHost}/${endpoint}`,
        herder: header,
        data: data,
    })
        .then(response => { console.log(response.data); return response.data })
        .catch(er => console.log("er: ", er));
}