import astroRemark from '@astrojs/markdown-remark'

export default {
    buildOptions: {
        site: "https://polpiella.dev",
        sitemap: true,
    },
    markdownOptions: {
		render: [
			astroRemark,
			{
				rehypePlugins: [
                    'rehype-slug',
					['rehype-autolink-headings', { behavior: 'wrap' }],
				],
			},
		],
	},
    renderers: ['@astrojs/renderer-react'],
}
