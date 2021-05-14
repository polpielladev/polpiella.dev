import AuthorSection from "../components/AuthorSection/AuthorSection";
import ContentTag from "../components/ContentTag/ContentTag";
import PostMetadata from "../components/PostMetadata/PostMetadata";
import { ghostAPI } from "../models/Ghost";
import styles from "../styles/pages/BlogDetailPage.module.scss";
import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-swift";
import Head from "next/head";

export async function getServerSideProps({ params }) {
    const post = await ghostAPI.getBlogPost(params.slug);

    return {
        props: {
            post,
        },
    };
}

export default function BlogDetailPage({ post }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className={styles.blogDetailContainer}>
            <Head>
                <title>{post.title}</title>
            </Head>
            <div className={styles.body}>
                <div className={styles.blogHeading}>
                    <h1>{post.title}</h1>
                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <ContentTag
                                title={tag.name}
                                color={tag.accent_color}
                                key={tag.name}
                            />
                        ))}
                    </div>
                    <AuthorSection author={post.primary_author} followButton />
                    <PostMetadata post={post} />
                </div>
                <div
                    className={styles.ghostContent}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
        </div>
    );
}
