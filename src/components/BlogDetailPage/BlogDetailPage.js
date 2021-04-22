import React, { useEffect, useState } from "react";
import "./blog-detail.scss";
import Prism from "prismjs";
import PostTag from "../BlogPage/PostTag";

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
                <h1>{post.title}</h1>
                <div className="tags">
                    {post.tags.map((tag) => (
                        <PostTag title={tag.name} key={tag.name} />
                    ))}
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
