import styled from "styled-components";

const Metadata = styled.div`
    display: flex;
    color: darkgray;
    align-items: center;
    font-size: 11px;

    & > * {
        margin-right: 6px;
    }
`;

const PostMetadata = ({ post }) => (
    <Metadata>
        <p>{new Date(post.published_at).toDateString()}</p>
        <p>-</p>
        <p>{`📖  ${post.reading_time} minutes`}</p>
    </Metadata>
);

export default PostMetadata;
