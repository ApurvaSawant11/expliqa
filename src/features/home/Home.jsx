import React, { useState } from "react";
import { openThreadModal } from "components/modal/threadModalSlice";
import { useDispatch } from "react-redux";
import { FilterBar, FollowBar, PostCard, QuestionCard } from "components";
import { AnswerIcon, AskIcon, PostIcon } from "assets";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [feedPosts, setFeedPosts] = useState([]);

  return (
    <main className="min-h-screen py-12 w-11/12 xs:w-4/5 md:w-11/12 lg:w-4/5 xl:w-3/5 m-auto flex">
      <div className="basis-full">
        <section className="bg-white p-2 pt-4 rounded-md mb-7">
          <div
            className="w-full bg-slate-100 rounded-2xl p-2 pl-3 text-gray-500"
            onClick={() => dispatch(openThreadModal({ tabIndex: 1 }))}
          >
            Write something awesome...
          </div>
          <div className="flex justify-between gap-2 mt-4 ">
            <button
              className="basis-full flex items-center justify-center rounded-md py-1 hover:text-blue-600 hover:bg-slate-100 gap-2"
              onClick={() => dispatch(openThreadModal({ tabIndex: 1 }))}
            >
              <PostIcon /> Post
            </button>
            <span className="border-x-2 basis-full px-2">
              <button
                className="w-full flex items-center justify-center rounded-md py-1 hover:text-blue-600 hover:bg-slate-100 gap-2"
                onClick={() => dispatch(openThreadModal({ tabIndex: 2 }))}
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

        <FilterBar setFeedPosts={setFeedPosts} />

        <section className="mt-7">
          {feedPosts.map((thread) => {
            return thread.type === "post" ? (
              <PostCard post={thread} key={thread._id} />
            ) : (
              <QuestionCard question={thread} key={thread._id} />
            );
          })}
        </section>
      </div>
      <FollowBar />
    </main>
  );
};

export { Home };
