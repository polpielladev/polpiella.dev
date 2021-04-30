import React from "react";
import "./content-tag.scss";

const ContentTag = ({ title, color }) => (
    <div className="tag" style={{ background: color }}>
        <p>{title}</p>
    </div>
);

export default ContentTag;
