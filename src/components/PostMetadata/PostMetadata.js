import React from "react";
import "./post-metadata.scss";

const PostMetadata = ({ post }) => (
    <div className="metadata">
        <p>{new Date(post.published_at).toDateString()}</p>
        <p>-</p>
        <p>{`📖  ${post.reading_time} minutes`}</p>
    </div>
);

export default PostMetadata;
