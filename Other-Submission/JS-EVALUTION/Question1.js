async function fetchPostsWithComments() {
  // Your implementation here
  try {
    const postPromise = fetch("https://jsonplaceholder.typicode.com/posts");
    const commentsPromise = fetch("https://jsonplaceholder.typicode.com/comments");

    const [postResponse, commentsResponse] = await Promise.all([
      postPromise,
      commentsPromise,
    ]);

    const posts = await postResponse.json();
    const comments = await commentsResponse.json();

    const commentCountMap = comments.reduce((acc, comment) => {
      acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      return acc;
    }, {});

    const firstCommenterMap = comments.reduce((acc, comment) => {
      if (!acc[comment.postId]) {
        acc[comment.postId] = comment.email;
      }
      return acc;
    }, {});

    const enrichedPosts = posts.map((post) => ({
      postId: post.id,
      title: post.title,
      commentCount: commentCountMap[post.id] || 0,
      firstCommenterEmail: firstCommenterMap[post.id] || null,
    }));

    const result = enrichedPosts
      .filter((p) => p.commentCount >= 1)
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 5);

    return result;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

fetchPostsWithComments().then((result) => console.log(result));

/* Expected Output (top 5 posts by comment count):
[
  {
    postId: 1,
    title: 'sunt aut facere repellat provident...',
    commentCount: 5,
    firstCommenterEmail: 'Eliseo@gardner.biz'
  },
  {
    postId: 2,
    title: 'qui est esse',
    commentCount: 5,
    firstCommenterEmail: 'Jayne_Kuhic@sydney.com'
  },
  // ... 3 more posts
]
*/
