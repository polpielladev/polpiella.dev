import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import BlogPost from './BlogPost';
import './blog-page.scss';

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
        });

        client.getEntries().then((entries) => setBlogPosts(entries.items));
    }, []);

    if (blogPosts.length == 0) { return (<h1>Loading...</h1>); }

    console.log(blogPosts);

    return (<div className="post-list">{blogPosts.map(post => <BlogPost post={post.fields} key={post.sys.id} />)}</div>); 
}

export default BlogPage;