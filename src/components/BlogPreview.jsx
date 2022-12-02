export default function BlogPreview({ post }) {
  const { slug, title, excerpt, pubDate } = post.frontmatter
  const formattedDate = new Date(pubDate).toDateString()

  return (
    <div className="prose flex w-full flex-col dark:prose-invert">
      <p className=" m-0 text-sm font-semibold text-zinc-400">
        {formattedDate}
      </p>
      <div className="flex flex-col gap-2">
        <a href={`/${slug}`} className="m-0 rounded no-underline">
          <h2 className="m-0 max-w-md hover:text-amber-900 dark:hover:text-amber-300">
            {title}
          </h2>
        </a>
        <p className="m-0">{excerpt}</p>
      </div>
    </div>
  )
}
