import AuthorSection from "../components/AuthorSection";
import ContentTag from "../components/ContentTag";
import PostMetadata from "../components/PostMetadata";
import { ghostAPI } from "../models/Ghost";
import styles from "../styles/pages/BlogDetailPage.module.scss";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import "prismjs/components/prism-swift";
import Head from "next/head";
import TwitterButton from "../components/TwitterButton";
import { getPostSlugs, getPostBySlug } from "../models/API";
import markdownToHtml from "../models/MarkdownToHTML";

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    console.log(post);
    console.log(post.content);
    const content = await markdownToHtml(post.content || '');

    console.log(content);

    return {
        props: {
            post: {
                ...post,
                content
            }
        },
    };
}

export async function getStaticPaths({ params }) {
    const slugs = getPostSlugs();
    const paths = slugs.map((slug) => ({
        params: { slug: slug },
    }))
    
    return {
        paths,
        fallback: false
    }
}

export default function BlogDetailPage({ post }) {
    const [href, setHref] = useState("");

    useEffect(() => {
        setHref(window.location.href);
        Prism.highlightAll();
    }, []);

    return (
        <div className={styles.blogDetailContainer}>
            <Head>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@polcodes" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={post.feature_image} />
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
                                slug={tag.slug}
                                key={tag.name}
                            />
                        ))}
                    </div>
                    {/* <AuthorSection author={post.author} followButton /> */}
                    <PostMetadata post={post} />
                </div>
                <div
                    className={styles.ghostContent}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {/* <TwitterButton
                    link={`https://twitter.com/intent/tweet?via=${post.author.twitter.replace(
                        "@",
                        ""
                    )}&text=${post.title}&url=${href}`}
                /> */}
            </div>
        </div>
    );
}
