/*
### Q1: Sequential API Calls with Dependency (15 mins)
Fetch a user, then fetch their posts, then fetch comments for their first post.

**APIs:**

- User: `https://jsonplaceholder.typicode.com/users/1`
- Posts: `https://jsonplaceholder.typicode.com/posts?userId=1`
- Comments: `https://jsonplaceholder.typicode.com/comments?postId={postId}`
*/

async function fetchUserPostAndComments() {
  try {
    //Fetch User
    const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await userRes.json();

    //Fetch Posts of User
    const postRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = await postRes.json();

    const firstPost = posts[0];

    //Fetch Comments of First Post
    const commentRes = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${firstPost.id}`
    );
    const comments = await commentRes.json();

    return {
      userName: user.name,
      firstPostTitle: firstPost.title,
      commentCount: comments.length,
      topComment: comments[0].body,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchUserPostAndComments().then((data) => console.log(data));
