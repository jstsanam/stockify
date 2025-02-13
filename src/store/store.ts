import { configureStore } from "@reduxjs/toolkit";
import stockSliceReducer from "./slices/stockSlice";
import transactionsHistorySliceReducer from "./slices/transactionsHistorySlice";
import authenticationSliceReducer from "./slices/authSlice";
import profileSliceReducer from "./slices/user/profileSlice";
import watchlistSliceReducer from "./slices/user/watchlistSlice";

export const store = configureStore({
  reducer: {
    stocks: stockSliceReducer,
    transactionsHistory: transactionsHistorySliceReducer,
    authentication: authenticationSliceReducer,
    userProfile: profileSliceReducer,
    userWatchlist: watchlistSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
