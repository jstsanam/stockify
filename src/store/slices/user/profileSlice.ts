import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import PATH from "../../../constants/paths";
import { Status } from "../../../constants/enums";

export const getUserProfile = createAsyncThunk(
  "userProfile/gettingUserProfile",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.PROFILE,
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
      console.error("Error getting user: ", error);
      throw error;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "userProfile/updatingUserProfile",
  async (userData: any) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + PATH.USER + PATH.PROFILE,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(userData),
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

interface UserProfile {
  name: string;
  email: string;
  gender: string;
  current_balance: number;
}

interface UserProfileResponse {
  message: string;
  userProfile: UserProfile;
}

interface UserState {
  profile: UserProfile;
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  profile: {
    name: "",
    email: "",
    gender: "",
    current_balance: 0
  },
  status: Status.LOADING,
  error: null,
};

const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileResponse>) => {
          state.status = Status.SUCCESS;
          state.profile = action.payload.userProfile;
        }
      )
      .addCase(getUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileResponse>) => {
          state.status = Status.SUCCESS;
          state.profile = action.payload.userProfile;
        }
      )
      .addCase(
        updateUserProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = Status.FAILED;
          state.error = action.payload || "Something went wrong!";
        }
      );
  },
});

export default profileSlice.reducer;
