"use client";

import { LayoutGrid } from "@/components/ui/layout-grid";
import React from "react";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Charbagh Railway Station</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Lucknow Junction (officially Lucknow NER, station code: LJN) is one of
        the two main railway stations of Lucknow city for 5 ft 6 in (1,676 mm)
        broad gauge trains. It is situated right next to Lucknow Charbagh
        railway station.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Hanuman Dham Temple</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Hanuman Setu Temple is located near the Gomti River in Lucknow. If you
        are not able to visit, you can fulfill your wishes by sending a letter.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Bara Imambara</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Bara Imambara, also known as Asafi Imambara, is an imambara complex in
        Lucknow, India, built by Asaf-ud-Daula, Nawab of Awadh, in 1784.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Ambedkar Park</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Ambedkar Memorial Park, formally known as Dr. Bhimrao Ambedkar Samajik
        Parivartan Prateek Sthal, is a public park and memorial in Gomti Nagar,
        Lucknow, Uttar Pradesh, India.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/images/charbagh.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "/images/hanumandham.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://media.gettyimages.com/id/169680193/photo/lucknow-bada-imambara.jpg?s=612x612&w=0&k=20&c=P_R8-yLXjT0Ih7-ekkgIQNYxNb5q86lkb6uOZo2WBlc=",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: "/images/ambedkar.png",
  },
];
