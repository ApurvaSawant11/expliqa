import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  getAllUsersHandler,
  getUserHandler,
  editUserHandler,
  followUserHandler,
  unfollowUserHandler,
  bookmarkPostHandler,
  removePostFromBookmarkHandler,
  bookmarkQuestionHandler,
  removeQuestionFromBookmarkHandler,
} from "./backend/controllers/UserController";
import { Server, Model, RestSerializer } from "miragejs";
import { users } from "./backend/db/users";
import { questions } from "./backend/db/questions";
import { posts } from "./backend/db/posts";
import {
  getAllAnswersHandler,
  addAnswerHandler,
  editAnswerHandler,
  deleteAnswerHandler,
} from "./backend/controllers/AnswerController";
import {
  getQuestionVotesHandler,
  getAnswerVotesHandler,
  voteQuestionHandler,
  voteAnswerHandler,
  votePostHandler,
} from "./backend/controllers/VoteController";
import {
  getQuestionCommentsHandler,
  getAnswerCommentsHandler,
  addQuestionCommentHandler,
  editQuestionCommentHandler,
  deleteQuestionCommentHandler,
  addAnswerCommentHandler,
  editAnswerCommentHandler,
  deleteAnswerCommentHandler,
} from "./backend/controllers/CommentController";
import {
  getPostCommentsHandler,
  addPostCommentHandler,
  editPostCommentHandler,
  deletePostCommentHandler,
  upvotePostCommentHandler,
  downvotePostCommentHandler,
} from "./backend/controllers/PostCommentController";
import {
  getAllQuestionsHandler,
  getQuestionHandler,
  getAllUserQuestionsHandler,
  addQuestionHandler,
  editQuestionHandler,
  deleteQuestionHandler,
} from "./backend/controllers/QuestionController";
import {
  createPostHandler,
  getAllpostsHandler,
  getPostHandler,
  deletePostHandler,
  editPostHandler,
  getAllUserPostsHandler,
} from "./backend/controllers/PostController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      user: Model,
      question: Model,
      posts: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", { ...item, followers: [], following: [] })
      );

      questions.forEach((item) => {
        server.create("question", { ...item });
      });

      posts.forEach((item) => {
        server.create("post", { ...item });
      });
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // user routes (public)
      this.get("/users", getAllUsersHandler.bind(this));
      this.get("/users/:userId", getUserHandler.bind(this));
      // user routes (private)
      this.post("users/edit", editUserHandler.bind(this));
      this.post("/users/follow/:followUserId/", followUserHandler.bind(this));
      this.post(
        "/users/unfollow/:followUserId/",
        unfollowUserHandler.bind(this)
      );
      this.post(
        "/users/post/bookmark/:postId/",
        bookmarkPostHandler.bind(this)
      );
      this.post(
        "/users/post/remove-bookmark/:postId/",
        removePostFromBookmarkHandler.bind(this)
      );
      this.post(
        "/users/question/bookmark/:questionId/",
        bookmarkQuestionHandler.bind(this)
      );
      this.post(
        "/users/question/remove-bookmark/:questionId/",
        removeQuestionFromBookmarkHandler.bind(this)
      );

      // questions routes (public)
      this.get("/questions", getAllQuestionsHandler.bind(this));
      this.get("/questions/:questionId", getQuestionHandler.bind(this));
      this.get(
        "/user/questions/:username",
        getAllUserQuestionsHandler.bind(this)
      );
      // questions routes (private)
      this.post("/questions/add", addQuestionHandler.bind(this));
      this.post("/questions/edit/:questionId", editQuestionHandler.bind(this));
      this.delete(
        "questions/delete/:questionId",
        deleteQuestionHandler.bind(this)
      );

      // post routes (public)
      this.get("/posts", getAllpostsHandler.bind(this));
      this.get("/posts/:postId", getPostHandler.bind(this));
      this.get("/posts/user/:username", getAllUserPostsHandler.bind(this));

      // post routes (private)
      this.post("/posts", createPostHandler.bind(this));
      this.delete("/posts/:postId", deletePostHandler.bind(this));
      this.post("/posts/edit/:postId", editPostHandler.bind(this));

      // answers routes (public)
      this.get("/answers/:questionId", getAllAnswersHandler.bind(this));
      // answers routes (private)
      this.post("/answers/add/:questionId", addAnswerHandler.bind(this));
      this.post(
        "/answers/edit/:questionId/:answerId",
        editAnswerHandler.bind(this)
      );
      this.delete(
        "/answers/delete/:questionId/:answerId",
        deleteAnswerHandler.bind(this)
      );

      // votes routes (public)
      this.get("/votes/:questionId", getQuestionVotesHandler.bind(this));
      this.get(
        "/votes/:questionId/:answerId",
        getAnswerVotesHandler.bind(this)
      );
      // votes routes (private)
      this.post("/votes/vote/:questionId", voteQuestionHandler.bind(this));
      this.post(
        "/votes/vote/:questionId/:answerId",
        voteAnswerHandler.bind(this)
      );
      this.post("post/votes/vote/:postId", votePostHandler.bind(this));

      // comments routes (public)
      this.get("/comments/:questionId", getQuestionCommentsHandler.bind(this));
      this.get(
        "/comments/:questionId/:answerId",
        getAnswerCommentsHandler.bind(this)
      );
      // comments routes (private)
      this.post(
        "/comments/add/:questionId",
        addQuestionCommentHandler.bind(this)
      );
      this.post(
        "/comments/edit/:questionId/:commentId",
        editQuestionCommentHandler.bind(this)
      );
      this.delete(
        "/comments/delete/:questionId/:commentId",
        deleteQuestionCommentHandler.bind(this)
      );
      this.post(
        "/comments/add/:questionId/:answerId/",
        addAnswerCommentHandler.bind(this)
      );
      this.post(
        "/comments/edit/:questionId/:answerId/:commentId",
        editAnswerCommentHandler.bind(this)
      );
      this.delete(
        "/comments/delete/:questionId/:answerId/:commentId",
        deleteAnswerCommentHandler.bind(this)
      );

      //post comments routes (public)
      this.get("/post/comments/:postId", getPostCommentsHandler.bind(this));

      //post comments routes (private)
      this.post("/post/comments/add/:postId", addPostCommentHandler.bind(this));
      this.post(
        "/post/comments/edit/:postId/:commentId",
        editPostCommentHandler.bind(this)
      );
      this.delete(
        "/post/comments/delete/:postId/:commentId",
        deletePostCommentHandler.bind(this)
      );
      this.post(
        "/post/comments/upvote/:postId/:commentId",
        upvotePostCommentHandler.bind(this)
      );
      this.post(
        "/post/comments/downvote/:postId/:commentId",
        downvotePostCommentHandler.bind(this)
      );

      this.passthrough();
      this.passthrough(
        "https://api.cloudinary.com/v1_1/dqtzqp7ks/image/upload",
        ["post"]
      );
    },
  });
}
