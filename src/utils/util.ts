/* eslint-disable */
import axios from 'axios'
axios.interceptors.request.use(
    config => {
        config.headers = {
            ...config.headers,
            'authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
) 


export function axiosGet(url: string, params?: any): any{
    return axios.get(`/api${url}`, { params });
}

export function axiosPost(url: string, data?: any): any{
    return axios.post(`/api${url}`, data);
}