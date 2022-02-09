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
					['rehype-toc', { headings: ['h2', 'h3', 'h4'] }]
				],
			},
		],
	},
    renderers: ['@astrojs/renderer-react'],
}
