import rss from '@astrojs/rss'

const issuesImportResult = import.meta.globEager('./*.md')
const issues = Object.values(issuesImportResult).sort(
  (a, b) =>
    new Date(b.frontmatter.date).valueOf() -
    new Date(a.frontmatter.date).valueOf()
)

export const get = async () => {
  const htmls = await Promise.all(
    issues.map(async (issue) => await issue.compiledContent())
  )

  const rssItems = issues.map((issue, index) => ({
    link: issue.url,
    title: `iOS CI Newsletter - Issue #${issue.frontmatter.number}`,
    pubDate: issue.frontmatter.date,
    description: htmls[index],
  }))

  return rss({
    title: 'iOS CI Newsletter',
    description:
      'A fortnightly independent newsletter gathering all updates and news about Continuous Integration and Continuous Delivery from the iOS community.',
    site: 'https://polpiella.dev/newsletter',
    items: rssItems,
    customData: `<language>en-us</language>`,
  })
}
