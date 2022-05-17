import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openThreadModal } from "components/modal/threadModalSlice";
import { DeleteIcon, MoreIcon, PostIcon } from "assets";
import { deleteQuestion } from "features/home/questionSlice";

const QuestionCard = ({ question }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.auth);
  const userDetails =
    allUsers && allUsers?.find((user) => user.username === question.username);

  const editHandler = () =>
    dispatch(openThreadModal({ thread: question, tabIndex: 2 }));

  return userDetails ? (
    <div className="mt-4 p-4 bg-white flex flex-col rounded-md">
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
              <span className="text-gray-400">@{userDetails?.userHandle}</span>
            </div>
            <div className="text-gray-400">{userDetails?.bio}</div>
          </div>

          {currentUser.username === question.username && (
            <div
              className="px-3 py-0.5 cursor-pointer relative rounded-full"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <MoreIcon />
              {showDropDown && (
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
                    onClick={() => dispatch(deleteQuestion(question._id))}
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

      <h3 className="text-xl font-semibold">{question.questionTitle}</h3>
      <p className="pt-2 text-gray-600 whitespace-pre-wrap">
        {question.questionContent}
      </p>
    </div>
  ) : (
    <></>
  );
};

export { QuestionCard };
