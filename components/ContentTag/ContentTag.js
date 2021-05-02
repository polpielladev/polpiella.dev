import styles from "./ContentTag.module.scss";

const ContentTag = ({ title, color }) => (
    <div className={styles.tag} style={{ background: color }}>
        <p>{title}</p>
    </div>
);

export default ContentTag;
