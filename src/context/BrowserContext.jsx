import React, { createContext, useState } from "react";

export const BrowserContext = createContext();

export const BrowserProvider = ({ children }) => {
  const [name, setName] = useState(
    localStorage.getItem("username") || ""
  );

  const updateName = (newName) => {
    setName(newName);
    localStorage.setItem("username", newName);
  };

  const clearName = () => {
    setName("");
    localStorage.removeItem("username");
  };

  return (
    <BrowserContext.Provider
      value={{ name, setName: updateName, clearName }}
    >
      {children}
    </BrowserContext.Provider>
  );
};
