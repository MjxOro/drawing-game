'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { verifyMessage, ethers } from 'ethers';

export type AuthState = {
  isAuth: boolean;
  address: string;
  message: string;
  isLoading: boolean;
};
const initialState: AuthState = {
  isAuth: false,
  address: '',
  message: 'Login To Game?',
  isLoading: true,
};

export const checkAuth = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const ethereum = typeof window !== 'undefined' ? window.ethereum : null
      const message = state.auth.message;
      const signature = sessionStorage.getItem('access_token');
      const verify = verifyMessage(message as string, signature as string);
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      return { address: address };
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue('unauthorized');
    }
  }
);

export const connect = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'auth/connect',
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const message = state.auth.message;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message as string);
      sessionStorage.setItem('access_token', signature);
      const address = await signer.getAddress();

      return { address: address };
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue('unauthorized');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.isAuth = false;
      state.address = '';
      state.isLoading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(checkAuth.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.address = action.payload.address;
      state.isAuth = true;
    });
    builder.addCase(checkAuth.rejected, (state, _) => {
      sessionStorage.removeItem('access_token')
      state.isLoading = false;
      state.address = '';
      state.isAuth = false;
    });
    builder.addCase(connect.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(connect.fulfilled, (state, action) => {
      state.isLoading = false;
      state.address = action.payload.address;
      state.isAuth = true;
    });
    builder.addCase(connect.rejected, (state, _) => {
      state.isLoading = false;
      state.address = '';
      state.isAuth = false;
    });
  },
});
export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
