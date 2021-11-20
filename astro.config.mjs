export default {
    buildOptions: {
<<<<<<< HEAD
        site: "https://polpiella.dev",
        sitemap: true,
=======
        site: "http://polpiella.dev",
        sitemap: true, // Generate sitemap (set to "false" to disable)
    },
    markdownOptions: {
        remarkPlugins: [
            [import("remark-autolink-headings"), { behavior: "prepend" }],
        ],
>>>>>>> 1037fe5c6cb10e1521c85aa28f1d36a281af88fb
    },
    renderers: [],
}
