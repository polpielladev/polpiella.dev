import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './src/plugins/remarkReadingTime'
import { remarkSlugify } from './src/plugins/remarkSlugify'

// https://astro.build/config
export default defineConfig({
  site: 'https://polpiella.dev',
  markdown: {
    remarkPlugins: ['remark-code-titles', remarkReadingTime, remarkSlugify],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'wrap',
        },
      ],
    ],
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  integrations: [tailwind(), react()]
})
