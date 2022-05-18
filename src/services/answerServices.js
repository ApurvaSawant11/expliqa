import axios from "axios";

export const addAnswerService = (questionId, answerData, token) =>
  axios.post(
    `/api/answers/add/${questionId}`,
    {
      answerData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editAnswerService = (questionId, answerId, answerData, token) =>
  axios.post(
    `/api/answers/edit/${questionId}/${answerId}`,
    {
      answerData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteAnswerService = (questionId, answerId, token) =>
  axios.delete(`/api/answers/delete/${questionId}/${answerId}`, {
    headers: {
      authorization: token,
    },
  });

export const addAnsCommentService = (
  questionId,
  answerId,
  commentData,
  token
) =>
  axios.post(
    `/api/comments/add/${questionId}/${answerId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editAnsCommentService = (
  questionId,
  answerId,
  commentData,
  commentId,
  token
) =>
  axios.post(
    `/api/comments/edit/${questionId}/${answerId}/${commentId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteAnsCommentService = (
  questionId,
  answerId,
  commentId,
  token
) =>
  axios.delete(`/api/comments/delete/${questionId}/${answerId}/${commentId}`, {
    headers: {
      authorization: token,
    },
  });
