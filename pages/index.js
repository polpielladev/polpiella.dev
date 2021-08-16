import BlogList from "components/BlogList";
import styles from "styles/pages/BlogPage.module.scss";
import { getAllPosts } from "models/API";
import profileImage from "public/assets/profile.png";
import generateRSSFeed from "services/generateRSSFeed";
import fs from "fs";
import Image from "next/image";
import SEO from "components/SEO";

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
            <SEO
                title="polpielladev 📱 | A blog about software engineering and app development."
                description="A blog where I talk about software development topics in languages like Swift, Javascript and using frameworks such as Next.js, React, Combine and many more!"
                caption=""
            />
            <div className={styles.blogPageContainer}>
                <div className={styles.postList}>
                    <div className={styles.blogIntro}>
                        <div className={styles.profileContainer}>
                            <Image
                                className={styles.profileImage}
                                alt="Author Profile Image"
                                src={profileImage}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className={styles.introSection}>
                            <h2>
                                <b>Hi! I&apos;m Pol</b> 🤘
                            </h2>
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
