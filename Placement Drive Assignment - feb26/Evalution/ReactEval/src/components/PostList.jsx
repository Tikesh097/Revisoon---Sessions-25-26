import { usePosts } from "../hooks/usePosts";
import PostCard from "./PostCard"


function PostList() {
    const {posts, userById, loading, error} = usePosts();

    if (loading) {
        return <p className="status-text">Loading posts...</p>;
    }

    if (error) {
        return <p className="status-text error">Error : {error}</p>;
    }

    return (
        <div className="posts-container">{posts.map((posts) => (
            <PostCard
                key={posts.id}
                post={posts}

                user={userById[posts.userId]}
            />
        ))}

        </div>
    )

}


export default PostList;