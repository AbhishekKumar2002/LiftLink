"use client";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useTheme } from "next-themes"

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white dark:bg-slate-800 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={theme === "dark" ? { left: "2px" } : { right: "2px" }}
      ></div>
      <BsSunFill className="ml-auto text-yellow-400" size={18} />
    </div>
  );
};

export default ThemeToggle;