import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./blog-detail.scss";
import { MARKS } from "@contentful/rich-text-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const BlogDetailPage = ({ post }) => {
    const options = {
        renderMark: {
            [MARKS.CODE]: (text) => {
                return (
                    <SyntaxHighlighter language="swift" style={dracula}>
                        {text}
                    </SyntaxHighlighter>
                );
            },
        },
    };

    return (
        <div className="blog-detail-container">
            <div className="body">
                <h1>{post.fields.title}</h1>
                {documentToReactComponents(post.fields.body, options)}
            </div>
        </div>
    );
};

export default BlogDetailPage;
