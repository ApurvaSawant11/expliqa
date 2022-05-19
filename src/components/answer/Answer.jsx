import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAnsComment,
  deleteAnswer,
  editAnswer,
} from "features/home/questionSlice";
import { CommentIcon, DeleteIcon, MoreIcon, PostIcon } from "assets";
import { Comment } from "components";
const Answer = ({ answer, threadId }) => {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const { allUsers } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputAnswer, setInputAnswer] = useState(answer.answerText);
  const [inputAnsComment, setInputAnsComment] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const userDetails =
    allUsers &&
    allUsers?.find((answerUser) => answer.username === answerUser.username);

  const editHandler = () => {
    setIsEditOpen(false);
    dispatch(
      editAnswer({
        questionId: threadId,
        answerId: answer._id,
        answerData: inputAnswer,
      })
    );
  };
  return (
    <div className="flex flex-col bg-white p-4 rounded-md">
      <div className="flex items-center justify-between h-6 mb-3">
        <img
          src={userDetails?.profilePic}
          className="rounded-full h-7 w-7"
          alt={userDetails?.userHandle}
        />
        <div className="flex items-center justify-between w-full">
          <div
            className="flex flex-col ml-2 cursor-pointer text-sm"
            onClick={() => navigate(`/${userDetails?.userHandle}`)}
          >
            <div className="font-semibold">
              {`${userDetails?.firstName} ${userDetails?.lastName}`}{" "}
              <span className="text-gray-400">@{userDetails?.userHandle}</span>
            </div>
          </div>
          <div className="flex">
            <CommentIcon
              className="cursor-pointer"
              onClick={() => {
                setIsInputOpen(!isInputOpen);
                setInputAnsComment("");
              }}
            />

            {answer.username === user.username && (
              <div
                className="rounded-full pl-2 cursor-pointer relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <MoreIcon />
                {isDropdownOpen && (
                  <ul className="absolute m-0 text-sm px-1 py-1 rounded-lg top-4 right-4 bg-white w-[6rem] gap-1 border">
                    <li
                      className="flex items-center px-1 py-1 rounded-md gap-2 hover:bg-slate-200"
                      onClick={() => {
                        setIsEditOpen(!isEditOpen);
                      }}
                    >
                      <PostIcon />
                      Edit
                    </li>
                    <li
                      className="flex items-center px-1 py-1 rounded-md gap-2 hover:bg-slate-200"
                      onClick={() => {
                        dispatch(
                          deleteAnswer({
                            questionId: threadId,
                            answerId: answer._id,
                          })
                        );
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
      </div>
      {isEditOpen ? (
        <div className="flex pb-1 flex-wrap gap-2">
          <input
            className="text-sm grow focus:outline-none text-gray-600 border-b-2 border-gray-300 mr-4"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
          />
          <div>
            <button
              className="font-semibold bg-blue-500 text-white px-2 py-[2px] rounded-[4px] hover:bg-blue-600"
              onClick={() => editHandler()}
            >
              Save
            </button>
            <button
              className="font-semibold rounded-[4px] border-2 border-red-500 text-black px-1 hover:border-red-500 hover:bg-red-500 hover:text-white ml-2"
              onClick={() => setIsEditOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <p className="text-sm text-gray-600 pb-1">{answer.answerText}</p>
          {isInputOpen && (
            <div className="flex pb-1 flex-wrap gap-1 my-3">
              <input
                className="text-sm grow focus:outline-none text-gray-600 border-b-2 border-gray-300 mr-4"
                value={inputAnsComment}
                onChange={(e) => setInputAnsComment(e.target.value)}
                placeholder="Write your comment..."
              />
              <button
                className={`font-semibold bg-blue-500 text-white px-2 py-[2px] rounded-[4px] hover:bg-blue-600 ${
                  inputAnsComment.trim().length < 1 &&
                  "hover:cursor-not-allowed hover:bg-gray-400"
                }`}
                onClick={() => {
                  dispatch(
                    addAnsComment({
                      questionId: questionId,
                      answerId: answer._id,
                      commentData: inputAnsComment,
                    })
                  );
                  setInputAnsComment("");
                  setIsInputOpen(false);
                }}
              >
                Comment
              </button>
            </div>
          )}
          <div className="flex flex-col-reverse gap-4 ml-4 mt-4">
            {answer.comments.length > 0 &&
              answer.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  threadId={answer._id}
                  threadType="answer-comment"
                  background="bg-gray-100"
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Answer };
