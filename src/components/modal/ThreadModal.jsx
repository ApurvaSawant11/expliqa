import { CloseIcon } from "assets";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, editPost } from "features/home/postSlice";
import { addNewQuestion, editQuestion } from "features/home/questionSlice";
import { closeThreadModal } from "./threadModalSlice";
import TextareaAutosize from "react-textarea-autosize";

const ThreadModal = () => {
  const checkActive = (index, className) =>
    activeIndex === index ? className : "border-b-2 border-gray-300";

  const dispatch = useDispatch();
  const { threadModal, threadInfo, threadTabIndex } = useSelector(
    (state) => state.threadModal
  );
  const [activeIndex, setActiveIndex] = useState(threadTabIndex);

  const initialPostState = {
    postTitle: "",
    postContent: "",
    type: "post",
  };
  const initialQuestionState = {
    questionTitle: "",
    questionContent: "",
    type: "question",
  };

  const [postInput, setPostInput] = useState(initialPostState);
  const [questionInput, setQuestionInput] = useState(initialQuestionState);

  useEffect(() => {
    if (threadInfo) {
      if (threadInfo.postContent) {
        setPostInput(threadInfo);
      } else if (threadInfo.questionContent) {
        setQuestionInput(threadInfo);
      }
    }
  }, [threadInfo]);

  useEffect(() => {
    setActiveIndex(threadTabIndex);
  }, [threadTabIndex]);

  const postHandler = () => {
    threadInfo
      ? dispatch(
          editPost({
            ...threadInfo,
            postTitle: postInput.postTitle,
            postContent: postInput.postContent,
          })
        )
      : dispatch(
          addNewPost({
            type: "post",
            postTitle: postInput.postTitle,
            postContent: postInput.postContent,
          })
        );
    setPostInput(initialPostState);
    dispatch(closeThreadModal());
  };

  const questionHandler = () => {
    threadInfo
      ? dispatch(
          editQuestion({
            ...threadInfo,
            questionTitle: questionInput.questionTitle,
            questionContent: questionInput.questionContent,
          })
        )
      : dispatch(
          addNewQuestion({
            questionTitle: questionInput.questionTitle,
            questionContent: questionInput.questionContent,
          })
        );
    setQuestionInput(initialQuestionState);
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
                setPostInput(initialPostState);
                setQuestionInput(initialQuestionState);
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-2">
            {activeIndex === 1 ? (
              <>
                <div className="h-[15rem]">
                  <input
                    className="p-2 text-black w-full focus:outline-none border-b-2"
                    placeholder="Post title"
                    value={postInput.postTitle}
                    onChange={(e) =>
                      setPostInput({
                        ...postInput,
                        postTitle: e.target.value,
                      })
                    }
                  />
                  <TextareaAutosize
                    className="resize-none p-2 w-full focus:outline-none"
                    minRows={8}
                    maxRows={8}
                    placeholder="Write something awesome..."
                    value={postInput.postContent}
                    onChange={(e) =>
                      setPostInput({
                        ...postInput,
                        postContent: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="font-semibold text-black py-2 px-6 "
                    onClick={() => {
                      dispatch(closeThreadModal());
                      setPostInput(initialPostState);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`font-semibold bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 ${
                      postInput?.postContent?.length < 10 &&
                      "hover:cursor-not-allowed hover:bg-gray-400"
                    }`}
                    disabled={
                      postInput?.postContent?.trim().length < 10 ? true : false
                    }
                    onClick={() => postHandler()}
                  >
                    Post
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-[15rem]">
                  <input
                    className="p-2 text-black w-full focus:outline-none border-b-2"
                    placeholder="Start a question with What How Why.."
                    value={questionInput.questionTitle}
                    onChange={(e) =>
                      setQuestionInput({
                        ...questionInput,
                        questionTitle: e.target.value,
                      })
                    }
                  />
                  <TextareaAutosize
                    className="resize-none p-2 w-full focus:outline-none"
                    minRows={8}
                    maxRows={8}
                    placeholder="Question description"
                    value={questionInput.questionContent}
                    onChange={(e) =>
                      setQuestionInput({
                        ...questionInput,
                        questionContent: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="font-semibold text-black py-2 px-6 "
                    onClick={() => {
                      dispatch(closeThreadModal());
                      setQuestionInput(initialQuestionState);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`font-semibold bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 ${
                      questionInput?.questionContent?.length < 10 &&
                      "hover:cursor-not-allowed hover:bg-gray-400"
                    }`}
                    disabled={
                      questionInput?.questionContent?.trim().length < 10
                        ? true
                        : false
                    }
                    onClick={() => questionHandler()}
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
