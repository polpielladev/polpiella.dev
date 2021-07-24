import BlogList from "components/BlogList";
import styled from "styled-components";
import { getBlogPostsForTag, getAllTags, getTagForSlug } from "models/API";
import Head from "next/head";

export async function getStaticProps({ params }) {
    const tag = getTagForSlug(params.slug);
    const posts = getBlogPostsForTag(params.slug);

    return {
        props: {
            tag,
            posts,
        },
    };
}

export async function getStaticPaths({ params }) {
    const paths = getAllTags().map((tag) => ({ params: { slug: tag.slug } }));

    return {
        paths,
        fallback: false,
    };
}

const HeaderSection = styled.div`
    margin-bottom: 30px;
    margin-top: 20px;
`;

export default function CategoryPage({ tag, posts }) {
    return (
        <>
            <Head>
                <meta
                    property="og:image"
                    content={`https://blog-og-image-eight.vercel.app/**Category%20-**%20${tag.name}.png?theme=dark&md=1&fontSize=100px`}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@polcodes" />
                <meta name="twitter:title" content={tag.name} />
                <meta
                    name="twitter:description"
                    content={`This is the space to help you learn more and develop with
                    articles relating to ${tag.name}.`}
                />
                <meta
                    name="description"
                    content="Discover blog posts about software engineering and app development by category."
                />
                <title>{tag.name}</title>
            </Head>
            <HeaderSection>
                <h2>{tag.name}</h2>
                <p>
                    This is the space to help you learn more and develop with
                    articles relating to <b>{tag.name}</b>.
                </p>
            </HeaderSection>
            <BlogList posts={posts} />
        </>
    );
}
