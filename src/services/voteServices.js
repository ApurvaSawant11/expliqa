import axios from "axios";

// export const getAllQuestionVotessService = () => axios.get("/api/posts");

// export const getUserQuestionVotessService = (username) =>
//   axios.get(`/api/posts/user/${username}`);

export const updateQuestionVotesService = (questionId, reaction, token) =>
  axios.post(
    `/api/votes/vote/${questionId}`,
    {
      reaction,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const updatePostVotesService = (postId, reaction, token) =>
  axios.post(
    `/api/post/votes/vote/${postId}`,
    {
      reaction,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
