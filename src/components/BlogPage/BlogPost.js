import React from "react";
import { Link } from "react-router-dom";
import "./blog-page.scss";
import PostTag from "./PostTag";

const BlogPost = ({ post }) => (
    <div className="blog-post-container">
        <Link to={`/${post.slug}`}>
            <h3>{post.title.toUpperCase()}</h3>
        </Link>
        <div className="tags">
            {post.tags.map((tag) => (
                <PostTag title={tag.name} key={tag.name} />
            ))}
        </div>
        <p>{post.excerpt}</p>
        <div className="metadata">
            <p>{new Date(post.published_at).toDateString()}</p>
            <p>-</p>
            <p>{`📖  ${post.reading_time} minutes`}</p>
        </div>
        <div className="author-section">
            <img src={post.authors[0].profile_image} />
            <div className="author-metadata">
                <p>
                    WRITTEN BY: <b>{post.authors[0].name}</b>
                </p>
            </div>
        </div>
    </div>
);

export default BlogPost;
