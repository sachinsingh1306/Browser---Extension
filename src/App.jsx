import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { images } from "./database/images";
import Home from "./components/Home";
import Task from "./components/Task";

const App = () => {
  const index = Math.floor(Math.random() * images.length);
  const bgImage = images[index].image;

  const username = localStorage.getItem("username");

  return (
    <div
      className="w-[100vw] h-[100vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/task"
          element={username ? <Task /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
