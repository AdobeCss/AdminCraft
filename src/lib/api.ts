
import { Descriptograh } from '@/utils/cripto';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';

export const BASE_URL = 'http://192.168.1.141:8888';

export function getApiClient(ctx?:any) {

const { 'nextauth.token_Mweto': token } = parseCookies(ctx);

const token_= Descriptograh("nextauth.token_Mweto") as string


const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token_}` }),
  },
});

api.interceptors.request.use((config: AxiosRequestConfig) =>{
  
  const updatedToken = parseCookies()['nextauth.token_Mweto'];
  
    if (updatedToken) {
      config.headers['Authorization'] = `Bearer ${token_}` as AxiosRequestConfig
    }
    return config;    
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

return api 

}



