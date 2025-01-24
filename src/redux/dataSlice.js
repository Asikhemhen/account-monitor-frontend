// src/redux/tradingDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tradingData: [],
};

const tradingDataSlice = createSlice({
  name: "tradingData",
  initialState,
  reducers: {
    setTradingData: (state, action) => {
      state.tradingData = action.payload;
    },
  },
});

export const { setTradingData } = tradingDataSlice.actions;

export default tradingDataSlice.reducer;
