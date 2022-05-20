import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUserService,
  signUpService,
  updateUserDetailsService,
} from "services";
import { toast } from "react-toastify";

const initialState = {
  token: localStorage.getItem("Expliqa_token") || null,
  user: JSON.parse(localStorage.getItem("Expliqa_user")) || null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await loginUserService(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const { data } = await signUpService(
        email,
        password,
        firstName,
        lastName
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const {
        data: { user },
      } = await updateUserDetailsService(token, userData);
      console.log(user);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("Expliqa_token");
      localStorage.removeItem("Expliqa_user");
      return {
        user: null,
        token: null,
      };
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.token = action.payload.encodedToken;
      state.user = action.payload.foundUser;
      localStorage.setItem("Expliqa_token", state.token);
      localStorage.setItem("Expliqa_user", JSON.stringify(state.user));
      toast.success(`Welcome back ${state.user.firstName}!`);
    },
    [loginUser.rejected]: (state, action) => {
      state.authStatus = "Error";
      state.error = action.payload;
      toast.error("Something went wrong!");
    },

    [signUpUser.pending]: (state) => {
      state.authStatus = "pending";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.token = action.payload.encodedToken;
      state.user = action.payload.createdUser;
      localStorage.setItem("Expliqa_token", state.token);
      localStorage.setItem("Expliqa_user", JSON.stringify(state.user));
      toast.success(`Welcome to Expliqa ${state.user.firstName}!`);
    },
    [signUpUser.rejected]: (state, action) => {
      state.authStatus = "Error";
      state.error = action.payload;
      toast.error("Something went wrong!");
    },
    [updateUserDetails.pending]: (state) => {
      state.authStatus = "pending";
    },
    [updateUserDetails.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("Expliqa_user", JSON.stringify(state.user));
    },
    [updateUserDetails.rejected]: (state, action) => {
      state.authStatus = "Error";
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
