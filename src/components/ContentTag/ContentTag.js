import React from "react";
import "./content-tag.scss";

const ContentTag = ({ title }) => (
    <div className="tag">
        <p>{title}</p>
    </div>
);

export default ContentTag;
