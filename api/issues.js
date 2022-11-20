import Parser from 'rss-parser'

export default async (req, res) => {
  const feedResponse = await fetch(
    'https://sendy.polpiella.dev/campaigns-rss?a=I8YAOkQbYijtGLtK0H9GbAHucrwltO&i=1'
  )

  const parser = new Parser()

  const feedString = await feedResponse.text()

  const { items } = await parser.parseString(feedString)

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(items))
}
