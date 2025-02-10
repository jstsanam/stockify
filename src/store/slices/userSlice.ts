import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../constants/paths";
import { Status } from "../../constants/enums";

export const getUser = createAsyncThunk("user/gettingUser", async (token: string) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_BASE_URL + PATH.USER, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
});

export const updateUser = createAsyncThunk("user/updatingUser", async (data: {token: string, userData: any}) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`
          },
          body: JSON.stringify(data.userData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating user: ", error);
      throw error;
    }
  }
);

interface User {
  name: string;
  email: string;
  gender: string;
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
    gender: ""
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
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = Status.SUCCESS;
        state.user = action.payload;
      })
  },
});

export default userSlice.reducer;
