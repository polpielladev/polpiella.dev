import { Follow } from "react-twitter-widgets";
import styles from "./AuthorSection.module.scss";

const AuthorSection = ({ author, followButton }) => (
    <div className={styles.authorSection}>
        <img src={author.profile_image} />
        <div className={styles.authorMetadata}>
            <p>
                Written by: <b>{author.name}</b>
            </p>
            {followButton && <Follow username="polcodes" />}
        </div>
    </div>
);

export default AuthorSection;
