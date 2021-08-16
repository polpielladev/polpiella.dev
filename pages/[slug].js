import ContentTag from "components/ContentTag";
import PostMetadata from "components/PostMetadata";
import styles from "styles/pages/BlogDetailPage.module.scss";
import { getPostSlugs, getPostBySlug } from "models/API";
import markdownToHtml from "models/markdownToHTML";
import TwitterButton from "components/TwitterButton";
import SEO from "components/SEO";
import { useNearScreen } from "hooks/useNearScreen";
import useCurrentHref from "hooks/useCurrentHref";

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

export async function getStaticPaths() {
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
    const { href } = useCurrentHref();
    const [isNear, toRef] = useNearScreen();

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                caption={`Read Time: ${post.readtime} minutes`}
            />
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
                    <div ref={toRef} />
                    <TwitterButton
                        isVisible={!isNear}
                        link={`https://twitter.com/intent/tweet?via=polcodes&text=${post.title}&url=${href}`}
                    />
                </div>
            </div>
        </>
    );
}
