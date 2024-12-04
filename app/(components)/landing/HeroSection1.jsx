import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { LayoutGridDemo } from "./LayoutGridDemo";
import { WobbleCardDemo } from "./WobbleCardDemo";


const HeroSection1 = () => {
  return (
    // <div className="flex flex-col sm:flex-row  justify-evenly">
    //   <div className="w-full h-[calc((100vh-16px)/2)] sm:h-[calc(100vh-16px)] sm:w-1/2 flex flex-col justify-center items-center">
    //   <h1 className="text-white text-4xl sm:text-4xl font-extrabold">
    //     <motion.div
    //       className=""
    //       whileHover={{ scale: 1.05 }}
    //       whileTap={{ scale: 0.95 }}
    //     >
    //       <span className="flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-cyan-500">
    //         Traveling the same path? <br />
    //         Share the ride, <br /> share the joy. <br />
    //         Book together, <br />
    //         save together.
    //       </span>
    //     </motion.div>
    //   </h1>
    //   </div>
    //   {/* </motion.div> */}

    //   <motion.div
    //     className="w-full h-[calc((100vh-16px)/2)] sm:mt-0 sm:h-[calc(100vh-16px)] sm:w-1/2 flex flex-col justify-center items-center md:mr-4"
    //     whileHover={{ scale: 1.05 }}
    //     whileTap={{ scale: 0.95 }}
    //   >
    //     <BackgroundGradient className="flex flex-col rounded-[22px] bg-slate-300 dark:bg-zinc-900">
    //       <Image
    //         className=" w-full h-full rounded-[22px]"
    //         width={2000}
    //         height={2000}
    //         src="/images/GettyImages-146060521.jpeg"
    //       />
    //     </BackgroundGradient>
    //   </motion.div>
    // </div>
    <div>
    <WobbleCardDemo/>
    <br />
    <h1 className="text-white text-4xl sm:text-4xl font-extrabold">
      <span className="flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-cyan-500">Some Most Visited Places</span></h1>
      <LayoutGridDemo/>

      
    </div>
  );
};

export default HeroSection1;
