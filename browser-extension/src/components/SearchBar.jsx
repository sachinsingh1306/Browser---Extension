import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("google");

  const platforms = {
    google: {
      name: "Google",
      url: "https://www.google.com/search?q=",
      color: "focus-within:ring-blue-500",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.90 3.16-1.82 4.08-1.16 1.16-2.96 2.4-5.96 2.4-4.8 0-8.68-3.88-8.68-8.68s3.88-8.68 8.68-8.68c2.6 0 4.56 1.04 5.96 2.4l2.32-2.32C18.72 1.08 15.96 0 12.48 0 6.96 0 2.4 4.56 2.4 10.08s4.56 10.08 10.08 10.08c3 0 5.28-1 7.08-2.88 1.8-1.8 2.4-4.32 2.4-6.36 0-.6-.04-1.2-.12-1.8H12.48z" />
        </svg>
      ),
    },
    youtube: {
      name: "YouTube",
      url: "https://www.youtube.com/results?search_query=",
      color: "focus-within:ring-red-500",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 1.1 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" />
        </svg>
      ),
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/search/results/all/?keywords=",
      color: "focus-within:ring-blue-700",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.063-1.866-3.063-1.867 0-2.153 1.459-2.153 2.968v5.699h-3v-11h2.88v1.503h.04c.401-.76 1.381-1.56 2.839-1.56 3.039 0 3.598 2.001 3.598 4.603v6.454z" />
        </svg>
      ),
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const url = `${platforms[platform].url}${encodeURIComponent(query)}`;

    if (!window.chrome?.tabs) {
      window.open(url, "_blank");
    } else {
      chrome.tabs.create({ url });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`group relative flex w-full items-center overflow-hidden rounded-full bg-white/10 p-1 backdrop-blur-md transition-all duration-300 ring-1 ring-white/20 shadow-2xl ${platforms[platform].color} focus-within:ring-2 focus-within:bg-white/20`}
    >
      {/* Platform Selector */}
      <div className="flex items-center pl-3">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="absolute h-full w-10 cursor-pointer opacity-0 z-10"
        >
          {Object.keys(platforms).map((p) => (
            <option key={p} value={p}>{platforms[p].name}</option>
          ))}
        </select>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-white/20">
          {platforms[platform].icon}
        </div>
      </div>

      {/* Input Field */}
      <input
        type="text"
        className="w-full bg-transparent px-4 py-3 text-lg text-white placeholder-white/50 outline-none"
        placeholder={`Search ${platforms[platform].name}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {/* Search Button (Icon only) */}
      <button
        type="submit"
        className="mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white hover:text-black active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;