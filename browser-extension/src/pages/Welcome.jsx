import { useState } from "react";
import { setData } from "../hooks/useStorage";

const Welcome = ({ onDone }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent form reload
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await setData("username", name.trim());
      onDone();
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-xl transition-all">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome!
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Let’s get started. What should we call you?
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;