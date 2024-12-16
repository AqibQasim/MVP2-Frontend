"use client";
// src/store/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMethodId: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setSelectedMethodId:(state, action)=> {
      state.selectedMethodId = action.payload;
    },
  },
});

export const { setSelectedMethodId } = paymentSlice.actions;
export default paymentSlice.reducer;
