import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AnswerIcon,
  BookmarkOutlineIcon,
  CommentIcon,
  DownvoteIcon,
  UpvoteIcon,
} from "assets";
import { updateQuestionVotes } from "features/home/questionSlice";
import { updatePostVotes } from "features/home/postSlice";

const CardFooter = ({ threadId, threadType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allPosts } = useSelector((state) => state.post);
  const { allQuestions } = useSelector((state) => state.question);
  const { user: currentUser } = useSelector((state) => state.auth);

  const thread =
    threadType === "post"
      ? allPosts?.find((post) => post._id === threadId)
      : allQuestions?.find((question) => question._id === threadId);

  const upvoteHandler = () => {
    threadType === "post"
      ? dispatch(
          updatePostVotes({
            postId: thread._id,
            reaction: thread.votes.upvotedBy.includes(currentUser.username)
              ? "unvote"
              : "upvote",
          })
        )
      : dispatch(
          updateQuestionVotes({
            questionId: thread._id,
            reaction: thread.votes.upvotedBy.includes(currentUser.username)
              ? "unvote"
              : "upvote",
          })
        );
  };

  const downvoteHandler = () => {
    threadType === "post"
      ? dispatch(
          updatePostVotes({
            postId: thread._id,
            reaction: thread.votes.downvotedBy.includes(currentUser.username)
              ? "unvote"
              : "downvote",
          })
        )
      : dispatch(
          updateQuestionVotes({
            questionId: thread._id,
            reaction: thread.votes.downvotedBy.includes(currentUser.username)
              ? "unvote"
              : "downvote",
          })
        );
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex bg-slate-100 rounded-full gap-1 px-2 py-1 sm:gap-4 sm:px-4 sm:py-1.5">
        <div className="flex items-center gap-2">
          <UpvoteIcon
            size={22}
            className={`cursor-pointer ${
              thread.votes.upvotedBy.includes(currentUser.username)
                ? "text-green-600"
                : ""
            }`}
            onClick={upvoteHandler}
          />
          <span className="text-gray-500">{thread.votes.upvotedBy.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <DownvoteIcon
            size={22}
            className={`cursor-pointer ${
              thread.votes.downvotedBy.includes(currentUser.username)
                ? "text-red-600"
                : ""
            }`}
            onClick={downvoteHandler}
          />
          <span className="text-gray-500">
            {thread.votes.downvotedBy.length}
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(`/${threadType}/${threadId}`)}
      >
        {threadType === "post" ? (
          <>
            <CommentIcon size={22} />{" "}
            <span className="text-gray-500 hidden sm:block">Comment</span>
          </>
        ) : (
          <>
            <AnswerIcon size={22} />{" "}
            <span className="text-gray-500 hidden sm:block">Answer</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 cursor-pointer">
        <BookmarkOutlineIcon size={24} />{" "}
        <span className="text-gray-500 hidden sm:block">Bookmark</span>
      </div>
    </div>
  );
};

export { CardFooter };
