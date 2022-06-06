import Metadata from './Metadata'
import Tags from './Tags'

export default function BlogPreview({ post }) {
  const { slug, title, excerpt, pubDate, readtime, tags } = post.frontmatter
  const formattedDate = new Date(pubDate).toDateString()

  return (
    <div className="prose flex flex-col dark:prose-invert">
      <h5 className=" m-0 font-bold text-zinc-400">{formattedDate}</h5>
      <div className="flex flex-col gap-2">
        <a href={`/${slug}`} className="m-0 rounded no-underline">
          <h1 className="m-0 hover:text-amber-900 dark:hover:text-amber-300">
            {title}
          </h1>
        </a>
        <p className="m-0">{excerpt}</p>
        <Metadata className="m-0" readtime={readtime} />
        <Tags className="m-0" tags={tags} />
      </div>
    </div>
  )
}
