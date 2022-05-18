import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllPostsService,
  getUserPostsService,
  addPostService,
  deletePostService,
  editPostService,
  addPostCommentService,
  editPostCommentService,
  deletePostCommentService,
} from "services";

const initialState = {
  allPosts: [],
  userPosts: [],
};

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllPostsService();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "post/getUserPosts",
  async (username, { rejectWithValue }) => {
    try {
      const {
        data: { posts },
      } = await getUserPostsService(username);
      return posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (postData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const {
        data: { posts },
      } = await addPostService(postData, token);
      return posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async (postData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await editPostService(postData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await deletePostService(postId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPostComment = createAsyncThunk(
  "post/addPostComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await addPostCommentService(postId, commentData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPostComment = createAsyncThunk(
  "post/editPostComment",
  async ({ postId, commentId, commentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await editPostCommentService(
        postId,
        commentId,
        commentData,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deletePostComment = createAsyncThunk(
  "post/deletePostComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await deletePostCommentService(postId, commentId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.postStatus = "pending";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload.posts;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },

    [getUserPosts.pending]: (state) => {
      state.postStatus = "pending";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.userPosts = action.payload;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },

    [addNewPost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload;
    },
    [addNewPost.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },

    [editPost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [editPost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload.posts;
    },
    [editPost.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },

    [deletePost.pending]: (state) => {
      state.postStatus = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload.posts;
    },
    [deletePost.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },
    [addPostComment.pending]: (state) => {
      state.postStatus = "pending";
    },
    [addPostComment.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload.posts;
    },
    [addPostComment.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },
    [editPostComment.pending]: (state) => {
      state.postStatus = "pending";
    },
    [editPostComment.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload.posts;
    },
    [editPostComment.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },
    [deletePostComment.pending]: (state) => {
      state.postStatus = "pending";
    },
    [deletePostComment.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload.posts;
    },
    [deletePostComment.rejected]: (state, action) => {
      state.postStatus = "rejected";
      state.allPosts = action.payload;
    },
  },
});

export default postSlice.reducer;
