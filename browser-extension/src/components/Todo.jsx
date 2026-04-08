import { useEffect, useState } from "react";
import { getData, setData } from "../hooks/useStorage";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    const loadTasks = async () => {
      const saved = await getData("tasks");
      if (saved) setTasks(saved);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    setData("tasks", tasks);
  }, [tasks]);

  const addTask = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority: priority,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-300",
    medium: "bg-yellow-500/20 text-yellow-300",
    high: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="w-80 overflow-hidden rounded-2xl bg-black/20 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl transition-all">
      <div className="p-4">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/60">
          Tasks
        </h3>

        {/* Task Input Area */}
        <form onSubmit={addTask} className="mb-4 space-y-2">
          <input
            className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:bg-white/20"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 rounded-lg bg-white/10 px-2 py-1 text-xs text-white outline-none"
            >
              <option value="low" className="text-black">Low Priority</option>
              <option value="medium" className="text-black">Medium</option>
              <option value="high" className="text-black">High</option>
            </select>
            <button
              type="submit"
              className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-black hover:bg-gray-200"
            >
              Add
            </button>
          </div>
        </form>

        {/* Scrollable List */}
        <ul className="max-h-60 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
          {tasks.length === 0 ? (
            <p className="py-4 text-center text-xs italic text-white/30">No tasks yet. Stay focused!</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="group flex items-center justify-between rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 rounded border-white/30 bg-transparent text-blue-600 focus:ring-0"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span
                      className={`truncate text-sm transition-all ${
                        task.completed ? "text-white/30 line-through" : "text-white"
                      }`}
                    >
                      {task.text}
                    </span>
                    <span className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;