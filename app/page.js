"use client";
import { AnimatedTooltipPreview } from "./(components)/landing/AnimatedToolTipPreview";
import Card_Home from "./(components)/landing/Card_Home";
import HeroSection from "./(components)/landing/HeroSection";
import "./button.css"

import { useEffect, useState } from "react";
import Faq from "./(components)/landing/Faq";
import HeroSection1 from "./(components)/landing/HeroSection1";
export default function Home() {
  const [forceAnimation, setForceAnimation] = useState(false);
  useEffect(() => {
    setForceAnimation(true);
  }, []);
  return (
    <main className="bg-slate-200 dark:bg-slate-900 text-black dark:text-slate-200">
      <div>
        <HeroSection />
        <HeroSection1 />
        <Card_Home />
        <Faq />
        {/* <AnimatedTooltipPreview /> */}
      </div>

        <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
        <script
          src="https://mediafiles.botpress.cloud/70c286e8-498a-424d-972e-074cb686db9c/webchat/config.js"
          defer
        ></script>
    </main>
  );
}
