// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import tradingDataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    tradingData: tradingDataReducer,
  },
});

export default store;
