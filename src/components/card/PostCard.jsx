import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openThreadModal } from "components/modal/threadModal/threadModalSlice";
import { DeleteIcon, MoreIcon, PostIcon } from "assets";
import { deletePost } from "features/home/postSlice";
import { CardFooter } from "./CardFooter";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.auth);
  const userDetails =
    allUsers && allUsers?.find((user) => user.username === post.username);

  const editHandler = () =>
    dispatch(openThreadModal({ thread: post, tabIndex: 1 }));

  return userDetails ? (
    <article className="p-4 bg-white flex flex-col rounded-md">
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

      <section className="flex">
        {post.tags?.map((tag, index) => (
          <div
            key={index}
            className="mr-2 text-blue-700 bg-slate-200 px-1 text-sm rounded-md my-2"
          >
            #{tag}
          </div>
        ))}
      </section>

      <section
        className="cursor-pointer"
        onClick={() => navigate(`/post/${post._id}`)}
      >
        <h3 className="text-xl font-semibold hover:underline">
          {post.postTitle}
        </h3>
        <p className="pt-2 text-gray-600 whitespace-pre-wrap">
          {post.postContent}
        </p>
      </section>

      <CardFooter thread={post} threadType="post" />
    </article>
  ) : (
    <></>
  );
};

export { PostCard };
