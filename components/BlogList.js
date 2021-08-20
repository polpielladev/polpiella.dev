import { Fragment } from "react";
import BlogListItem from "components/BlogListItem";
import styled from "styled-components";

const BlogListContainer = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 35px;
    }
`;

const BlogList = ({ posts }) => (
    <BlogListContainer>
        {posts.map((post) => (
            <BlogListItem post={post} key={post.slug} />
        ))}
    </BlogListContainer>
);

export default BlogList;
