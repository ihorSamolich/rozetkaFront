import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from 'utils/api/apiClient.ts';
import {handleAxiosError} from 'utils/errors/handleAxiosError.ts';
import {IProductCreate, IProductData, IProductEdit, IProductItem} from 'interfaces/product';
import {IQueryParameters} from 'interfaces/IQueryParameters.ts';

export const getProducts = createAsyncThunk<IProductData, IQueryParameters>(
    'product/getProducts',
    async (queryParams,{rejectWithValue}) => {

        try {
            const response
                = await apiClient.get<IProductData>('/api/products',{
                    params: queryParams,
                });

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const getProductsByCategory = createAsyncThunk<IProductItem[], number>(
    'product/getProductsByCategory',
    async (categoryId,{rejectWithValue}) => {
        try {
            const response
                = await apiClient.get<IProductItem[]>(`/api/products/category/${categoryId}`);

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const getProductById = createAsyncThunk<IProductItem, number>(
    'product/getProductById',
    async (productId,{rejectWithValue}) => {
        try {
            const response
                = await apiClient.get<IProductItem>(`/api/products/${productId}`);

            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const addProduct = createAsyncThunk<IProductItem, IProductCreate>(
    'product/addProduct',
    async (payload,{rejectWithValue}) => {
        try {
            const response
                = await apiClient.post<IProductItem>('/api/products', payload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const updateProduct = createAsyncThunk<IProductItem, IProductEdit>(
    'product/updateProduct',
    async (payload,{rejectWithValue}) => {
        try {

            console.log(payload);

            const response
                = await apiClient.put<IProductItem>('/api/products', payload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
            return response.data;
        }  catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);