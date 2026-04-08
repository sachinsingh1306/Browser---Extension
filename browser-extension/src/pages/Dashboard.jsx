import { useEffect, useState } from "react";
import { getRandomBackground } from "../utils/background";
import { getData } from "../hooks/useStorage";

import Greeting from "../components/Greeting";
import Todo from "../components/Todo";
import SearchBar from "../components/SearchBar";
import Shortcuts from "../components/Shortcuts";
import Clock from "../components/Clock";
import Focus from "../components/Focus";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = ({ user }) => {
  const [bg, setBg] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setBg(getRandomBackground());
  }, []);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await getData("theme");
      if (saved === "dark") {
        setDark(true);
        document.documentElement.classList.add("dark");
      }
    };
    loadTheme();
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full transition-all duration-700 ease-in-out flex flex-col ${
        dark ? "bg-[#111] text-white" : "bg-cover bg-center text-white"
      }`}
      style={{
        backgroundImage: dark ? "none" : `url(${bg})`,
      }}
    >
      {/* 1. Overlay */}
      {!dark && <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />}

      {/* 2. Top Navigation */}
      <header className="relative z-10 flex justify-end p-4 md:p-6">
        <ThemeToggle dark={dark} setDark={setDark} />
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20">
        
        {/* 3. Central Focus Area - Adjusted text sizes for mobile */}
        <div className="mb-6 md:mb-8 text-center drop-shadow-2xl">
          <Clock className="text-6xl md:text-8xl font-bold" />
          <Greeting user={user} className="mt-2 md:mt-4 text-xl md:text-3xl font-medium" />
        </div>

        {/* 4. Search Bar - Responsive width */}
        <div className="w-full max-w-md md:max-w-2xl transform transition-all hover:scale-[1.01]">
          <SearchBar />
        </div>

        {/* 5. Daily Goal / Focus */}
        <div className="mt-8 md:mt-12">
          <Focus />
        </div>

        {/* 6. Mobile Widget Container (Visible only on small screens) */}
        <div className="mt-10 flex flex-col gap-8 w-full md:hidden">
            <Shortcuts />
            <Todo />
        </div>
      </main>

      {/* 7. Desktop Corner Widgets (Hidden on mobile) */}
      <div className="hidden md:block relative z-10">
        <div className="fixed bottom-8 left-8">
          <Shortcuts />
        </div>
        <div className="fixed bottom-8 right-8">
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;