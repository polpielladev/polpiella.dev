import styled from "styled-components";
import LinkWrapper from "./LinkWrapper";
import { Git, Github } from "@icons-pack/react-simple-icons";

const Metadata = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: lightgray;
    flex-wrap: wrap;
    line-height: 25px;

    & > * {
        margin-right: 6px;
    }
`;

const EditLink = styled.a`
    display: flex;
    align-items: center;
    flex-direction: row;

    b {
        margin-left: 5px;
    }
`;

const PostMetadata = ({ post, isEditable }) => (
    <Metadata>
        <p>{new Date(post.date).toDateString()}</p>
        <p>·</p>
        <p>{`📖  ${post.readtime} minutes`}</p>
        {isEditable && (
            <>
                <p>·</p>
                <EditLink
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/pol-piella/polpiella.dev/edit/main/_posts/${post.slug}`}
                >
                    <Github />
                    <b>Found a mistake? Edit on Github!</b>
                </EditLink>
            </>
        )}
    </Metadata>
);

export default PostMetadata;
