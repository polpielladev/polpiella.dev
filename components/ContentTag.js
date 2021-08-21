import styled from "styled-components";
import LinkWrapper from "./LinkWrapper";

const Tag = styled.div`
    padding: 0 5px;
    border-radius: 4px;
    text-align: center;
    background: #1dd8d2;
    font-size: 13px;

    a {
        color: black;
    }
`;

const ContentTag = ({ title, slug }) => (
    <Tag>
        <LinkWrapper href={`/category/${slug}`}>{title}</LinkWrapper>
    </Tag>
);

export default ContentTag;
