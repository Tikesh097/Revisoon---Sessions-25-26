import { useState } from "react";
import {FaRegCommentDots} from "react-icons/fa";
import CommentsList from "./CommentsList.jsx"

const COMMENTS_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

function PostCard({ post, user }) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState(null);

    const hasLoadedComments = comments.length > 0;

    async function handleToggleComments() {
        if (showComments) {
            setShowComments(false);
            return;
        }

        if (!hasLoadedComments) {
            setCommentsLoading(true);
            setCommentsError(null);

            try {
                const res = await fetch(
                    `${COMMENTS_BASE_URL}/${post.id}/comments`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch comments");
                }
                const data = await res.json();
                setComments(data);
            } catch (err) {
                setCommentsError(err.message || "Something Went Wrong");
            } finally {
                setCommentsLoading(false);
            }
        }
        setShowComments(true);
    }

    const commentCount = comments.length || post.commentsCount || 0;

    return (
        <article className="post-card">
            <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
            </div>

            <p className="post-body">{post.body}</p>

            <div className="post-footer">
                <div className="post-user">
                    <div className="avatar-circle">
                        {user?.name?.[0] || "U"}
                    </div>
                    <span className="userName">{user ? user.name : "Unknown User"}</span>
                </div>

                <button className="comments-toggle"
                    onClick={handleToggleComments}
                >
                    <FaRegCommentDots className="comment-icon" />

                    <span>
                        {showComments ? "Hide" : "Show"} Comments

                        {commentCount ? `(${commentCount})` : ""}
                    </span>
                </button>
            </div>

            {showComments && (
                <CommentsList
                    comments={comments}
                    loading={commentsLoading}
                    error={commentsError}
                />
            )}
        </article>

    );

}

export default PostCard;