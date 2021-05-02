import AuthorSection from "../../AuthorSection/AuthorSection";
import ContentTag from "../../ContentTag/ContentTag";
import PostMetadata from "../../PostMetadata/PostMetadata";
import styles from "./BlogListItem.module.scss";
import Link from "next/link";

const BlogListItem = ({ post }) => (
    <div className={styles.blogPostContainer}>
        <Link href={`/${post.slug}`}>
            <a>
                <h3>{post.title.toUpperCase()}</h3>
            </a>
        </Link>
        <div className={styles.tags}>
            {post.tags.map((tag) => (
                <ContentTag
                    title={tag.name}
                    color={tag.accent_color}
                    key={tag.name}
                />
            ))}
        </div>
        <p>{post.excerpt}</p>
        <PostMetadata post={post} />
        <AuthorSection author={post.authors[0]} />
    </div>
);

export default BlogListItem;
