import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {APP_ENV} from 'env/index.ts';
import {isTokenActive} from 'utils/storage/isTokenActive.ts';
import {getLocalStorage} from 'utils/storage/localStorageUtils.ts';

interface IApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: APP_ENV.BASE_URL,
} as IApiClientConfig);

apiClient.interceptors.request.use((config) => {
    const token = getLocalStorage('authToken') as string;
    if (isTokenActive(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});