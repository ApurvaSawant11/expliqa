import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AnswerCard = ({ question, answerUser: userDetails }) => {
  const navigate = useNavigate();
  const answer = question.answers.find(
    (answer) => answer.username === userDetails.username
  );

  return userDetails ? (
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
              <span className="text-gray-400">@{userDetails?.userHandle}</span>
            </div>
            <div className="text-gray-400">{userDetails?.bio}</div>
          </div>
        </div>
      </div>

      <section
        className="cursor-pointer"
        onClick={() => navigate(`/question/${question._id}`)}
      >
        <h3 className="text-xl font-semibold hover:underline">
          <span className="font-bold">Q. </span>
          {question.questionTitle}
        </h3>
        <p className="pt-2 text-gray-600 whitespace-pre-wrap">
          <span className="font-semibold">Answer: </span>
          {answer.answerText}
        </p>
      </section>
    </article>
  ) : (
    <></>
  );
};

export { AnswerCard };
