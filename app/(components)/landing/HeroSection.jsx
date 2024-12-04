"use client";
import Image from "next/image";
// import Clock from "./clock/Clock";
// import Earth3d from "./earth/Earth3d";
// import EarthDark3d from "./earthDark/EarthDark3d";
// import City3d from "./city/City3d";
import From from "./From";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Earth_new from "./earth1/Earth_new";
import { ImagesSliderDemo } from "./ImageSliderDemo";


const HeroSection = () => {
  return (
    <div className="">
      <div className="mt-16">
        <ImagesSliderDemo/>
      </div>
      <div className="flex flex-col sm:flex-row mt-16  justify-evenly">
      

      <div className="w-full h-[calc((100vh-16px)/2)] mt-12 sm:mt-0 sm:h-[calc(100vh-16px)] sm:w-1/2 flex flex-col justify-center items-center">
        <From />
      </div>
      {/* <Earth3d /> */}
      <div className="w-full h-[calc((100vh-16px)/2)] sm:h-[calc(100vh-16px)] sm:w-1/2 flex flex-col justify-center items-center mt-24 md:mt-0">
        <Canvas className="h-100">
          
          <ambientLight />
          <OrbitControls autoRotate enableZoom={false} />
          <Suspense fallback={null}>
            <Earth_new />
          </Suspense>
          {/* <Environment preset="forest" /> */}
        </Canvas>
      
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
