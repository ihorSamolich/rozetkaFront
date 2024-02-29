import {useMutation, useQuery} from 'react-query';
import {apiClient} from 'utils/api/apiClient.ts';
import {IOrderData, IOrderTopSold, IOrderViewModel} from 'interfaces/order';


const addOrder = async (order : IOrderData) =>{
    const response
        = await apiClient.post('/api/order',order);
    return response.data;
};

const fetchOrders = async ()=> {
    const response
        = await apiClient.get('/api/order');
    return response.data as IOrderViewModel[];
};

const fetchTopSoldProducts = async ()=> {
    const response
        = await apiClient.get('/api/order/popular-products');
    return response.data as IOrderTopSold[];
};

const fetchTopSoldCategories = async ()=> {
    const response
        = await apiClient.get('/api/order/popular-categories');
    return response.data as IOrderTopSold[];
};

const fetchOrdersCount = async ()=> {
    const response
        = await apiClient.get('/api/order/count');
    return response.data as {count: number};
};
export const useOrdersCount = () => {
    return  useQuery<{count: number}, Error>(
        'getOrdersCount',
        fetchOrdersCount,
        {
            staleTime: 30000,
        },
    );
};

export const useAddOrderData = () => {
    return useMutation(addOrder);
};

export const useOrders = () => {
    return  useQuery<IOrderViewModel[], Error>(
        'getOrders',
        fetchOrders,
        {
            staleTime: 30000,
        },
    );
};

export const useOrdersTopSoldCategories = () => {
    return  useQuery<IOrderTopSold[], Error>(
        'getOrderTopSoldCategories',
        fetchTopSoldCategories,
        {
            staleTime: 30000,
        },
    );
};

export const useOrdersTopSoldProducts = () => {
    return  useQuery<IOrderTopSold[], Error>(
        'getOrderTopSoldProducts',
        fetchTopSoldProducts,
        {
            staleTime: 30000,
        },
    );
};