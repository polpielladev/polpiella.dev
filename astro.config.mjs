import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import remarkCodeTitles from 'remark-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap'
}

export default defineConfig({
  site: 'https://polpiella.dev',
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]],
    shikiConfig: {
      theme: 'css-variables'
    }
  },
  integrations: [tailwind(), react(), mdx()]
});