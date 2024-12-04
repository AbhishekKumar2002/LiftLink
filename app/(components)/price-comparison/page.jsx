"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { cn } from "@/utils/cn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Form from "./Form";

const Slider = () => {
  const [fare, setFare] = useState();
  const [pickUp, setpickUp] = useState("");
  const [dropLocation, todropLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (value) => {
    setpickUp(value);
  };

  const tohandleChange = (value1) => {
    todropLocation(value1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(pickUp);
    // console.log(dropLocation);

    const result = await fetch(
      `/api/fare?pickUp=${pickUp}&dropLocation=${dropLocation}`
    );

    const res = await result.json();

    setPrice(res.price.fare);

    //  console.log(res.price.fare);
  };

  useEffect(() => {
    let next = document.querySelector(".next");
    let prev = document.querySelector(".prev");

    next.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      document.querySelector(".slide").appendChild(items[0]);
    });

    prev.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      document.querySelector(".slide").prepend(items[items.length - 1]); // here the length of items = 6
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      console.log("hi");
      const response = await fetch("/api/fare");
      const data = await response.json();
      const price = data.price.fare;
      setFare(price);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Abhishek")
  //   console.log(pickUp);
  //   console.log(dropLocation);
  // };

  // const handleSubmit = async = () =>{

  // }

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };

  const LabelInputContainer = ({ children, className }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

  return (
    <div className="">
      <div class="container mb-28">
        <div class="slide">
          <div
            class="item"
            style={{
              backgroundImage:
                "url(https://www.shutterstock.com/image-photo/wroclaw-poland-aug-25-2020-600nw-2258295659.jpg)",
            }}
          >
            <div class="content">
              <div class="name">Uber</div>
              <div class="des"> </div>
              <button>{price}</button>
            </div>
          </div>
          <div
            class="item"
            style={{
              backgroundImage:
                "url(https://miro.medium.com/v2/resize:fit:2000/format:webp/1*MEpturVAaHNpeaXw691Y1A.jpeg)",
            }}
          >
            {/* <div
            class="item"
            style={{
              backgroundImage:
                "url(https://miro.medium.com/v2/resize:fit:2000/format:webp/1*MEpturVAaHNpeaXw691Y1A.jpeg)",
            }}
          ></div> */}
            <div class="content">
              <div class="name">Price Prediction</div>
              <div class="des"></div>
              {/* <button>{fare}</button> */}
            </div>
          </div>
          <div
            class="item"
            style={{
              backgroundImage:
                "url(https://www.techzim.co.zw/wp-content/uploads/2023/05/Indrive.png)",
            }}
          >
            <div class="content">
              <div class="name">Indriver</div>
              <div class="des">
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum! */}
              </div>
              <button>{price * 0.9}</button>
            </div>
          </div>
          <div
            class="item"
            style={{
              backgroundImage: "url(Rapido_1-1.jpg)",
            }}
          >
            <div class="content">
              <div class="name">Rapido</div>
              {/* <div class="des">{fare + 10}</div> */}
              <button>{price * 0.85}</button>
            </div>
          </div>
          {/* <div
          class="item"
          style={{
            backgroundImage:
              "url(https://cdn.neowin.com/news/images/uploaded/2021/03/1615995441_ola-taxi_story.jpg)",
          }}
        >
          <div class="content">
            <div class="name">OLA</div>
            <div class="des"></div>
            <button>{fare + 37}</button>
          </div>
        </div> */}
          <div
            class="item"
            style={{
              backgroundImage:
                "url(https://cdn.neowin.com/news/images/uploaded/2021/03/1615995441_ola-taxi_story.jpg)",
            }}
          >
            <div class="content">
              <div class="name">OLA</div>
              {/* <div class="des"></div> */}
              <button>{price * 1.8}</button>
            </div>
          </div>
        </div>

        <div class="button">
          <button class="prev">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button class="next">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      {/* <Form/> */}
      <div className="mt-20 mb-20">
        <div className="flex flex-col justify items-center max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Search Prices
          </h2>

          <form className="my-8 w-full" onSubmit={handleSubmit}>
            {/* <LabelInputContainer className="mb-4"> */}
            <Label htmlFor="pickUp">Pick UP Location</Label>
            <Input
              id="pickUp"
              placeholder="Pick UP Location"
              value={pickUp}
              onChange={(e) => setpickUp(e.target.value)}
              type="text"
            />
            {/* </LabelInputContainer> */}

            {/* <LabelInputContainer className="mb-4 w-full"> */}
            <Label htmlFor="dropLocation">Drop Location</Label>
            <Input
              id="dropLocation"
              value={dropLocation}
              onChange={(e) => todropLocation(e.target.value)}
              placeholder="Drop Location"
              type="text"
            />
            {/* </LabelInputContainer> */}

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Search &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
      {/* <div className="text-white">{price}</div> */}
    </div>
  );
};

export default Slider;
