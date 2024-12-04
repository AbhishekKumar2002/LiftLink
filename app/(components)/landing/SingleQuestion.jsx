"use client";
import React, { useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className="border border-gray-400 rounded-lg bg-white dark:bg-slate-600 dark:text-slate-300 mb-2 w-full">
        <article className="p-4 lg:p-6 flex justify-between items-center">
          <h2
            className="cursor-pointer flex-grow"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {question}
          </h2>
          <button className="focus:outline-none" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? <BiMinus /> : <BsPlusLg />}
          </button>
        </article>

        {showAnswer && (
          <article className="border-t border-gray-400 p-4 lg:p-6">
            <p>{answer}</p>
          </article>
        )}
      </div>
    </>
  );
}
