"use client";
import React, { useState } from "react";
import { questions } from "./questions";
import SingleQuestion from "./SingleQuestion";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const Faq = () => {
  const [cards] = useState(questions);
  return (
    <div className="justify-center items-center mb-8 ml-8 mr-8">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-slate-300 dark:bg-zinc-900">
        <section className="mx-auto py-20 px-4">
          <h1 className="text-center uppercase tracking-widest font-bold mb-8">
            Challenge Faqs
          </h1>

          <section className="flex flex-col w-full">
            {cards.map((card, index) => (
              <SingleQuestion {...card} key={index} />
            ))}
          </section>
        </section>
      </BackgroundGradient>
    </div>
  );
};

export default Faq;
