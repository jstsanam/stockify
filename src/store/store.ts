import { configureStore } from "@reduxjs/toolkit";
import stockSliceReducer from "./slices/stockSlice";
import authenticationSliceReducer from "./slices/authSlice";
import profileSliceReducer from "./slices/user/profileSlice";
import watchlistSliceReducer from "./slices/user/watchlistSlice";
import transactionSliceReducer from "./slices/user/transactionsSlice";

export const store = configureStore({
  reducer: {
    stocks: stockSliceReducer,
    authentication: authenticationSliceReducer,
    userProfile: profileSliceReducer,
    userWatchlist: watchlistSliceReducer,
    userTransactions: transactionSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
