import { PostCard, QuestionCard } from "components";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Bookmarks = () => {
  const { allPosts } = useSelector((state) => state.post);
  const { allQuestions } = useSelector((state) => state.question);
  const { user } = useSelector((state) => state.auth);

  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    if (allPosts.length > 0 && allQuestions.length > 0) {
      setBookmark(
        [...allPosts, ...allQuestions].filter(
          (thread) =>
            thread.bookmark.some(
              (bookmarkThread) => bookmarkThread.username === user.username
            ) === true
        )
      );
    }
  }, [user, allPosts, allQuestions]);

  return (
    <div className="min-h-screen py-12 w-11/12 xs:w-4/5 md:w-11/12 lg:w-4/5 xl:w-3/5 m-auto flex flex-col">
      <h3 className="text-center font-semibold text-2xl my-4">
        <span className="border-b-4 border-green-400 rounded"> Bookmarks </span>
      </h3>

      <section>
        {bookmark.length > 0 ? (
          <>
            {bookmark.map((thread) => {
              return thread.type === "post" ? (
                <PostCard post={thread} key={thread._id} />
              ) : (
                <QuestionCard question={thread} key={thread._id} />
              );
            })}
          </>
        ) : (
          <div className="text-xl m-auto text-gray-500 font-bold my-4 sm:mb-8">
            <p className="text-center">No Bookmarks Yet</p>
          </div>
        )}
      </section>
    </div>
  );
};

export { Bookmarks };
