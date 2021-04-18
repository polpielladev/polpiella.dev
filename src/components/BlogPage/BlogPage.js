import React, { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import "./blog-page.scss";
import github from "../../assets/icons/github.svg";
import twitter from "../../assets/icons/twitter.svg";
import { Switch, Route } from "react-router-dom";
import BlogDetailPage from "../BlogDetailPage/BlogDetailPage";
import { contentfulClient } from "../../models/Contentful";

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [author, setAuthor] = useState({});

    useEffect(() => {
        contentfulClient.fetchAuthor().then((author) => setAuthor(author));
        contentfulClient
            .fetchBlogPosts()
            .then((entries) => setBlogPosts(entries.items));
    }, []);

    if (blogPosts.length == 0 || author.fields == undefined) {
        return <h1>Loading...</h1>;
    }

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => (
                    <div className="blog-page-container">
                        <div className="post-list">
                            <div className="blog-intro">
                                <img
                                    src={author.fields.image.fields.file.url}
                                />
                                <div className="social-strip">
                                    <a href="">
                                        <img src={twitter} />
                                    </a>
                                    <a href="">
                                        <img src={github} />
                                    </a>
                                </div>
                                <h1>
                                    <b>Hi! I'm Pol</b> 👋
                                </h1>
                                <p>
                                    Welcome to my personal blog! I am an iOS
                                    developer based in the UK and I love talking
                                    about software development in general.
                                </p>
                            </div>
                            {blogPosts.map((post) => (
                                <BlogPost post={post} key={post.sys.id} />
                            ))}
                        </div>
                    </div>
                )}
            />
            <Route
                path="/blog/:id"
                render={(props) => {
                    const post = blogPosts.filter(
                        (post) => post.sys.id == props.match.params.id
                    )[0];

                    return <BlogDetailPage post={post} />;
                }}
            />
        </Switch>
    );
};

export default BlogPage;
