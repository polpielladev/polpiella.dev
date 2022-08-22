import baseCSS from '../styles/base.css'

export default function Head({ title, description, imageURL }) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <title>{title}</title>
      <meta property="og:image" content={imageURL} />
      <meta name="twitter:image" content={imageURL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:site" content="@polpielladev" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="stylesheet" href={baseCSS} />
      <link rel="icon" type="image/png" href="/assets/profile.png" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for polpiella.dev"
        href="/rss.xml"
      />
      <script
        hoist="true"
        src="https://cdn.usefathom.com/script.js"
        data-site={import.meta.env.FATHOM_ENTITY_ID}
        defer></script>
      <script
        hoist="true"
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="polpielladev"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#fbbf24"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        defer></script>
    </head>
  )
}
