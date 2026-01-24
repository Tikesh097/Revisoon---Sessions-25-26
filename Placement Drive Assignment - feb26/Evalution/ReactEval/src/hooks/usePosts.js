import { useEffect, useState } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [userById, setUserById] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch(POSTS_URL),
          fetch(USERS_URL),
        ]);

        if (!postsRes || !usersRes) {
          throw new Error("Failed to fetch posts or users");
        }

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();

        const usersMap = {};
        usersData.forEach((user) => {
          usersMap[user.id] = user;
        });

        setPosts(postsData);
        setUserById(usersMap);
      } catch (err) {
        setError(err.message || "Something went Wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { posts, userById, loading, error };
}
