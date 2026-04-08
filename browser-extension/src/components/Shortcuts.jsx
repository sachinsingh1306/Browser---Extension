import { useState } from "react";

const Shortcuts = () => {
  const links = [
    { name: "Google", url: "https://www.google.com", color: "hover:text-blue-500", icon: "G" },
    { name: "YouTube", url: "https://www.youtube.com", color: "hover:text-red-500", icon: "Y" },
    { name: "LinkedIn", url: "https://www.linkedin.com", color: "hover:text-blue-700", icon: "in" },
    { name: "GitHub", url: "https://github.com", color: "hover:text-gray-400", icon: "GH" },
    { name: "Instagram", url: "https://instagram.com", color: "hover:text-pink-500", icon: "IG" },
  ];

  const openTab = (url) => {
    if (!window.chrome?.tabs) {
      window.open(url, "_blank");
    } else {
      chrome.tabs.create({ url });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 pl-2">
        Quick Access
      </h3>
      
      <div className="flex flex-wrap gap-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => openTab(link.url)}
            className="group relative flex flex-col items-center gap-2"
          >
            {/* The Icon Bubble */}
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md transition-all duration-300 ring-1 ring-white/20 group-hover:-translate-y-1 group-hover:bg-white/20 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] ${link.color}`}>
              <span className="text-xl font-bold text-white transition-colors">
                {link.icon}
              </span>
            </div>

            {/* The Label */}
            <span className="text-xs font-medium text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
              {link.name}
            </span>
          </button>
        ))}
        
        {/* Add Shortcut Button */}
        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-transparent text-white/40 transition-all hover:border-white/60 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Shortcuts;