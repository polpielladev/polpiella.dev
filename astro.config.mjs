export default {
    // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
    // pages: './src/pages', // Path to Astro components, pages, and data
    // dist: './dist',       // When running `astro build`, path to final static output
    // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
    buildOptions: {
        site: "http://polpiella.dev",
        sitemap: true, // Generate sitemap (set to "false" to disable)
    },
    markdownOptions: {
        remarkPlugins: [
            [import("remark-autolink-headings"), { behavior: "prepend" }],
        ],
    },
    renderers: [],
};
