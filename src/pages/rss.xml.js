import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { getCollection } from 'astro:content'

const parser = new MarkdownIt()

export const get = async () => {
  const allBlogPosts = await getCollection('blog')
  const sortedPosts = allBlogPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  )

  return rss({
    title: "Pol Piella's Blog",
    description: 'A blog about iOS mobile app development and Swift.',
    site: 'https://polpiella.dev',
    items: sortedPosts.map((post) => ({
      link: `/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
  })
}
