import React from "react";
import { Link } from "react-router-dom";
import AuthorSection from "../AuthorSection/AuthorSection";
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
        <AuthorSection author={post.authors[0]} />
    </div>
);

export default BlogPost;
