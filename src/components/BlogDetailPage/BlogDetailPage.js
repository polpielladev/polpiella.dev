import React, { useEffect } from "react";
import "./blog-detail.scss";
import Prism from "prismjs";

const BlogDetailPage = ({ post }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        Prism.highlightAll();
    }, []);

    return (
        <div className="blog-detail-container">
            <div className="body">
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
    );
};

export default BlogDetailPage;
