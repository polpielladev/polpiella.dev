export default function Head({ title, description, imageURL }) {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <title>{title}</title>
      <meta property="og:image" content={imageURL} />
      <meta name="twitter:image" content={imageURL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:site" content="@polpielladev" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for polpiella.dev"
        href="/rss.xml"
      />
      <script hoist src="https://cdn.usefathom.com/script.js" data-site="FBLWSUCQ" defer></script>
    </head>
  )
}