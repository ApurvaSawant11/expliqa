import { QuestionCard } from "components";
import { useDocumentTitle, useScrollToTop } from "hooks";
import React from "react";
import { useSelector } from "react-redux";

const AnswerPage = () => {
  const { allQuestions } = useSelector((state) => state.question);
  useScrollToTop();
  useDocumentTitle("Write Answers");

  return (
    <div className="answer-container m-auto mt-8">
      <h4 className="text-center font-semibold text-xl mb-8">
        Questions you can answer
      </h4>
      {allQuestions?.map((question) => (
        <div key={question._id} className="mt-4">
          <QuestionCard question={question} />
        </div>
      ))}
    </div>
  );
};

export default AnswerPage;
