import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllQuestionsService,
  getUserQuestionsService,
  addQuestionService,
  deleteQuestionService,
  editQuestionService,
  addQueCommentService,
  editQueCommentService,
  deleteQueCommentService,
  addAnswerService,
  editAnswerService,
  deleteAnswerService,
  addAnsCommentService,
  editAnsCommentService,
  deleteAnsCommentService,
  updateQuestionVotesService,
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

export const addQueComment = createAsyncThunk(
  "question/addQueComment",
  async ({ questionId, commentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await addQueCommentService(
        questionId,
        commentData,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editQueComment = createAsyncThunk(
  "question/editQueComment",
  async ({ questionId, commentId, commentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await editQueCommentService(
        questionId,
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

export const deleteQueComment = createAsyncThunk(
  "question/deleteQueComment",
  async ({ questionId, commentId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await deleteQueCommentService(
        questionId,
        commentId,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAnswer = createAsyncThunk(
  "question/addAnswer",
  async ({ questionId, answerData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await addAnswerService(questionId, answerData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editAnswer = createAsyncThunk(
  "question/editAnswer",
  async ({ questionId, answerId, answerData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await editAnswerService(
        questionId,
        answerId,
        answerData,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  "question/deleteAnswer",
  async ({ questionId, answerId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await deleteAnswerService(questionId, answerId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAnsComment = createAsyncThunk(
  "question/addAnsComment",
  async ({ questionId, answerId, commentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await addAnsCommentService(
        questionId,
        answerId,
        commentData,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editAnsComment = createAsyncThunk(
  "question/editAnsComment",
  async (
    { questionId, answerId, commentId, commentData },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await editAnsCommentService(
        questionId,
        answerId,
        commentData,
        commentId,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAnsComment = createAsyncThunk(
  "question/deleteAnsComment",
  async ({ questionId, answerId, commentId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await deleteAnsCommentService(
        questionId,
        answerId,
        commentId,
        token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateQuestionVotes = createAsyncThunk(
  "question/updateQuestionVotes",
  async ({ questionId, reaction }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Expliqa_token");
      const { data } = await updateQuestionVotesService(
        questionId,
        reaction,
        token
      );
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

    [addQueComment.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [addQueComment.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [addQueComment.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [editQueComment.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [editQueComment.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [editQueComment.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [deleteQueComment.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [deleteQueComment.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [deleteQueComment.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [addAnswer.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [addAnswer.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [addAnswer.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [editAnswer.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [editAnswer.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [editAnswer.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [deleteAnswer.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [deleteAnswer.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [deleteAnswer.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [addAnsComment.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [addAnsComment.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [addAnsComment.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [editAnsComment.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [editAnsComment.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [editAnsComment.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [deleteAnsComment.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [deleteAnsComment.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [deleteAnsComment.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },

    [updateQuestionVotes.pending]: (state) => {
      state.questionStatus = "pending";
    },
    [updateQuestionVotes.fulfilled]: (state, action) => {
      state.questionStatus = "fulfilled";
      state.allQuestions = action.payload.questions;
    },
    [updateQuestionVotes.rejected]: (state, action) => {
      state.questionStatus = "rejected";
      state.allQuestions = action.payload;
    },
  },
});

export default questionSlice.reducer;
