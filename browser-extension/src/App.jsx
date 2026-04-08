import { useEffect, useState } from "react";
import { getData } from "./hooks/useStorage";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const name = await getData("username");
      setUser(name);
      setLoading(false);
    };
    loadUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user ? (
    <Dashboard user={user} />
  ) : (
    <Welcome onDone={() => window.location.reload()} />
  );
}

export default App;