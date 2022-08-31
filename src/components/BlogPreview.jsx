import Tags from '@components/Tags'

export default function BlogPreview({ post }) {
  const { slug, title, excerpt, pubDate, readtime, tags } = post.frontmatter
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
        <div>
          <span className="mr-2 inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <svg
              aria-hidden="true"
              className="mr-1 h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"></path>
            </svg>
            {readtime} minute read
          </span>
        </div>
        <p className="m-0">{excerpt}</p>
        <Tags tags={tags} />
      </div>
    </div>
  )
}
