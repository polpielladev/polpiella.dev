import styled from "styled-components";

const Metadata = styled.div`
    display: flex;
    align-items: center;
    font-size: 11px;

    & > * {
        margin-right: 6px;
    }
`;

const PostMetadata = ({ post }) => (
    <Metadata>
        <p>{new Date(post.date).toDateString()}</p>
        <p>-</p>
        <p>{`📖  ${post.readtime} minutes`}</p>
    </Metadata>
);

export default PostMetadata;
