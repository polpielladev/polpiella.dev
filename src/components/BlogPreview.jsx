export default function BlogPreview({ slug, title, excerpt, pubDate }) {
  const formattedDate = new Date(pubDate).toDateString()

  return (
    <div className="prose flex w-full flex-col dark:prose-invert">
      <p className=" m-0 text-sm font-semibold text-zinc-500 dark:text-zinc-300">
        {formattedDate}
      </p>
      <div className="flex flex-col gap-2">
        <a href={`/${slug}`} className="m-0 rounded no-underline">
          <h2 className="m-0 max-w-md hover:underline">{title}</h2>
        </a>
        <p className="m-0">{excerpt}</p>
      </div>
    </div>
  )
}
