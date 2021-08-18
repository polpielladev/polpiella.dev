import ContentTag from "components/ContentTag";
import PostMetadata from "components/PostMetadata";
import styled from "styled-components";
import LinkWrapper from "components/LinkWrapper";

const BlogPostContainer = styled.div`
    line-height: unset;
    display: flex;
    flex-direction: column;
    padding: 25px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    & > *:not(:last-child) {
        margin-bottom: 15px;
    }

    h3 {
        font-weight: bolder;
        font-size: 23px;
    }

    p {
        color: lightgray;
    }
`;

const Tags = styled.div`
    display: flex;

    & > * {
        margin-right: 5px;
    }
`;

const BlogListItem = ({ post }) => (
    <BlogPostContainer>
        <LinkWrapper href={`/${post.slug}`}>
            <h3>{post.title}</h3>
        </LinkWrapper>
        <p>{post.excerpt}</p>
        <PostMetadata post={post} />
        <Tags>
            {post.tags.map((tag) => (
                <ContentTag title={tag.name} slug={tag.slug} key={tag.name} />
            ))}
        </Tags>
    </BlogPostContainer>
);

export default BlogListItem;
