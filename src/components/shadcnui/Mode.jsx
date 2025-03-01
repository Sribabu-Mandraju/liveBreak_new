
import React, { useState, useEffect } from "react";
import { Root as SwitchRoot, Thumb as SwitchThumb } from "@radix-ui/react-switch";

const Mode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
        const handleTheme = () => {
          const element = document.documentElement;
          element.classList.toggle("dark", theme === "dark");
          localStorage.setItem("theme", theme);
        };
    
        const handleScroll = () => {
          setIsSticky(window.scrollY > 80);
        };
    
        handleTheme();
        window.addEventListener("scroll", handleScroll);
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [theme]);

      const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      };
    return(
  <form>
    <div className="flex items-center">
      
      <SwitchRoot
        className="relative h-[25px] w-[42px] cursor-default rounded-full bg-blackA6 shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"
        id="airplane-mode"
      >
        <SwitchThumb onClick={toggleTheme} className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchRoot>
    </div>
  </form>)
};

export default Mode;
