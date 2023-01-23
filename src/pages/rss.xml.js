import rss from '@astrojs/rss'

const postImportResult = import.meta.globEager('./*.mdx')
const posts = Object.values(postImportResult).sort(
  (a, b) =>
    new Date(b.frontmatter.pubDate).valueOf() -
    new Date(a.frontmatter.pubDate).valueOf()
)

export const get = async () => {
  const htmls = await Promise.all(
    posts.map(async (post) => await post.compiledContent())
  )

  const rssItems = posts.map((post, index) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.pubDate,
    description: htmls[index],
  }))

  return rss({
    title: "Pol Piella's Blog",
    description: 'A blog about iOS mobile app development and Swift.',
    site: 'https://polpiella.dev',
    items: rssItems,
    customData: `<language>en-us</language>`,
  })
}
