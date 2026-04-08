import { useEffect, useState } from "react";
import { getGreeting } from "../hooks/useGreeting";

const Greeting = ({ user, className = "" }) => {
  const [greeting, setGreeting] = useState(getGreeting());

  // Update greeting if the user leaves the tab open for a long time
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Map greetings to subtle icons for visual flair
  const getIcon = () => {
    const g = greeting.toLowerCase();
    if (g.includes("morning")) return "🌅";
    if (g.includes("afternoon")) return "☀️";
    if (g.includes("evening")) return "🌆";
    return "🌙";
  };

  return (
    <div className={`text-center select-none ${className}`}>
      <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-light tracking-tight text-white drop-shadow-md">
        <span className="opacity-90">{greeting},</span>
        <span className="font-semibold">{user}</span>
        <span className="text-2xl animate-wave origin-bottom-right">{getIcon()}</span>
      </h2>
    </div>
  );
};

export default Greeting;