import React from 'react';
import './blog-page.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PostTag from './PostTag';

const BlogPost = ({ post }) => (
    <div className="blog-post-container">
        <h3>{post.title.toUpperCase()}</h3>
        {documentToReactComponents(post.body)}

        <div className="metadata">
            <p>April 13, 2021</p>
            <p>-</p>
            {post.tags.map((name) => <PostTag title={name} key={name} />)}
            <p>-</p>
            <p>{post.readingTime}</p>
        </div>
    </div>
)

export default BlogPost;