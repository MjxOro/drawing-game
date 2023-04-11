'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/auth/authSlice';
import modalReducer from './Features/modal/modalSlice';
import landingReducer from './Features/landing/landingSlice';
import type { TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    landing: landingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

