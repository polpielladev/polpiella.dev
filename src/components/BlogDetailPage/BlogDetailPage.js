import React, { useEffect, useState } from "react";
import "./blog-detail.scss";
import Prism from "prismjs";
import "prismjs/components/prism-swift";
import "./code-theme.scss";
import ContentTag from "../ContentTag/ContentTag";
import AuthorSection from "../AuthorSection/AuthorSection";

const BlogDetailPage = ({ post }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        Prism.highlightAll();
    }, []);

    return (
        <div className="blog-detail-container">
            <div className="body">
                <div className="blog-heading">
                    <h1>{post.title}</h1>
                    <div className="tags">
                        {post.tags.map((tag) => (
                            <ContentTag
                                title={tag.name}
                                color={tag.accent_color}
                                key={tag.name}
                            />
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
