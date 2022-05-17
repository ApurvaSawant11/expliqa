import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersService } from "services";

const initialState = {
  allUsers: [],
  userStatus: "",
};

export const getAllUsers = createAsyncThunk(
  "post/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUsersService();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.userStatus = "pending";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.allUsers = action.payload.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.userStatus = "rejected";
      state.allUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
