import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { getCollection } from 'astro:content'

const parser = new MarkdownIt()

export const get = async () => {
  const allNewsletterIssues = await getCollection('newsletter')
  const sortedIssues = allNewsletterIssues.sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  )

  return rss({
    title: 'iOS CI Newsletter',
    description:
      'A fortnightly newsletter gathering all updates and news about Continuous Integration and Continuous Delivery from the iOS community.',
    site: 'https://polpiella.dev/newsletter',
    items: sortedIssues.map((issue) => ({
      title: `iOS CI Newsletter - Issue #${issue.data.number}`,
      link: `/newsletter/${issue.data.number}`,
      content: sanitizeHtml(parser.render(issue.body)),
      pubDate: issue.data.date,
    })),
    customData: `<language>en-us</language>`,
  })
}
