import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteQueComment, editQueComment } from "features/home/questionSlice";
import { DeleteIcon, MoreIcon, PostIcon } from "assets";
import { deletePostComment, editPostComment } from "features/home/postSlice";

export function Comment({ comment, threadId, threadType }) {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputComment, setInputComment] = useState(comment.commentData);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const userDetails =
    allUsers &&
    allUsers?.find((commentUser) => comment.username === commentUser.username);

  const editHandler = () => {
    setIsEditOpen(false);
    threadType === "post"
      ? dispatch(
          editPostComment({
            postId: threadId,
            commentId: comment._id,
            commentData: inputComment,
          })
        )
      : dispatch(
          editQueComment({
            questionId: threadId,
            commentId: comment._id,
            commentData: inputComment,
          })
        );
  };
  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-md">
      <div className="flex items-center justify-between h-6">
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
          {comment.username === user.username && (
            <div
              className="rounded-full px-2 cursor-pointer relative"
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
                      threadType === "post"
                        ? dispatch(
                            deletePostComment({
                              postId: threadId,
                              commentId: comment._id,
                            })
                          )
                        : dispatch(
                            deleteQueComment({
                              questionId: threadId,
                              commentId: comment._id,
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
      {isEditOpen ? (
        <div className="flex pb-1 flex-wrap gap-2">
          <input
            className="text-sm grow focus:outline-none text-gray-600 border-b-2 border-gray-300 mr-4"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
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
        <p className="text-sm text-gray-600 pb-1">{comment.commentData}</p>
      )}
    </div>
  );
}
