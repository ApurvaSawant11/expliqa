import axios from "axios";

export const getAllPostsService = () => axios.get("/api/posts");

export const getUserPostsService = (username) =>
  axios.get(`/api/posts/user/${username}`);

export const addPostService = (postData, token) =>
  axios.post(
    "/api/posts",
    {
      postData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deletePostService = (postId, token) =>
  axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization: token,
    },
  });

export const editPostService = (postData, token) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    {
      postData,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
