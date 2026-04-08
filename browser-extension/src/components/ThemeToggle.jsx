import { setData } from "../hooks/useStorage";

const ThemeToggle = ({ dark, setDark }) => {
  const toggleTheme = async () => {
    const newMode = !dark;
    setDark(newMode);

    // Toggle the 'dark' class on the root element
    if (newMode) {
      document.documentElement.classList.add("dark");
      await setData("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      await setData("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-10 w-20 items-center rounded-full bg-white/10 p-1 backdrop-blur-md transition-all duration-500 hover:bg-white/20 ring-1 ring-white/20"
      aria-label="Toggle Theme"
    >
      {/* The Sliding Circle */}
      <div
        className={`absolute h-8 w-8 rounded-full bg-white shadow-lg transition-all duration-500 ease-in-out flex items-center justify-center ${
          dark ? "translate-x-10 bg-indigo-500" : "translate-x-0 bg-yellow-400"
        }`}
      >
        {dark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Decorative background icons */}
      <div className="flex w-full justify-between px-2 opacity-40">
        <span className="text-xs">☀️</span>
        <span className="text-xs">🌙</span>
      </div>
    </button>
  );
};

export default ThemeToggle;