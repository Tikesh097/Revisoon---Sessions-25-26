function CommentsList({ comments, loading, error}) {
    return (
        <div className="comments-wrapper">
        <h4 className="comments-title">Comments</h4>

        {loading && <p className="status-text">Loading Comments..</p>}
        {error && <p className="status-text error">Error:{error}</p>}
        {!loading && !error && (
            <ul className="comments-list">{comments.map((comments) => (
                <li key={comments.id} className="comment-item">
                    <p className="comment-name">{comments.name}</p>
                    <p className="comment-email">{comments.email}</p>
                    <p className="comment-body">{comments.body}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default CommentsList;