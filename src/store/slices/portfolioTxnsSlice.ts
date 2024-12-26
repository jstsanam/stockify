import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const portfolioTxns = createAsyncThunk(
  "portfolioTxns/fetchingPortfolioTxns",
  async () => {
    try {
      const response = await fetch(
        "https://dev-1gyvfva3nqtb0v4.api.raw-labs.com/mock/portfolio-transactions"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Filter items with status "Passed" and take the top 3
      const filteredData = data.filter((item: any) => item.status === "Passed").slice(0, 3);

      return filteredData;
    } catch (error) {
      console.error("Fetch error: ", error);
      throw error;
    }
  }
);

const portfolioTxnsSlice = createSlice({
  name: "portfolioTxns",
  initialState: { portfolioTxns: [], status: "", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(portfolioTxns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(portfolioTxns.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.portfolioTxns = action.payload;
      })
      .addCase(portfolioTxns.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const portfolioTxnsSliceActions = portfolioTxnsSlice.actions;

export default portfolioTxnsSlice.reducer;
