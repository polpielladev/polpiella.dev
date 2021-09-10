import ContentTag from "components/ContentTag";
import PostMetadata from "components/PostMetadata";
import { getPostSlugs, getPostBySlug } from "models/API";
import markdownToHtml from "models/markdownToHtml";
import TwitterButton from "components/TwitterButton";
import SEO from "components/SEO";
import { useNearScreen } from "hooks/useNearScreen";
import useCurrentHref from "hooks/useCurrentHref";
import styled from "styled-components";

const BlogDetailContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    li {
        margin-bottom: 10px;
    }

    .code-block {
        background: black;
    }
`;

const Body = styled.div`
    width: 100%;
    margin-top: 30px;

    :not(pre) > code {
        background: #3a3b3c;
        padding: 3px 6px;
        border-radius: 3px;
        color: white;
    }
`;

const Heading = styled.div`
    > *:not(:last-child) {
        margin-bottom: 10px;
    }

    margin-bottom: 30px;
    border-bottom: darkgray 1px solid;
    padding-bottom: 30px;
`;

const Tags = styled.div`
    display: flex;
    font-size: 11px;
    flex-wrap: wrap;

    > * {
        margin-right: 5px;
    }
`;

const MarkdownContent = styled.div`
    img {
        width: 100%;
        height: auto;
    }

    > * {
        margin-bottom: 32px;
    }

    a {
        font-weight: bold;
        text-decoration: underline;
    }

    p,
    li {
        line-height: 32px;
        font-size: 18px;
    }

    h2,
    h3,
    h4,
    h5 {
        margin: 48px 0 24px;
    }
`;

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    const content = await markdownToHtml(post.content || "");

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
}

export async function getStaticPaths() {
    const slugs = getPostSlugs();
    const paths = slugs.map((slug) => ({
        params: { slug: slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export default function BlogDetailPage({ post }) {
    const { href } = useCurrentHref();
    const [isNear, toRef] = useNearScreen();

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                caption={`Read Time: ${post.readtime} minutes`}
            />
            <BlogDetailContainer>
                <Body>
                    <Heading>
                        <h2>{post.title}</h2>
                        <Tags>
                            {post.tags.map((tag) => (
                                <ContentTag
                                    title={tag.name}
                                    color={tag.accent_color}
                                    slug={tag.slug}
                                    key={tag.name}
                                />
                            ))}
                        </Tags>
                        <PostMetadata post={post} isEditable />
                    </Heading>
                    <MarkdownContent
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <div ref={toRef} />
                    <TwitterButton
                        isVisible={!isNear}
                        link={`https://twitter.com/intent/tweet?via=polcodes&text=${post.title}&url=${href}`}
                    />
                </Body>
            </BlogDetailContainer>
        </>
    );
}
