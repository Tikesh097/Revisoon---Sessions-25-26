import { useEffect, useState } from "react";

function UserProfileLoader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async (signal) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/1",
        { signal }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUser(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <h3>Loading user profile...</h3>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => fetchUser()}>Retry</button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <h2>User Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
    </div>
  );
}

export default UserProfileLoader;
