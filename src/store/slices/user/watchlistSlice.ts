import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../../constants/paths";
import { Status } from "../../../constants/enums";
import { Stock } from "../stockSlice";

export const getUserWatchlist = createAsyncThunk(
  "userWatchlist/gettingUserWatchlist",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.WATCHLIST,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error getting user watchlist: ", error);
      throw error;
    }
  }
);

export const addStockToUserWatchlist = createAsyncThunk(
  "userWatchlist/addingStockToWatchlist",
  async (stock: any) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.WATCHLIST,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(stock),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding stock to user watchlist: ", error);
      throw error;
    }
  }
);

export const removeStockFromUserWatchlist = createAsyncThunk(
  "userWatchlist/removingStockFromWatchlist",
  async (stock: any) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.WATCHLIST,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(stock),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error removing stock from user watchlist: ", error);
      throw error;
    }
  }
);

interface UserWatchlistResponse {
  message: string;
  userWatchlist: Stock[];
}

interface UserState {
  watchlist: Stock[];
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  watchlist: [],
  status: Status.LOADING,
  error: null,
};

const watchlistSlice = createSlice({
  name: "userWatchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserWatchlist.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        getUserWatchlist.fulfilled,
        (state, action: PayloadAction<UserWatchlistResponse>) => {
          state.status = Status.SUCCESS;
          state.watchlist = action.payload.userWatchlist;
        }
      )
      .addCase(
        getUserWatchlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.FAILED;
          state.error = action.payload || "Something went wrong!";
        }
      )
      .addCase(addStockToUserWatchlist.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        addStockToUserWatchlist.fulfilled,
        (state, action: PayloadAction<UserWatchlistResponse>) => {
          state.status = Status.SUCCESS;
          state.watchlist = action.payload.userWatchlist;
        }
      )
      .addCase(
        addStockToUserWatchlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.FAILED;
          state.error = action.payload || "Something went wrong!";
        }
      )
      .addCase(removeStockFromUserWatchlist.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        removeStockFromUserWatchlist.fulfilled,
        (state, action: PayloadAction<UserWatchlistResponse>) => {
          state.status = Status.SUCCESS;
          state.watchlist = action.payload.userWatchlist;
        }
      )
      .addCase(
        removeStockFromUserWatchlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.FAILED;
          state.error = action.payload || "Something went wrong!";
        }
      );
  },
});

export default watchlistSlice.reducer;
