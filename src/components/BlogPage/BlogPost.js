import React from "react";
import { Link } from "react-router-dom";
import "./blog-page.scss";
import PostTag from "./PostTag";

const BlogPost = ({ post }) => {
    return (
        <div className="blog-post-container">
            <Link to={`/blog/${post.fields.slug}`}>
                <h3>{post.fields.title.toUpperCase()}</h3>
            </Link>
            <div className="tags">
                {post.fields.tags.map((name) => (
                    <PostTag title={name} key={name} />
                ))}
            </div>
            <p>{post.fields.description}</p>
            <div className="metadata">
                <p>{new Date(post.sys.createdAt).toDateString()}</p>
                <p>-</p>
                <p>{`📖  ${post.fields.readingTime}`}</p>
            </div>
            <div className="author-section">
                <img src={post.fields.author[0].fields.image.fields.file.url} />
                <div className="author-metadata">
                    <p>
                        WRITTEN BY: <b>{post.fields.author[0].fields.name}</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
