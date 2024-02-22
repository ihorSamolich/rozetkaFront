import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from 'utils/api/apiClient.ts';
import {ILogin, IRegistration} from 'interfaces/account';
import {handleAxiosError} from 'utils/errors/handleAxiosError.ts';

export const login = createAsyncThunk(
    'account/login',
    async (payload : ILogin, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/account/login', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const register = createAsyncThunk(
    'account/register',
    async (payload : IRegistration, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/account/register', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }

    },
);