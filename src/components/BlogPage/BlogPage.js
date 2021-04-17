import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import BlogPost from './BlogPost';
import './blog-page.scss';
import github from '../../assets/icons/github.svg';
import twitter from '../../assets/icons/twitter.svg';


const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [author, setAuthor] = useState({});

    useEffect(() => {
        const client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
        });

        client.getEntry('1VdnKJx4oIAzFLjWq9T6W9').then(author => setAuthor(author));
        client.getEntries({ 'content_type': 'blog-post' }).then((entries) => setBlogPosts(entries.items));
    }, []);

    if (blogPosts.length == 0 || author.fields == undefined) { return (<h1>Loading...</h1>); }

    return (
        <div className="blog-page-container">
            <div className="post-list">
                <div className="blog-intro">
                    <img src={author.fields.image.fields.file.url}/>
                    <div className="social-strip">
                        <a href=""><img src={twitter} /></a>
                        <a href=""><img src={github} /></a>
                    </div>
                    <h1><b>Hi! I'm Pol</b> 👋</h1>               
                    <p>Welcome to my personal blog! I am an iOS developer based in the UK and I love talking about software development in general.</p>
                </div>
                {blogPosts.map(post => <BlogPost post={post} key={post.sys.id} />)}
            </div>
        </div>
    );
}

export default BlogPage;