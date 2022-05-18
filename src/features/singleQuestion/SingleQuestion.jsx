import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { openThreadModal } from "components/modal/threadModalSlice";
import {
  AnswerIcon,
  BookmarkOutlineIcon,
  DeleteIcon,
  DownvoteIcon,
  MoreIcon,
  PostIcon,
  UpvoteIcon,
} from "assets";
import { deleteQuestion, addQueComment } from "features/home/questionSlice";
import { Comment } from "components";

const SingleQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [comment, setComment] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const { allQuestions } = useSelector((state) => state.question);
  const { user: currentUser } = useSelector((state) => state.auth);
  const question = allQuestions?.find(
    (question) => question._id === questionId
  );
  const userDetails =
    allUsers && allUsers?.find((user) => user.username === question?.username);

  const commentHandler = () => {
    dispatch(addQueComment({ questionId: question._id, commentData: comment }));
    setComment("");
  };

  const editHandler = () =>
    dispatch(openThreadModal({ thread: question, tabIndex: 2 }));

  return userDetails ? (
    <section className="min-h-screen py-12 w-11/12 xs:w-4/5 md:w-11/12 lg:w-4/5 xl:w-3/5 m-auto">
      <article className="mt-4 p-4 bg-white flex flex-col rounded-md">
        <div className="flex items-center">
          <img
            src={userDetails?.profilePic}
            className="rounded-full h-7 w-7 mb-2"
            alt={userDetails?.userHandle}
          />
          <div className="flex items-center justify-between w-full mb-2">
            <div
              className="flex flex-col ml-2 cursor-pointer text-sm"
              onClick={() => navigate(`/${userDetails?.userHandle}`)}
            >
              <div className="font-semibold">
                {`${userDetails?.firstName} ${userDetails?.lastName}`}{" "}
                <span className="text-gray-400">
                  @{userDetails?.userHandle}
                </span>
              </div>
              <div className="text-gray-400">{userDetails?.bio}</div>
            </div>

            {currentUser.username === question.username && (
              <div
                className="px-3 py-0.5 cursor-pointer relative rounded-full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <MoreIcon />
                {isDropdownOpen && (
                  <ul className="absolute top-6 right-2 w-32 px-1 py-2 bg-white text-sm rounded-md border-2">
                    <li
                      className="py-1 px-3 flex gap-2 items-center hover:bg-slate-100 rounded-md"
                      onClick={() => editHandler()}
                    >
                      <PostIcon />
                      Edit
                    </li>
                    <li
                      className="py-1 px-3 flex gap-2 items-center hover:bg-slate-100 rounded-md"
                      onClick={() => {
                        dispatch(deleteQuestion(question._id));
                        navigate("/", { replace: true });
                      }}
                    >
                      <DeleteIcon />
                      Delete
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <section onClick={() => navigate(`/question/${question._id}`)}>
          <h3 className="text-xl font-semibold">{question.questionTitle}</h3>
          <p className="pt-2 text-gray-600 whitespace-pre-wrap">
            {question.questionContent}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex bg-slate-100 rounded-full gap-4 px-4 py-1.5">
              <div className="flex items-center gap-2">
                <UpvoteIcon size={22} className="cursor-pointer" />
                <span className="text-gray-500">
                  {question.votes.upvotedBy.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DownvoteIcon size={22} className="cursor-pointer" />
                <span className="text-gray-500">
                  {question.votes.downvotedBy.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <AnswerIcon size={22} />{" "}
              <span className="text-gray-500">Answer</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <BookmarkOutlineIcon size={24} />{" "}
              <span className="text-gray-500">Bookmark</span>
            </div>
          </div>
        </section>
      </article>

      <div className="flex gap-2 items-center my-6">
        <img
          src={currentUser.profilePic}
          alt={currentUser.userHandle}
          className="h-8 rounded-full"
        />
        <div className="flex grow space-between items-center rounded-md px-2 py-1">
          <input
            className="grow focus:outline-none py-1 px-2 rounded-md"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={`font-semibold uppercase bg-blue-500 text-white rounded-[4px] px-2 py-[3px] cursor-pointer ml-2 hover:bg-blue-600 ${
              comment.trim().length < 1 &&
              "hover:cursor-not-allowed hover:bg-gray-400 "
            }`}
            onClick={() => commentHandler()}
            disabled={comment.trim().length < 1 ? true : false}
          >
            Comment
          </button>
        </div>
      </div>

      {/* comment */}
      <div className="flex flex-col-reverse gap-4">
        {question.comments.length > 0 &&
          question.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              threadId={question._id}
            />
          ))}
      </div>
    </section>
  ) : (
    <></>
  );
};

export { SingleQuestion };
