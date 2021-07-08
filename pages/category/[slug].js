import { ghostAPI } from "../../models/Ghost";
import BlogList from "../../components/BlogList";
import styled from "styled-components";

export async function getStaticProps({ params }) {
    const tag = await ghostAPI.getTag(params.slug);
    const posts = await ghostAPI.getBlogPostsForTag(params.slug);

    return {
        props: {
            tag,
            posts
        },
    };
}

export async function getStaticPaths({ params }) {
    const tags = await ghostAPI.getTags();
    const paths = tags.map((tag) => ({ params: { slug: tag.slug }, }))
    
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