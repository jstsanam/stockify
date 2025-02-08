import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/stockSlice";
import transactionsHistoryReducer from "./slices/transactionsHistorySlice";
import authenticationReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
    transactionsHistory: transactionsHistoryReducer,
    authentication: authenticationReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
