import AuthorSection from "components/AuthorSection";
import ContentTag from "components/ContentTag";
import PostMetadata from "components/PostMetadata";
import Link from "next/link";
import styled from "styled-components";
import profile from "public/assets/profile.png";

const BlogPostContainer = styled.div`
    line-height: unset;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 20px;
    background: ${({ theme }) => theme.code.background};
    border-radius: 15px;

    & > * {
        margin-bottom: 5px;
    }

    & h3 {
        font-weight: bolder;
        font-size: 23px;
    }
`;

const Tags = styled.div`
    display: flex;
    font-size: 11px;

    & > * {
        margin-right: 5px;
    }
`;

const BlogListItem = ({ post }) => (
    <BlogPostContainer>
        <Link href={`/${post.slug}`}>
            <a>
                <h3>{post.title}</h3>
            </a>
        </Link>
        <Tags>
            {post.tags.map((tag) => (
                <ContentTag title={tag.name} slug={tag.slug} key={tag.name} />
            ))}
        </Tags>
        <p>{post.excerpt}</p>
        <PostMetadata post={post} />
        <AuthorSection name={post.author.name} image={profile} />
    </BlogPostContainer>
);

export default BlogListItem;
