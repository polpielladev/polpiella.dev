import styles from "./PostMetadata.module.scss";

const PostMetadata = ({ post }) => (
    <div className={styles.metadata}>
        <p>{new Date(post.published_at).toDateString()}</p>
        <p>-</p>
        <p>{`📖  ${post.reading_time} minutes`}</p>
    </div>
);

export default PostMetadata;
