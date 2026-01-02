import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const QUOTES = [
  "Do the hard things while they're easy.",
  "Start where you are. Use what you have. Do what you can.",
  "Little by little, a little becomes a lot.",
  "You don't have to be great to start, but you have to start to be great.",
];

const Task = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("username") || "Friend";

  // States
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("");
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [ytQuery, setYtQuery] = useState("");

  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    } catch {
      return [];
    }
  });

  const [taskText, setTaskText] = useState("");

  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );

  const recognitionRef = useRef(null);

  // --- Date + Time + Greeting ---
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );

      const h = now.getHours();
      if (h < 12) setGreeting("Good Morning 🌅");
      else if (h < 17) setGreeting("Good Afternoon ☀️");
      else setGreeting("Good Evening 🌙");
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Voice Search Setup ---
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const sr = new SpeechRecognition();
    sr.lang = "en-US";
    sr.interimResults = false;

    sr.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setQuery(text);
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(text)}`,
        "_blank"
      );
      setListening(false);
    };

    sr.onend = () => setListening(false);

    recognitionRef.current = sr;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current)
      return alert("Voice search not supported in this browser.");
    setListening(true);
    recognitionRef.current.start();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank"
    );
    setQuery("");
  };

  // To-do list logic
  const addTodo = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTodos = [
      ...todos,
      { id: Date.now(), text: taskText, done: false },
    ];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTaskText("");
  };

  const toggleTodo = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const deleteTodo = (id) => {
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const goHome = () => {
    localStorage.removeItem("username");
    navigate("#/");
  };

  const handleYouTubeSearch = (e) => {
    e.preventDefault();
    if (!ytQuery.trim()) return;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        ytQuery
      )}`,
      "_blank"
    );

    setYtQuery("");
  };

  return (
    <div className="min-h-screen w-full p-6 text-white backdrop-blur-sm bg-black/40">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <button
            onClick={goHome}
            className="px-4 py-2 bg-white/30 backdrop-blur-md rounded-xl text-black font-semibold shadow-md hover:bg-white/50 transition"
          >
            Home
          </button>

          <h2 className="text-3xl font-bold mt-3">Welcome, {name} 👋</h2>
          <p className="text-lg opacity-80">{greeting}</p>
        </div>

        <div className="text-right">
          <div className="text-xl opacity-80">{date}</div>
          <div className="text-5xl font-bold mt-2">{time}</div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SEARCH BOX */}
        <div className="bg-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-2xl border border-white/30">
          <h3 className="text-xl font-semibold mb-4">Google Search</h3>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              className="flex-1 px-4 py-2 rounded-xl bg-white text-black shadow"
              placeholder="Search Google..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="px-4 py-2 bg-blue-500 rounded-xl shadow hover:bg-blue-600">
              Search
            </button>

            <button
              type="button"
              onClick={startListening}
              className={`px-4 py-2 rounded-xl shadow ${
                listening ? "bg-red-500" : "bg-green-500"
              }`}
            >
              🎤
            </button>
          </form>
        </div>

        {/* TO-DO LIST */}
        <div className="bg-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-2xl border border-white/30">
          <h3 className="text-xl font-semibold mb-4">TASK WHAT TO DO !</h3>

          <form onSubmit={addTodo} className="flex gap-2 mb-4">
            <input
              className="flex-1 px-4 py-2 rounded-xl bg-white text-black"
              placeholder="Add a task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button className="px-4 py-2 bg-green-500 rounded-xl shadow">
              Add
            </button>
          </form>

          <div className="max-h-64 overflow-auto space-y-2">
            {todos.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTodo(t.id)}
                  />
                  <span
                    className={
                      t.done ? "line-through opacity-50" : "opacity-90"
                    }
                  >
                    {t.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTodo(t.id)}
                  className="text-red-300 hover:text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* QUOTE BOX */}
        <div className="bg-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-2xl border border-white/30 flex items-center justify-center text-center">
          <p className="italic text-lg">“{quote}”</p>
        </div>
        
        {/* YouTube Search */}
        <div className="p-4 bg-white/10 rounded-xl">
          <h3 className="font-semibold mb-2">YouTube Search 🎥</h3>

          <form onSubmit={handleYouTubeSearch} className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg bg-white text-black"
              placeholder="Search YouTube..."
              value={ytQuery}
              onChange={(e) => setYtQuery(e.target.value)}
            />

            <button className="px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
