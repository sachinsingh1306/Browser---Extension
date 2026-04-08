import { useEffect, useState } from "react";

const Clock = ({ className = "" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format parts individually for better styling control
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  
  // Optional: Get a custom date string for beneath the clock
  const dateString = time.toLocaleDateString(undefined, { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Time Display */}
      <div className="flex items-baseline font-bold tracking-tighter text-white drop-shadow-sm">
        <span className="text-8xl md:text-9xl">{hours}</span>
        
        {/* Animated Colon */}
        <span className="animate-pulse text-7xl md:text-8xl px-2 opacity-80">:</span>
        
        <span className="text-8xl md:text-9xl">{minutes}</span>
      </div>

      {/* Date Subtitle */}
      <div className="mt-2 text-lg md:text-xl font-light tracking-widest uppercase opacity-90">
        {dateString}
      </div>
    </div>
  );
};

export default Clock;