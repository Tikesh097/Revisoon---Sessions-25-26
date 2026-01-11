import { useEffect, useState } from "react";

const allPosts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  author: `Author ${(i % 10) + 1}`,
  content: `This is post number ${i + 1}`,
  likes: Math.floor(Math.random() * 500),
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
}));

const PAGE_SIZE = 20;

export default function InfiniteScrollFeed() {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasMore = visiblePosts.length < allPosts.length;

  // Initial load
  useEffect(() => {
    loadMorePosts();
    // eslint-disable-next-line
  }, []);

  const loadMorePosts = () => {
    if (!hasMore || loading) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;
      const nextPosts = allPosts.slice(start, start + PAGE_SIZE);

      setVisiblePosts((prev) => [...prev, ...nextPosts]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Social Feed</h2>

      {visiblePosts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>{post.author}</strong>
          <p>{post.content}</p>
          <small>
            ❤️ {post.likes} ·{" "}
            {new Date(post.timestamp).toLocaleString()}
          </small>
        </div>
      ))}

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Load More / End */}
      {!loading && hasMore && (
        <button onClick={loadMorePosts}>Load More</button>
      )}

      {!hasMore && <p>No more posts</p>}
    </div>
  );
}
