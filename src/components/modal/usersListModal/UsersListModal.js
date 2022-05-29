import { CameraIcon, CloseIcon } from "assets";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "features/auth/authSlice";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import { getAllUsers } from "features/userProfile/userSlice";
import { useNavigate } from "react-router-dom";

const UsersListModal = ({ showUsersList, setShowUsersList }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-overlay flex z-10"
        onClick={() => setShowUsersList({ status: false, type: "", list: [] })}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="m-auto bg-white p-6 rounded-md relative userlist-wrapper"
        >
          <CloseIcon
            className="absolute right-[-0.5rem] top-[-0.5rem] bg-red-400 rounded-full cursor-pointer"
            size={22}
            onClick={() =>
              setShowUsersList({ status: false, type: "", list: [] })
            }
          />
          <div className="flex flex-col gap-4  mb-2">
            <div className="capitalize font-semibold text-center text-gray-700 text-lg">
              {showUsersList.type}
            </div>
            {showUsersList.list.length > 0 ? (
              showUsersList.list.map((user) => (
                <div
                  className="flex items-center cursor-pointer p-2"
                  key={user._id}
                  onClick={() => {
                    navigate(`/${user.userHandle}`);
                    setShowUsersList({ status: false });
                  }}
                >
                  <img
                    src={user.profilePic}
                    className="rounded-full h-7 w-7 mb-2 mt-1"
                    alt={user.userHandle}
                  />
                  <div className="flex flex-col ml-2 text-sm">
                    <div className="font-semibold">
                      {`${user.firstName} ${user.lastName}`}{" "}
                      <span className="text-gray-400">@{user.userHandle}</span>
                    </div>
                    <div className="text-gray-400">{user.bio}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Oops! No {showUsersList.type}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { UsersListModal };
