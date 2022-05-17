import React, { useState, useEffect } from "react";
import { openThreadModal } from "components/modal/threadModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "./postSlice";
import { FollowBar, PostCard } from "components";
import { AnswerIcon, AskIcon, PostIcon } from "assets";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allPosts } = useSelector((state) => state.post);
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    if (allPosts.length > 0) {
      setFeedPosts(allPosts);
    }
  }, [user, allPosts]);

  useEffect(() => {
    dispatch(getUserPosts(user.username));
  }, [allPosts]);

  return (
    <main className="min-h-screen py-12 w-11/12 xs:w-4/5 md:w-11/12 lg:w-4/5 xl:w-3/5 m-auto flex">
      <div className="basis-full">
        <section className="bg-white p-2 pt-4 rounded-md mb-10">
          <div
            className="w-full bg-slate-100 rounded-2xl p-2 pl-3 text-gray-500"
            onClick={() => dispatch(openThreadModal())}
          >
            Write something awesome...
          </div>
          <div className="flex justify-between gap-2 mt-4 ">
            <button
              className="basis-full flex items-center justify-center rounded-md py-1 hover:text-blue-600 hover:bg-slate-100 gap-2"
              onClick={() => dispatch(openThreadModal())}
            >
              <PostIcon /> Post
            </button>
            <span className="border-x-2 basis-full px-2">
              <button
                className="w-full flex items-center justify-center rounded-md py-1 hover:text-blue-600 hover:bg-slate-100 gap-2"
                onClick={() => dispatch(openThreadModal())}
              >
                <AskIcon /> Ask
              </button>
            </span>
            <button
              className="basis-full flex items-center justify-center rounded-md py-1 hover:text-blue-600 hover:bg-slate-100 gap-2"
              onClick={() => navigate("/answer")}
            >
              <AnswerIcon size={18} /> Answer
            </button>
          </div>
        </section>

        <section>
          {feedPosts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </section>
      </div>
      <FollowBar />
    </main>
  );
};

export { Home };
