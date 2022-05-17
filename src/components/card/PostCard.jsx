import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openThreadModal } from "components/modal/threadModalSlice";
import { DeleteIcon, MoreIcon, PostIcon } from "assets";
import { deletePost } from "features/home/postSlice";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.auth);
  const userDetails =
    allUsers && allUsers?.find((user) => user.username === post.username);

  const editHandler = () => dispatch(openThreadModal(post));

  return userDetails ? (
    <div className="mt-4 p-4 bg-white flex flex-col rounded-md">
      <div className="flex items-center">
        <img
          src={userDetails?.profilePic}
          className="rounded-full h-10 w-10 self-start mt-1"
          alt={userDetails?.userHandle}
        />
        <div className="flex items-center justify-between w-full mb-2">
          <div
            className="flex flex-col ml-2 cursor-pointer"
            onClick={() => navigate(`/${userDetails?.userHandle}`)}
          >
            <span className="text-lg font-semibold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</span>
            <span className="text-sm text-gray-400">
              @{userDetails?.userHandle}
            </span>
          </div>
          {currentUser.username === post.username && (
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
                    onClick={() => dispatch(deletePost(post._id))}
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

      <p className="pt-2 text-gray-600 whitespace-pre-wrap">{post.content}</p>
    </div>
  ) : (
    <></>
  );
};

export { PostCard };