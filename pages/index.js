import Head from "next/head";
import { Fragment } from "react";
import { Follow } from "react-twitter-widgets";
import BlogList from "../components/BlogList";
import { ghostAPI } from "../models/Ghost";
import styles from "../styles/pages/BlogPage.module.scss";

export async function getStaticProps() {
    const author = await ghostAPI.getBlogOwnerAuthor();
    const posts = await ghostAPI.getBlogPosts();

    return {
        props: {
            posts,
            author,
        },
    };
}

export default function BlogPage({ posts, author }) {
    return (
        <Fragment>
            <Head>
                <title>Pol Piella Codes</title>
            </Head>
            <div className={styles.blogPageContainer}>
                <div className={styles.postList}>
                    <div className={styles.blogIntro}>
                        <img src={author.profile_image} alt="author profile picture" />
                        <Follow username="polcodes" />
                        <h1>
                            <b>Hi! I'm Pol</b> 👋
                        </h1>
                        <p>
                            Welcome to my personal blog! I am an iOS developer
                            based in the UK and I love talking about software
                            development in general.
                        </p>
                    </div>
                    <BlogList posts={posts} />
                </div>
            </div>
        </Fragment>
    );
}
