import axios from "axios";

export const addPostBookmarkService = (postId, token) =>
  axios.post(
    `/api/users/post/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removePostBookmarkService = (postId, token) =>
  axios.post(
    `/api/users/post/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const addQueBookmarkService = (questionId, token) =>
  axios.post(
    `/api/users/question/bookmark/${questionId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removeQueBookmarkService = (questionId, token) =>
  axios.post(
    `/api/users/question/remove-bookmark/${questionId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
