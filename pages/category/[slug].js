import BlogList from "../../components/BlogList";
import styled from "styled-components";
import { getBlogPostsForTag, getAllTags, getTagForSlug } from '../../models/API';
import Head from "next/head";

export async function getStaticProps({ params }) {
    const tag = getTagForSlug(params.slug);
    const posts = getBlogPostsForTag(params.slug);

    return {
        props: {
            tag,
            posts
        },
    };
}

export async function getStaticPaths({ params }) {
    const paths = getAllTags().map((tag) => ({ params: { slug: tag.slug }, }));
    
    return {
        paths,
        fallback: false
    }
}

const HeaderSection = styled.div`
    margin-bottom: 30px;
    margin-top: 20px;
`;

export default function CategoryPage({ tag, posts }) {
    return (
        <div>
            <Head>
                <title>{tag.name}</title>
            </Head>
            <HeaderSection>
                <h1>{tag.name}</h1>
                <p>
                    This is the space to help you learn more and develop with articles relating to <b>{tag.name}</b>. 
                </p>
            </HeaderSection>
            <BlogList posts={posts} />
        </div>
    );
}