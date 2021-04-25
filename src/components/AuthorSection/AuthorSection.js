import React from "react";
import "./author-section.scss";

const AuthorSection = ({ author }) => (
    <div className="author-section">
        <img src={author.profile_image} />
        <div className="author-metadata">
            <p>
                Written by: <b>{author.name}</b>
            </p>
        </div>
    </div>
);

export default AuthorSection;
