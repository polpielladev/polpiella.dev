import React, { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import "./blog-page.scss";
import github from "../../assets/icons/github.svg";
import twitter from "../../assets/icons/twitter.svg";
import { Switch, Route } from "react-router-dom";
import BlogDetailPage from "../BlogDetailPage/BlogDetailPage";
import { ghostAPI } from "../../models/Ghost";

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [author, setAuthor] = useState({});

    useEffect(() => {
        ghostAPI.getBlogOwnerAuthor().then((author) => setAuthor(author));
        ghostAPI.getBlogPosts().then((blogs) => setBlogPosts(blogs));
    }, []);

    if (blogPosts.length == 0 || author.name == undefined) {
        return <div></div>;
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
                                <img src={author.profile_image} />
                                <div className="social-strip">
                                    <a href="https://twitter.com/itspolpiella">
                                        <img src={twitter} />
                                    </a>
                                    <a href="https://github.com/pol-piella">
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
                                <BlogPost post={post} key={post.slug} />
                            ))}
                        </div>
                    </div>
                )}
            />
            <Route
                path="/:slug"
                render={(props) => {
                    const post = blogPosts.filter(
                        (post) => post.slug == props.match.params.slug
                    )[0];

                    return <BlogDetailPage post={post} />;
                }}
            />
        </Switch>
    );
};

export default BlogPage;
