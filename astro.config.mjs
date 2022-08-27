import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://polpiella.dev',
  markdown: {
    remarkPlugins: ['remark-code-titles'],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'wrap',
        },
      ],
      [
        'rehype-toc',
        {
          headings: ['h2'],
        },
      ],
    ],
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  integrations: [tailwind({ config: { applyBaseStyles: false } }), react()],
  legacy: {
    astroFlavoredMarkdown: true,
  },
})
