import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    localStorage.setItem("username", name);
    navigate("#/task");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4  from-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl p-10 max-w-md w-full text-center text-white">

        {/* Title */}
        <h1 className="text-4xl font-bold drop-shadow mb-4">
          Welcome 👋
        </h1>

        <p className="text-lg text-white/80 mb-8">
          Enter your name to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Enter Your Name..."
            className="w-full px-4 py-3 rounded-xl bg-white/80 text-black shadow-md outline-none 
            focus:ring-4 focus:ring-blue-300 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-xl 
            shadow-lg transition hover:scale-105"
          >
            Continue →
          </button>
        </form>

      </div>
    </div>
  );
};

export default Home;
