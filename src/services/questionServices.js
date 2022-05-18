import axios from "axios";

export const getAllQuestionsService = () => axios.get("/api/questions");

export const getUserQuestionsService = (username) =>
  axios.get(`/api/user/questions/${username}`);

export const addQuestionService = (questionData, token) =>
  axios.post(
    "/api/questions/add",
    {
      questionData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteQuestionService = (questionId, token) =>
  axios.delete(`/api/questions/delete/${questionId}`, {
    headers: {
      authorization: token,
    },
  });

export const editQuestionService = (questionData, token) =>
  axios.post(
    `/api/questions/edit/${questionData._id}`,
    {
      questionData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
