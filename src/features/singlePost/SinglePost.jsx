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
import { deletePost, addPostComment } from "features/home/postSlice";
import { Comment } from "components";

const SinglePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.post);
  const { user: currentUser } = useSelector((state) => state.auth);
  const post = allPosts?.find((post) => post._id === postId);
  const userDetails =
    allUsers && allUsers?.find((user) => user.username === post?.username);

  const commentHandler = () => {
    dispatch(addPostComment({ postId: post._id, commentData: comment }));
    setComment("");
  };

  const editHandler = () =>
    dispatch(openThreadModal({ thread: post, tabIndex: 1 }));

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

            {currentUser.username === post.username && (
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
                        dispatch(deletePost(post._id));
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

        <section onClick={() => navigate(`/post/${post._id}`)}>
          <h3 className="text-xl font-semibold">{post.postTitle}</h3>
          <p className="pt-2 text-gray-600 whitespace-pre-wrap">
            {post.postContent}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex bg-slate-100 rounded-full gap-4 px-4 py-1.5">
              <div className="flex items-center gap-2">
                <UpvoteIcon size={22} className="cursor-pointer" />
                <span className="text-gray-500">
                  {post.votes.upvotedBy.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DownvoteIcon size={22} className="cursor-pointer" />
                <span className="text-gray-500">
                  {post.votes.downvotedBy.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <AnswerIcon size={22} />{" "}
              <span className="text-gray-500">Comment</span>
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
        {post.comments.length > 0 &&
          post.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              threadId={post._id}
              threadType="post"
            />
          ))}
      </div>
    </section>
  ) : (
    <></>
  );
};

export { SinglePost };
