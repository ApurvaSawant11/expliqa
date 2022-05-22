import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AnswerIcon,
  BookmarkFillIcon,
  BookmarkOutlineIcon,
  CommentIcon,
  DownvoteIcon,
  UpvoteIcon,
} from "assets";
import {
  updateQuestionVotes,
  addOrRemoveQueBookmark,
} from "features/home/questionSlice";
import {
  updatePostVotes,
  addOrRemovePostBookmark,
} from "features/home/postSlice";

const CardFooter = ({ thread, threadType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const isBookmarked = thread.bookmark?.some(
    (bookmarkPost) => bookmarkPost.username === currentUser.username
  );

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

  const bookmarkhandler = () => {
    threadType === "post"
      ? dispatch(
          addOrRemovePostBookmark({
            postId: thread._id,
            isBookmark: isBookmarked ? false : true,
          })
        )
      : dispatch(
          addOrRemoveQueBookmark({
            questionId: thread._id,
            isBookmark: isBookmarked ? false : true,
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
              thread.username === currentUser.username
                ? "pointer-events-none text-gray-400"
                : thread.votes.upvotedBy.includes(currentUser.username)
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
              thread.username === currentUser.username
                ? "pointer-events-none text-gray-400"
                : thread.votes.downvotedBy.includes(currentUser.username)
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
        onClick={() => navigate(`/${threadType}/${thread._id}`)}
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

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={bookmarkhandler}
      >
        {isBookmarked ? (
          <BookmarkFillIcon className="text-gray-800" size={24} />
        ) : (
          <BookmarkOutlineIcon size={24} />
        )}{" "}
        <span className="text-gray-500 hidden sm:block">Bookmark</span>
      </div>
    </div>
  );
};

export { CardFooter };
