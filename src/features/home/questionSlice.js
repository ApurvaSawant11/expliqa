import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllQuestionsService,
  getUserQuestionsService,
  addQuestionService,
  deleteQuestionService,
  editQuestionService,
} from "services";

const initialState = {
  allQuestions: [],
  userQuestions: [],
};

export const getAllQuestions = createAsyncThunk(
  "question/getAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllQuestionsService();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserQuestions = createAsyncThunk(
  "question/getUserQuestions",
  async (username, { rejectWithValue }) => {
    try {
      const {
        data: { questions },
      } = await getUserQuestionsService(username);
      return questions;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewQuestion = createAsyncThunk(
  "question/addNewQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const {
        data: { questions },
      } = await addQuestionService(questionData, token);
      return questions;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editQuestion = createAsyncThunk(
  "question/editQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await editQuestionService(questionData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await deleteQuestionService(questionId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllQuestions.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [getAllQuestions.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [getAllQuestions.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [getUserQuestions.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [getUserQuestions.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.userQuestions = action.payload;
    },
    [getUserQuestions.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [addNewQuestion.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [addNewQuestion.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload;
    },
    [addNewQuestion.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [editQuestion.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [editQuestion.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [editQuestion.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [deleteQuestion.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [deleteQuestion.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },
  },
});

export default questionSlice.reducer;
