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
        document.documentElement.classList.add("dark"); // Better than styling body directly
      }
    };
    loadTheme();
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full transition-all duration-700 ease-in-out ${
        dark ? "bg-[#111] text-white" : "bg-cover bg-center text-white"
      }`}
      style={{
        backgroundImage: dark ? "none" : `url(${bg})`,
      }}
    >
      {/* 1. Overlay for readability on bright images */}
      {!dark && <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />}

      {/* 2. Top Navigation / Utilities */}
      <div className="relative z-10 flex justify-end p-6">
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-10">
        {/* 3. Central Focus Area */}
        <div className="mb-8 text-center drop-shadow-2xl">
          <Clock className="text-8xl font-bold" />
          <Greeting user={user} className="mt-4 text-3xl font-medium" />
        </div>

        {/* 4. Search Bar */}
        <div className="w-full max-w-2xl transform transition-all hover:scale-[1.01]">
          <SearchBar />
        </div>

        {/* 5. Daily Goal / Focus */}
        <div className="mt-12">
          <Focus />
        </div>
      </main>

      {/* 6. Corner Widgets */}
      <div className="relative z-10">
        {/* Bottom Left: Shortcuts */}
        <div className="absolute bottom-8 left-8">
          <Shortcuts />
        </div>

        {/* Bottom Right: Todo List */}
        <div className="absolute bottom-8 right-8">
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;