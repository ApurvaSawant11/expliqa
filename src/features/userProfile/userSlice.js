import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllUsersService,
  followUserService,
  unFollowUserService,
} from "services";
import { updateUserDetails } from "features/auth/authSlice";

const initialState = {
  allUsers: [],
  userStatus: "",
  notFollowing: [],
};

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUsersService();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const followUnFollowUser = createAsyncThunk(
  "user/followUnFollowUser",
  async ({ userId, dispatch, isFollow }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const response = !isFollow
        ? await unFollowUserService(token, userId)
        : await followUserService(token, userId);
      dispatch(updateUserDetails(response.data.user));
      return response.data;
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
    [followUnFollowUser.pending]: (state) => {
      state.userStatus = "pending";
    },
    [followUnFollowUser.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.allUsers = [...state.allUsers].map((user) => {
        if (action.payload.followUser.username === user.username) {
          return action.payload.followUser;
        }
        return user;
      });
    },
    [followUnFollowUser.rejected]: (state, action) => {
      state.userStatus = "rejected";
      state.allUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
