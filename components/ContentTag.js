import styled from "styled-components";
import Link from "next/link";

const Tag = styled.div`
    padding: 0 5px;
    border-radius: 4px;
    text-align: center;
    background: purple;
    color: white;
`;

const ContentTagLink = styled.a`
    color: white;
    cursor: pointer;
`;

const ContentTag = ({ title, slug }) => (
    <Tag>
        <Link href={`/category/${slug}`} passHref>
            <ContentTagLink>{title}</ContentTagLink>
        </Link>
    </Tag>
);

export default ContentTag;
