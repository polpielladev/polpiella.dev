import React, { useEffect, useState } from "react";
import "./blog-detail.scss";
import Prism from "prismjs";
import "prismjs/components/prism-swift";
import "./code-theme.scss";
import PostTag from "../BlogPage/PostTag";
import AuthorSection from "./AuthorSection/AuthorSection";

const BlogDetailPage = ({ post }) => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = (scrollTop / height) * 100;
        setScrollPercentage(scrolled);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        Prism.highlightAll();

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="blog-detail-container">
            <div className="scroll-indicator">
                <div style={{ width: `${scrollPercentage}%` }} />
            </div>
            <div className="body">
                <div className="blog-heading">
                    <h1>{post.title}</h1>
                    <div className="tags">
                        {post.tags.map((tag) => (
                            <PostTag title={tag.name} key={tag.name} />
                        ))}
                    </div>
                    <AuthorSection author={post.authors[0]} followButton />
                </div>
                <div
                    className="ghost-content"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
        </div>
    );
};

export default BlogDetailPage;
