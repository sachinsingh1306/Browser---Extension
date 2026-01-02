import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Task from "./components/Task";
import { images } from "./database/images";
import { BrowserContext } from "./context/BrowserContext";

const App = () => {
  const { name } = useContext(BrowserContext); // ✅ FIX
  const bgImage =
    images[Math.floor(Math.random() * images.length)].image;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/task"
          element={name ? <Task /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
