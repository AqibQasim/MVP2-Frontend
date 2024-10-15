"use client";
// src/store/index.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import paymentReducer from './paymentSlice';

const reducers= combineReducers({
    payment: paymentReducer,
})

const store = configureStore({
    reducer: reducers
});

export default store;
