import { hostAPI } from '../configs/index';
import axios from 'axios';
const localHost = ':80/v1';
// :80/v1/search?q=cafe&sort=%2B-time%2Fdistance%2Fmatch&p=2&category=1&location=long,lat
// getToken = () =>{
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njg3OTAwMzAsImlhdCI6MTU2ODcwMzYzMCwic3ViIjoxMDAyMzU1MTgxODAyMn0.NCZZWs8nR1MuO3qaXyi0w5Xg_2-s5oLV2MT-fgPdO3Q";
// }

export const requestStoreApi = async (endpoint, method, searchText, sort, page, categoryId, location) => {
    console.log(`${hostAPI}/${localHost}/${endpoint}?q=${searchText}&sort=${sort}&p=${page}&category=${categoryId}&location=${location}`)
    const header = 'fake user token';
    return axios({
        method: method,
        url: `${hostAPI}/${localHost}/${endpoint}?q=${searchText}&sort=${sort}&p=${page}&category=${categoryId}&location=${location}`,
        headers: { 'authorization': `Bearer ${token}` }
    })
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(er => {
            let text = er.toString().split(" ");
            console.log("error: ",text[6]);
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