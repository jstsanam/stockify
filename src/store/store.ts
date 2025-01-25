import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/stockSlice";
import transactionsHistoryReducer from "./slices/transactionsHistorySlice";

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
    transactionsHistory: transactionsHistoryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
