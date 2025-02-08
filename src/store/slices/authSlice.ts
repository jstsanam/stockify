import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../constants/paths";
import { Status } from "../../constants/enums";

export const userSignup = createAsyncThunk(
  "userSignup/postingUserSignup",
  async (data: any) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.SIGN_UP,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  }
);

export const userSignin = createAsyncThunk(
  "userSignin/postingUserSignin",
  async (data: any) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.SIGN_IN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Invalid Email or Password!`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  }
);

interface AuthResponseInterface {
  token: string;
  message: string;
}

interface AuthSlice {
  token: string | null;
  message: string;
  status: Status;
  error: string | null;
}

const initialState: AuthSlice = {
  token: localStorage.getItem("token"),
  message: "",
  status: Status.LOADING,
  error: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        userSignup.fulfilled,
        (state, action: PayloadAction<AuthResponseInterface>) => {
          state.status = Status.SUCCESS;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          state.message = action.payload.message;
        }
      )
      .addCase(userSignup.rejected, (state, error) => {
        state.status = Status.FAILED;
        state.error = error.error.message || "Something went wrong!";
      })
      .addCase(userSignin.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        userSignin.fulfilled,
        (state, action: PayloadAction<AuthResponseInterface>) => {
          state.status = Status.SUCCESS;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          state.message = action.payload.message;
        }
      )
      .addCase(userSignin.rejected, (state, error) => {
        state.status = Status.FAILED;
        state.error = error.error.message || "Something went wrong!";
      });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
