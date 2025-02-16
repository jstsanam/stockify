import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../constants/paths";
import { Status } from "../../constants/enums";

export const fetchStocks = createAsyncThunk(
  "stocks/fetchingStocks",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.STOCKS
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching stocks: ", error);
      throw error;
    }
  }
);

export interface Stock {
  base_price: number;
  stock_name: any;
}

interface StocksState {
  stocks: Stock[];
  status: Status;
  error: string | null;
}

const initialState: StocksState = {
  stocks: [],
  status: Status.LOADING,
  error: null,
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchStocks.fulfilled,
        (state, action: PayloadAction<Stock[]>) => {
          state.status = Status.SUCCESS;
          state.stocks = action.payload;
        }
      )
      .addCase(fetchStocks.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default stockSlice.reducer;
