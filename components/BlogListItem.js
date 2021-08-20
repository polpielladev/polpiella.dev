import ContentTag from "components/ContentTag";
import PostMetadata from "components/PostMetadata";
import styled from "styled-components";
import LinkWrapper from "components/LinkWrapper";

const BlogPostContainer = styled.div`
    line-height: unset;
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
        margin-bottom: 8px;
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
