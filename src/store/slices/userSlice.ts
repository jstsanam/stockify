import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../constants/paths";
import { Status } from "../../constants/enums";

export const getUser = createAsyncThunk("user/gettingUser", async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URL + PATH.USER
    );
    return response.json();
  } catch (error) {
    throw error;
  }
});

interface User {
  name: string;
  email: string;
  current_balance: number;
  transactions: object[];
}

interface UserState {
  user: User;
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  user: {
    name: "",
    email: "",
    current_balance: 0,
    transactions: [],
  },
  status: Status.LOADING,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = Status.SUCCESS;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default userSlice.reducer;
