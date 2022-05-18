import axios from "axios";

export const addPostCommentService = (postId, commentData, token) =>
  axios.post(
    `/api/post/comments/add/${postId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editPostCommentService = (postId, commentId, commentData, token) =>
  axios.post(
    `/api/post/comments/edit/${postId}/${commentId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deletePostCommentService = (postId, commentId, token) =>
  axios.delete(`/api/post/comments/delete/${postId}/${commentId}`, {
    headers: {
      authorization: token,
    },
  });

export const addQueCommentService = (questionId, commentData, token) =>
  axios.post(
    `/api/comments/add/${questionId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editQueCommentService = (
  questionId,
  commentId,
  commentData,
  token
) =>
  axios.post(
    `/api/comments/edit/${questionId}/${commentId}`,
    {
      commentData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteQueCommentService = (questionId, commentId, token) =>
  axios.delete(`/api/comments/delete/${questionId}/${commentId}`, {
    headers: {
      authorization: token,
    },
  });
