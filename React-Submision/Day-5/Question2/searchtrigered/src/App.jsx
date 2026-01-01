import { useEffect, useState } from "react";

function GithubUserSearch() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        setUser(null);

        const res = await fetch(
          `https://api.github.com/users/${searchTerm}`,
          { signal: controller.signal }
        );

        if (res.status === 404) {
          throw new Error("User not found");
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

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  const handleSearch = () => {
    if (username.trim()) {
      setSearchTerm(username.trim());
    }
  };

  return (
    <div>
      <h2>GitHub User Search</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {user && (
        <div>
          <img src={user.avatar_url} alt="avatar" width="100" />
          <p><b>Name:</b> {user.name || "No name available"}</p>
          <p><b>Bio:</b> {user.bio || "No bio available"}</p>
          <p><b>Followers:</b> {user.followers}</p>
        </div>
      )}
    </div>
  );
}

export default GithubUserSearch;
