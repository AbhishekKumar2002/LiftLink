"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import React from "react";

const people = [
  {
    id: 1,
    name: "Charandeep Kumar",
    designation:
      "Developed Event Creation and Pairing integrated with mail request",
    image: "/team/kitish.jpg",
  },
  {
    id: 2,
    name: "Ayush Kamal",
    designation: "Developed Chat System & Authentication",
    image: "/team/ayush.jpg",
  },
  {
    id: 3,
    name: "Abhishek Kumar",
    designation: "Designed Frontend using shdacn, accertinity & threejs",
    image: "/team/abhishek.jpg",
  },
  {
    id: 4,
    name: "Shubham Pal",
    designation: "Developed price prediction & OCR",
    image: "/team/shubham.jpg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center pb-5 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
