import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { forwardRef } from "react";

const AnimatedImage = forwardRef<HTMLImageElement>(
  function AnimatedImageWrapper(props) {
    return <Image {...props} ref={ref} alt="" />;
  }
);

export default motion(AnimatedImage);