import { hostAPI } from '../configs/index';
import axios from 'axios';
<<<<<<< HEAD
<<<<<<< Updated upstream
const localHost = ':80/v1';
// :80/v1/search?q=cafe&sort=%2B-time%2Fdistance%2Fmatch&p=2&category=1&location=long,lat
// getToken = () =>{
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njg4NzE1MjksImlhdCI6MTU2ODc4NTEyOSwic3ViIjoxMDAyMzU1MTgxODAyMn0.VKVdA9eUu9mc26-fGhivrL_dYTev1Wk2p1Xoc35uIJw";
// }
=======
import {AsyncStorage} from 'react-native';
const localHostLogin = 'v1/auth';
const localHost = 'v1';
>>>>>>> Stashed changes

let getTokenFromAsyncStorage = async () => {
    try {
        return await AsyncStorage.getItem('@Token');
    } catch (error) {
        console.log("Error getting Token" + error);
        return null;
    }
}
=======
const localHostLogin = 'v1/auth';
const localHost = 'v1';
>>>>>>> fc4a7694e86e94ece618d9bf5fe310e3c470b28e

export const requestStoreApi = async (endpoint, method, searchText, sort, page, categoryId, location) => {
    console.log(`${hostAPI}${localHost}/${endpoint}?q=${searchText}&sort=${sort}&p=${page}&category=${categoryId}&location=${location}`)
    const token = getTokenFromAsyncStorage();
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