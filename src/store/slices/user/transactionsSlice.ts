import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../../constants/paths";
import { Status, TransactionStatus } from "../../../constants/enums";

export const getUserTransactions = createAsyncThunk(
  "userTransactions/gettingUserTransactions",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.TRANSACTIONS,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting user transactions: ", error);
      throw error;
    }
  }
);

export const addUserTransaction = createAsyncThunk(
  "userTransactions/addingUserTransaction",
  async (transaction: any) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.TRANSACTIONS,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(transaction),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error making user transaction: ", error);
      throw error;
    }
  }
);

interface Transaction {
  stock_id: string;
  stock_name: string;
  stock_quantity: number | string;
  timestamp: string;
  transaction_price: number;
  type: string;
  status: string;
}

interface StockHolding {
  stock_id: string;
  stock_name: string;
  quantity: number;
}

interface UserDataResponse {
  message: string;
  userData: {
    transactions: Transaction[];
    stockHoldings: StockHolding[];
  };
}

interface UserState {
  transactions: Transaction[];
  passedTransactions: Transaction[];
  stockHoldings: StockHolding[];
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  transactions: [],
  passedTransactions: [],
  stockHoldings: [],
  status: Status.LOADING,
  error: null,
};

const transactionsSlice = createSlice({
  name: "userTransactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTransactions.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        getUserTransactions.fulfilled,
        (state, action: PayloadAction<UserDataResponse>) => {
          state.status = Status.SUCCESS;
          const transactions = action.payload.userData.transactions;
          const passedTransactions = transactions.filter(
            (transaction: any) =>
              transaction.status === TransactionStatus.PASSED
          );

          state.transactions = transactions;
          state.passedTransactions = passedTransactions;
          state.stockHoldings = action.payload.userData.stockHoldings;
        }
      )
      .addCase(
        getUserTransactions.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.FAILED;
          state.error = action.payload || "Something went wrong!";
        }
      )
      .addCase(addUserTransaction.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        addUserTransaction.fulfilled,
        (state, action: PayloadAction<UserDataResponse>) => {
          state.status = Status.SUCCESS;
          const transactions = action.payload.userData.transactions;
          const passedTransactions = transactions.filter(
            (transaction: any) =>
              transaction.status === TransactionStatus.PASSED
          );

          state.transactions = transactions;
          state.passedTransactions = passedTransactions;
          state.stockHoldings = action.payload.userData.stockHoldings;
        }
      )
      .addCase(
        addUserTransaction.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.FAILED;
          state.error = action.payload || "Something went wrong!";
        }
      );
  },
});

export default transactionsSlice.reducer;
