import ContentTag from "components/ContentTag";
import PostMetadata from "components/PostMetadata";
import styles from "styles/pages/BlogDetailPage.module.scss";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import "prismjs/components/prism-swift";
import Head from "next/head";
import { getPostSlugs, getPostBySlug } from "models/API";
import markdownToHtml from "models/MarkdownToHTML";
import TwitterButton from "components/TwitterButton";

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    const content = await markdownToHtml(post.content || "");

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
}

export async function getStaticPaths({ params }) {
    const slugs = getPostSlugs();
    const paths = slugs.map((slug) => ({
        params: { slug: slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default function BlogDetailPage({ post }) {
    const [href, setHref] = useState("");

    useEffect(() => {
        setHref(window.location.href);
        Prism.highlightAll();
    }, []);

    return (
        <>
            <Head>
                <meta
                    property="og:image"
                    content={`https://blog-og-image-eight.vercel.app/**Post%20-**%20${post.title}.png?theme=dark&md=1&fontSize=100px`}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@polcodes" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta
                    name="description"
                    content={`${post.title}. A post written by Pol Piella.`}
                />
                <title>{post.title}</title>
            </Head>
            <div className={styles.blogDetailContainer}>
                <div className={styles.body}>
                    <div className={styles.blogHeading}>
                        <h2>{post.title}</h2>
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
                        <PostMetadata post={post} />
                    </div>
                    <div
                        className={styles.ghostContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <TwitterButton
                        link={`https://twitter.com/intent/tweet?via=polcodes&text=${post.title}&url=${href}`}
                    />
                </div>
            </div>
        </>
    );
}
