import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchStocks = createAsyncThunk(
  "stocks/fetchingStocks",
  async () => {
    try {
      const response = await fetch(
        "https://dev-1gyvfva3nqtb0v4.api.raw-labs.com/mock/stocks"
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: { stocks: [], status: "", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStocks.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const stockSliceActions = stockSlice.actions;

export default stockSlice.reducer;
