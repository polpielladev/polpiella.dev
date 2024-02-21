import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkCodeTitles from 'remark-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import svelte from '@astrojs/svelte'
import vercel from '@astrojs/vercel/serverless'
const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap',
}

// https://astro.build/config
export default defineConfig({
  site: 'https://polpiella.dev',
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    ],
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  output: 'hybrid',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
    svelte(),
  ],
  adapter: vercel(),
})
