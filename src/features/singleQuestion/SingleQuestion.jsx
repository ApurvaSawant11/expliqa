import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { openThreadModal } from "components/modal/threadModal/threadModalSlice";
import {
  AnswerIcon,
  BookmarkOutlineIcon,
  BookmarkFillIcon,
  CommentIcon,
  DeleteIcon,
  DownvoteIcon,
  MoreIcon,
  PostIcon,
  UpvoteIcon,
} from "assets";
import {
  deleteQuestion,
  addQueComment,
  addAnswer,
  updateQuestionVotes,
  addOrRemoveQueBookmark,
} from "features/home/questionSlice";
import { Answer, Comment } from "components";
import { useDocumentTitle, useScrollToTop } from "hooks";
import TextareaAutosize from "react-textarea-autosize";

const SingleQuestion = () => {
  useScrollToTop();
  useDocumentTitle("Question");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [newInput, setNewInput] = useState("");
  const [showComponent, setShowComponent] = useState("answer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const { allQuestions } = useSelector((state) => state.question);
  const { user: currentUser } = useSelector((state) => state.auth);
  const question = allQuestions?.find(
    (question) => question._id === questionId
  );
  const userDetails =
    allUsers && allUsers?.find((user) => user.username === question?.username);
  const newInputHandler = () => {
    showComponent === "answer"
      ? dispatch(addAnswer({ questionId: question._id, answerData: newInput }))
      : dispatch(
          addQueComment({ questionId: question._id, commentData: newInput })
        );
    setNewInput("");
  };
  const isBookmarked = question?.bookmark?.some(
    (bookmarkPost) => bookmarkPost.username === currentUser.username
  );

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

        <section>
          <h3 className="text-xl font-semibold">
            <span className="font-bold">Q. </span>
            {question.questionTitle}
          </h3>
          <p className="pt-2 text-gray-600 whitespace-pre-wrap">
            {question.questionContent}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex bg-slate-100 rounded-full gap-4 px-4 py-1.5">
              <div className="flex items-center gap-2">
                <UpvoteIcon
                  size={22}
                  className={`cursor-pointer ${
                    question.username === currentUser.username
                      ? "pointer-events-none text-gray-400"
                      : question.votes.upvotedBy.includes(currentUser.username)
                      ? "text-green-600"
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(
                      updateQuestionVotes({
                        questionId: question._id,
                        reaction: question.votes.upvotedBy.includes(
                          currentUser.username
                        )
                          ? "unvote"
                          : "upvote",
                      })
                    );
                  }}
                />
                <span className="text-gray-500">
                  {question.votes.upvotedBy.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DownvoteIcon
                  size={22}
                  className={`cursor-pointer ${
                    question.username === currentUser.username
                      ? "pointer-events-none text-gray-400"
                      : question.votes.downvotedBy.includes(
                          currentUser.username
                        )
                      ? "text-red-600"
                      : ""
                  }`}
                  onClick={() => {
                    dispatch(
                      updateQuestionVotes({
                        questionId: question._id,
                        reaction: question.votes.downvotedBy.includes(
                          currentUser.username
                        )
                          ? "unvote"
                          : "downvote",
                      })
                    );
                  }}
                />
                <span className="text-gray-500">
                  {question.votes.downvotedBy.length}
                </span>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-md ${
                showComponent === "comment" ? "bg-green-100" : ""
              }`}
              onClick={() => {
                setShowComponent("comment");
                setNewInput("");
              }}
            >
              <CommentIcon size={22} />{" "}
              <span className="text-gray-500 hidden sm:block">Comment</span>
            </div>

            <div
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-md ${
                showComponent === "answer" ? "bg-green-100" : ""
              }`}
              onClick={() => {
                setShowComponent("answer");
                setNewInput("");
              }}
            >
              <AnswerIcon size={22} />{" "}
              <span className="text-gray-500 hidden sm:block">Answer</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                dispatch(
                  addOrRemoveQueBookmark({
                    questionId: question._id,
                    isBookmark: isBookmarked ? false : true,
                  })
                )
              }
            >
              {isBookmarked ? (
                <BookmarkFillIcon className="text-gray-800" size={24} />
              ) : (
                <BookmarkOutlineIcon size={24} />
              )}{" "}
              <span className="text-gray-500 hidden sm:block">Bookmark</span>
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
        <div className="flex flex-wrap gap-2 xs:grow xs:flex-nowrap space-between items-center w-full rounded-md px-2 py-1">
          <TextareaAutosize
            minRows={1}
            maxRows={3}
            className="grow focus:outline-none py-1 px-2 rounded-md"
            placeholder={`Write your ${
              showComponent === "answer" ? "answer" : "comment"
            } here...`}
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
          />
          <button
            className={`w-full xs:w-max font-semibold uppercase bg-blue-500 text-white rounded-[4px] px-2 py-[3px] cursor-pointer hover:bg-blue-600 ${
              newInput.trim().length < 1 &&
              "hover:cursor-not-allowed hover:bg-gray-400 "
            }`}
            onClick={() => newInputHandler()}
            disabled={newInput.trim().length < 1 ? true : false}
          >
            {showComponent === "answer" ? "Answer" : "Comment"}
          </button>
        </div>
      </div>

      {showComponent === "comment" ? (
        <>
          <h4 className="font-semibold pl-2 mb-4 text-gray-600">
            {question.comments.length} Comment(s)
          </h4>
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
        </>
      ) : (
        <>
          <h4 className="font-semibold pl-2 mb-4 text-gray-600">
            {question.answers.length} Answer(s)
          </h4>
          <div className="flex flex-col-reverse gap-4">
            {question.answers.length > 0 &&
              question.answers.map((answer) => (
                <Answer
                  key={answer._id}
                  answer={answer}
                  threadId={question._id}
                />
              ))}
          </div>
        </>
      )}
    </section>
  ) : (
    <></>
  );
};

export default SingleQuestion;
