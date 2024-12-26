import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/stockSlice";
import portfolioTxnsReducer from "./slices/portfolioTxnsSlice";

export const store = configureStore({
  reducer: { stocks: stockReducer, portfolioTxns: portfolioTxnsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
