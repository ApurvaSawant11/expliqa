import { CloseIcon } from "assets";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, editPost } from "features/home/postSlice";
import { closeThreadModal } from "./threadModalSlice";
import TextareaAutosize from "react-textarea-autosize";

const ThreadModal = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "border-b-2 border-gray-300";

  const dispatch = useDispatch();
  const { threadModal, threadInfo } = useSelector((state) => state.threadModal);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (threadInfo && threadInfo.content) {
      setInput(threadInfo.content);
    }
  }, [threadInfo]);

  const postHandler = () => {
    threadInfo
      ? dispatch(
          editPost({
            ...threadInfo,
            content: input,
          })
        )
      : dispatch(
          addNewPost({
            content: input,
          })
        );
    setInput("");
    dispatch(closeThreadModal());
  };

  return (
    <>
      <div
        className={`items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-overlay ${
          threadModal ? "flex" : "hidden"
        }`}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="m-auto bg-white p-4 rounded-md form-wrapper"
        >
          <div className="flex">
            <button
              className={`pb-2 basis-full ${checkActive(
                1,
                "border-b-[3px] border-green-500 font-semibold"
              )}`}
              onClick={() => setActiveIndex(1)}
            >
              Create Post
            </button>
            <button
              className={`pb-2 basis-full ${checkActive(
                2,
                "border-b-[3px] border-green-500 font-semibold"
              )}`}
              onClick={() => setActiveIndex(2)}
            >
              Ask a Question
            </button>
            <button
              className={`border-b-2 border-gray-300 pb-2 px-2`}
              onClick={() => {
                dispatch(closeThreadModal());
                setInput("");
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-2">
            {activeIndex === 1 ? (
              <>
                <div className="h-[15rem]">
                  <TextareaAutosize
                    className="resize-none p-2 w-full focus:outline-none"
                    minRows={9}
                    maxRows={9}
                    placeholder="Write something awesome..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="font-semibold text-black py-2 px-6 "
                    onClick={() => {
                      dispatch(closeThreadModal());
                      setInput("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`font-semibold bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 ${
                      input.length < 10 &&
                      "hover:cursor-not-allowed hover:bg-gray-400"
                    }`}
                    disabled={input.trim().length < 10 ? true : false}
                    onClick={() => postHandler()}
                  >
                    Post
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-[15rem]">
                  <TextareaAutosize
                    className="border-b-2 resize-none p-2 w-full focus:outline-none"
                    minRows={1}
                    maxRows={9}
                    placeholder="Start a question with what how why.."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="font-semibold text-black py-2 px-6 "
                    onClick={() => {
                      dispatch(closeThreadModal());
                      setInput("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`font-semibold bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 ${
                      input.length < 10 &&
                      "hover:cursor-not-allowed hover:bg-gray-400"
                    }`}
                    disabled={input.trim().length < 10 ? true : false}
                    onClick={() => postHandler()}
                  >
                    Ask Question
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { ThreadModal };
