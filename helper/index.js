import { hostAPI } from '../configs/index';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
const localHostLogin = 'v1/auth';
const localHost = 'v1';

let getTokenFromAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('@Token');
        return value;
    } catch (error) {
        console.log("Error getting Token" + error);
        return null;
    }
}

export const requestListCategoryApi = async (endpoint, method) => {
    const token = await getTokenFromAsyncStorage();
    console.log(`${hostAPI}/${localHost}/${endpoint}`)
    return axios({
        method: method,
        url: `${hostAPI}/${localHost}/${endpoint}`,
        headers: { 'Authorization': `bearer ${token}` }
    })
        .then(response => {
            return response.data;
        })
        .catch(er => {
            console.log(er.response.status)
            return er.response.status;
        });
}
export const requestStoreApi = async (endpoint, method, searchText, sort, page, categoryId, location) => {
    const token = await getTokenFromAsyncStorage();
    console.log(`${hostAPI}/${localHost}/${endpoint}?q=${searchText}&sort=+-${sort}&p=${page}&category=${categoryId}&location=${location}`)
    return axios({
        method: method,
        url: `${hostAPI}/${localHost}/${endpoint}?q=${searchText}&sort=+-${sort}&p=${page}&category=${categoryId}&location=${location}`,
        headers: { 'Authorization': `bearer ${token}` }
    })
        .then(response => {
            return response.data;
        })
        .catch(er => {
            console.log(er.response.status)
            return er.response.status;
        });
}
export const requestSuggestSearchApi = async (endpoint, method, searchText) => {
    const token = await getTokenFromAsyncStorage();
    console.log(token);
    console.log(`${hostAPI}${localHost}/${endpoint}?q=${searchText}`);
    return axios({
        method: method,
        // url: `${hostAPI}/${localHost}/${endpoint}?q=${searchText}`,
        url: `${hostAPI}/${localHost}/${endpoint}?q=${searchText}`,
        headers: { 'Authorization': `bearer ${token}` }
    })
        .then(response => {
            return response.data;
        })
        .catch(er => {
            console.log(er.response.status)
            return null;
        });
}
export const requestAccountApi = async (headers, endpoint, method, data) => {
    return axios({
        method: method,
        url: `${hostAPI}/${localHostLogin}/${endpoint}`,
        headers: headers,
        data: data
    })
        .then(response => { console.log("data tra ve: ", response.data); return response.data })
        .catch(er => { console.log("error: ", er.response.status); return er.response.status });
}