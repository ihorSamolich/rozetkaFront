import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, register} from 'store/accounts/accounts.actions.ts';
import {IAccountState, IUser} from 'interfaces/account';
import {jwtDecode} from 'jwt-decode';
import {Status} from 'utils/enums';
import {RejectedAction} from 'utils/types/redux';
import {addLocalStorage, deleteLocalStorage} from 'utils/storage/localStorageUtils.ts';

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
const updateUserState = (state: IAccountState, token: string): void => {
    const { name, email, image } = jwtDecode<IUser>(token);
    state.user = {
        name,
        email,
        image,
    };
    state.token = token;
    state.isLogin = true;

    addLocalStorage('authToken', token);
};

const initialState: IAccountState = {
    user: null,
    token: null,
    isLogin: false,
    status: Status.IDLE,
};

export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        autoLogin: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        logout: (state) => {
            deleteLocalStorage('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const {token} = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(register.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(register.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout } = accountsSlice.actions;
export default accountsSlice.reducer;
