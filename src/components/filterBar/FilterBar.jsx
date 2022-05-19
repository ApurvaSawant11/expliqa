import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "features/home/postSlice";
import { getUserQuestions } from "features/home/questionSlice";
import { FilterIcon, FireIcon, SortIcon } from "assets";

const FilterBar = ({ setFeedPosts }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allPosts } = useSelector((state) => state.post);
  const { allQuestions } = useSelector((state) => state.question);
  const [sortCategory, setSortCategory] = useState("none");
  const [filterCategory, setFilterCategory] = useState("none");
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    if (filterCategory !== "none") {
      filterCategory === "tags" ? filterByTags() : filterByContent();
    } else if (sortCategory === "most-upvotes") {
      sortByUpvotes();
    } else {
      sortByLatest();
    }
    dispatch(getUserPosts(user.username));
    dispatch(getUserQuestions(user.username));
  }, [allPosts, allQuestions]);

  useEffect(() => {
    if (filterCategory === "content") {
      filterByContent();
    } else if (filterCategory === "tags") {
      filterByTags();
    }
    if (filterInput.trim() === "") {
      sortByLatest();
    }
  }, [filterInput]);

  useEffect(() => {
    sortCategory === "most-upvotes" ? sortByUpvotes() : sortByLatest();
  }, [sortCategory]);

  const sortByUpvotes = () => {
    setFeedPosts(
      [...allPosts, ...allQuestions]?.sort(
        (a, b) => b.votes.upvotedBy.length - a.votes.upvotedBy.length
      )
    );
  };

  const sortByLatest = () => {
    setFeedPosts(
      [...allPosts, ...allQuestions]?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };

  const filterByTags = () => {
    setFeedPosts(
      [...allPosts, ...allQuestions]?.filter((thread) =>
        thread.tags.find((element) => element.includes(filterInput))
      )
    );
  };

  const filterByContent = () => {
    setFeedPosts(
      [...allPosts, ...allQuestions]?.filter(
        (thread) =>
          thread?.postContent?.toLowerCase().includes(filterInput) ||
          thread?.postTitle?.toLowerCase().includes(filterInput) ||
          thread?.questionTitle?.toLowerCase().includes(filterInput) ||
          thread?.questionContent?.toLowerCase().includes(filterInput)
      )
    );
  };

  const trendingHandler = () => {
    setFeedPosts(
      [...allPosts, ...allQuestions]?.sort(
        (a, b) => b.votes.upvotedBy.length - a.votes.upvotedBy.length
      )
    );
  };

  return (
    <>
      <section
        className="flex bg-white justify-between px-4
       py-2 rounded-md mb-2"
      >
        <button className="flex items-center gap-1" onClick={trendingHandler}>
          <FireIcon size={20} className="text-orange-500" /> Trending
        </button>

        <div className="flex items-center gap-1">
          <FilterIcon size={14} className="mt-px" />
          <select
            name="filter"
            id="filter"
            className="outline-none"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setSortCategory("none");
            }}
          >
            <option value="none" disabled hidden>
              Filter By
            </option>
            <option value="tags">By Tags</option>
            <option value="content">By Content</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <SortIcon />
          <select
            name="sort"
            id="sort"
            className="outline-none"
            value={sortCategory}
            onChange={(e) => {
              setSortCategory(e.target.value);
              setFilterCategory("none");
            }}
          >
            <option value="none" disabled hidden>
              Sort by
            </option>
            <option value="latest">Latest threads</option>
            <option value="most-upvotes">Most Upvotes</option>
          </select>
        </div>
      </section>

      {filterCategory !== "none" && (
        <div>
          <input
            type="text"
            className="w-full py-2 px-4 my-3 outline-none rounded-md border-2 border-blue-400"
            placeholder={`${
              filterCategory === "tags"
                ? "Enter tag name"
                : "Enter thread Title or Content"
            }`}
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value.toLowerCase())}
          />
        </div>
      )}
      {(filterCategory !== "none" || sortCategory !== "none") && (
        <button
          className="text-right w-full px-4 text-red-500 font-semibold"
          onClick={() => {
            setFilterInput("");
            setFilterCategory("none");
            setSortCategory("none");
          }}
        >
          Clear Filters
        </button>
      )}
    </>
  );
};

export { FilterBar };
