import styled from "styled-components";

const Tag = styled.div`
    padding: 0 5px;
    border-radius: 4px;
    text-align: center;
    background: ${(props) => props.color};
    color: white;
`;

const ContentTag = ({ title, color }) => (
    <Tag color={color}>
        <p>{title}</p>
    </Tag>
);

export default ContentTag;
