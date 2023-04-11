'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/auth/authSlice';
import modalReducer from './Features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

