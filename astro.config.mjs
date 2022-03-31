import astroRemark from '@astrojs/markdown-remark'
import react from '@astrojs/react'

export default {
    buildOptions: {
        site: "https://polpiella.dev",
        sitemap: true,
    },
    markdownOptions: {
		render: [
			astroRemark,
			{
				syntaxHighlight: 'prism',
				remarkPlugins: ['remark-code-titles'],
				rehypePlugins: [
					'rehype-slug',
					['rehype-autolink-headings', { behavior: 'wrap' }],
					['rehype-toc', { headings: ['h2'] }]
				],
			},
		],
	},
	integrations: [react()]
}
