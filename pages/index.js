import Head from "next/head";
import BlogList from "components/BlogList";
import styles from "styles/pages/BlogPage.module.scss";
import { getAllPosts } from "models/API";
import profileImage from "public/assets/profile.png";
import generateRSSFeed from "services/generateRSSFeed";
import fs from "fs";
import Image from "next/image";

export async function getStaticProps() {
    const posts = getAllPosts();
    const rssFeed = await generateRSSFeed(posts);
    fs.writeFileSync("./public/rss.xml", rssFeed);

    return {
        props: { posts },
    };
}

export default function BlogPage({ posts }) {
    return (
        <>
            <Head>
                <meta
                    property="og:image"
                    content="https://blog-og-image-eight.vercel.app/**Pol%20Piella%20Codes**%20-%20Blog.png?theme=dark&md=1&fontSize=100px"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@polcodes" />
                <meta name="twitter:title" content="Pol Piella Codes - Blog" />
                <meta
                    name="twitter:description"
                    content="A blog where I talk about software development topics in languages like Swift, Javascript and using frameworks such as Next.js, React, Combine and many more!"
                />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="RSS feed of my website's latest posts"
                    href="https://polpiella.dev/rss.xml"
                />
                <title>Pol Piella Codes</title>
            </Head>
            <div className={styles.blogPageContainer}>
                <div className={styles.postList}>
                    <div className={styles.blogIntro}>
                        <div className={styles.profileContainer}>
                            <Image
                                className={styles.profileImage}
                                src={profileImage}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={styles.introSection}>
                            <h1>
                                <b>Hi! I'm Pol</b> 👋
                            </h1>
                            <p>
                                Welcome to my personal blog! I am an iOS
                                developer based in the UK and I love talking
                                about software development in general.
                            </p>
                        </div>
                    </div>
                    <BlogList posts={posts} />
                </div>
            </div>
        </>
    );
}
