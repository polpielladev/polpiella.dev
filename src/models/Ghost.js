import GhostContentAPI from "@tryghost/content-api";

class Ghost {
    constructor() {
        this.setup();
    }

    setup() {
        this.api = new GhostContentAPI({
            url: process.env.GHOST_API_HOST,
            key: process.env.GHOST_API_KEY,
            version: process.env.GHOST_API_VERSION,
        });
    }

    getBlogOwnerAuthor() {
        return this.api.authors.read({ slug: "pol-piella" });
    }

    getBlogPosts() {
        return this.api.posts.browse({ include: "tags,authors" });
    }
}

export const ghostAPI = (() => new Ghost())();
