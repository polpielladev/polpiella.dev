import { createClient } from "contentful";

class Contentful {
    constructor() {
        this.setup();
    }

    setup() {
        this.client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        });
    }

    fetchAuthor() {
        return this.client.getEntry(process.env.CONTENTFUL_AUTHOR_ID);
    }

    fetchBlogPosts() {
        return this.client.getEntries({
            content_type: process.env.CONTENTFUL_POST_CONTENT_TYPE,
        });
    }
}

export const contentfulClient = (() => new Contentful())();
