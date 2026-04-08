import { useEffect, useState } from "react";
import { getData, setData } from "../hooks/useStorage";

const Focus = () => {
  const [focus, setFocus] = useState("");
  const [savedFocus, setSavedFocus] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const loadFocus = async () => {
      const data = await getData("focus");
      if (data) setSavedFocus(data);
    };
    loadFocus();
  }, []);

  const handleSave = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!focus.trim()) return;
      await setData("focus", focus.trim());
      setSavedFocus(focus.trim());
      setFocus("");
      setIsCompleted(false);
    }
  };

  const clearFocus = async () => {
    await setData("focus", "");
    setSavedFocus("");
    setIsCompleted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white transition-all duration-500">
      <h3 className="mb-4 text-xl font-medium tracking-wide uppercase opacity-80">
        What is your main focus for today?
      </h3>

      {savedFocus ? (
        <div className="group relative flex flex-col items-center">
          <div className="flex items-center gap-4">
            {/* Checkbox Toggle */}
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
              className="h-6 w-6 cursor-pointer rounded border-white/30 bg-transparent transition-all checked:bg-green-500 focus:ring-0"
            />
            
            {/* The Goal Text */}
            <p className={`text-4xl md:text-5xl font-semibold transition-all duration-300 ${
              isCompleted ? "opacity-50 line-through" : "opacity-100"
            }`}>
              {savedFocus}
            </p>

            {/* Hidden Clear Button - appears on hover */}
            <button
              onClick={clearFocus}
              className="ml-4 opacity-0 transition-opacity group-hover:opacity-60 hover:!opacity-100"
              title="Clear focus"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {isCompleted && (
            <p className="mt-4 animate-bounce text-sm font-medium text-green-400">
              Great job!
            </p>
          )}
        </div>
      ) : (
        <div className="relative w-full max-w-lg">
          <input
            className="w-full border-b-2 border-white/40 bg-transparent py-2 text-center text-3xl font-light outline-none transition-all focus:border-white"
            placeholder="Write your goal here..."
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            onKeyDown={handleSave}
            autoFocus
          />
          <p className="mt-2 text-center text-xs opacity-40">Press Enter to set focus</p>
        </div>
      )}
    </div>
  );
};

export default Focus;