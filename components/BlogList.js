import { Fragment } from "react";
import BlogListItem from "components/BlogListItem";

const BlogList = ({ posts }) => (
    <Fragment>
        {posts.map((post) => (
            <BlogListItem post={post} key={post.slug} />
        ))}
    </Fragment>
);

export default BlogList;
