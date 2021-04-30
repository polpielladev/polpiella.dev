import React from "react";
import { Follow } from "react-twitter-widgets";
import "./author-section.scss";

const AuthorSection = ({ author, followButton }) => (
    <div className="author-section">
        <img src={author.profile_image} />
        <div className="author-metadata">
            <p>
                Written by: <b>{author.name}</b>
            </p>
            {followButton && <Follow username="polcodes" />}
        </div>
    </div>
);

export default AuthorSection;
