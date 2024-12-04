"use client";

import Link from "next/link";
import React from "react";
import MacbookScrollDemo from "./MacbookScrollDemo";
import { TracingBeam } from "@/components/ui/tracing-beam";

const page = () => {
  return (
    <div>
      <div className="h-[400vh]">
        <MacbookScrollDemo />
      </div>
      <div className="flex flex-col items-center">
      <TracingBeam className="px-6">
        <h1 className="font-extrabold text-center text-4xl">How It Works</h1><br />
        <ol className="list-decimal">
          <li>
          <h1 className="font-bold">Create Your Profile:</h1> Sign up with RideShare and create your profile. Provide information about your usual travel routes, preferred departure times, and any specific preferences you have for your co-passengers.
          </li>
          <br />
          <li>
          <h1 className="font-bold">Find a Match:</h1> Browse through available rides or post your own ride request. Our intelligent matching algorithm will connect you with others who have similar travel plans and destinations.
          </li>
          <br />
          <li>
          <h1 className="font-bold">Connect and Share:</h1> Once matched, communicate with your potential co-passengers to finalize details such as pickup points, fare distribution, and any other necessary arrangements.
          </li>
          <br />
          <li>
          <h1 className="font-bold">Enjoy the Ride:</h1> Share the cab with your new co-passengers and enjoy a comfortable and cost-effective journey to your destination. Make new connections, save money, and contribute to a greener planet!
          </li>
          <br />
          <br />


        </ol>
        <br />
        <br />

        <h1 className="font-extrabold text-center text-4xl">Why Choose LiftLink</h1><br />
        <ol className="list-decimal">
          <li>
          <h1 className="font-bold">Cost Savings:</h1> By sharing the cost of the cab fare with others, you can significantly reduce your transportation expenses.
          </li>
          <br />
          <li>
          <h1 className="font-bold">Environmental Impact: </h1>Sharing a ride reduces the number of vehicles on the road, leading to less traffic congestion and lower carbon emissions.
          </li>
          <br />
          <li>
          <h1 className="font-bold">Community Building:</h1> LiftLink fosters a sense of community by connecting like-minded individuals who share common travel routes and interests.
          </li>
          <br />


        </ol>
        <br /><br />

        <h1 className="font-extrabold text-4xl text-center">Our Misson</h1> <br />

        At LiftLink, our mission is to make transportation more sustainable and accessible for everyone. By promoting the sharing economy and encouraging collaborative travel practices, we aim to create a greener and more connected world.

        <br />
        <br />
        <h2 className="font-semibold text-xl text-center">Join the LiftLink Community Today!</h2>
        <br />

        Sign up now and start sharing rides with fellow commuters in your area. Together, we can make a positive impact on the environment and build a more sustainable future for generations to come.
        <br /><br />


        </TracingBeam>
      </div>

    </div>
  );
};

export default page;
