import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkCodeTitles from 'remark-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import astroLayouts from 'astro-layouts'
import svelte from '@astrojs/svelte'
const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
}
const astroLayoutOptions = {
  'content/blog/*.mdx': '/src/layouts/BlogPostLayout.astro',
  'content/newsletter/*.mdx': '/src/layouts/IssueLayout.astro',
}

// https://astro.build/config
export default defineConfig({
  site: 'https://polpiella.dev',
  markdown: {
    remarkPlugins: [remarkCodeTitles, [astroLayouts, astroLayoutOptions]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    ],
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  output: 'static',
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    mdx(),
    svelte(),
  ],
})
