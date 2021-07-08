import styled from "styled-components";
import Link from "next/link";

const Tag = styled.div`
    padding: 0 5px;
    border-radius: 4px;
    text-align: center;
    background: ${(props) => props.color};
    color: white;
`;

const ContentTag = ({ title, color, slug }) => (
    <Tag color={color}>
        <Link href={`/category/${slug}`}>
            <a>{title}</a>
        </Link>
    </Tag>
);

export default ContentTag;
